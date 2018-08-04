import _ from 'lodash';
import moment from 'moment';
import gql from 'graphql-tag';
import { PropTypes } from 'prop-types';
import React, { Fragment, PureComponent } from 'react';
import { Subscription } from 'react-apollo';

import Footer from './Footer';
import Sponsors from './Sponsors';

import sessionBackground from '../TC-DigitalSign-Background.png';
import './Session.css';

const onSpeakerStatusChange = gql`
    subscription onSpeakerStatusChange($roomName: String!) {
        speakerStatusChanged(roomName: $roomName) {
            data
            coreid
        }
    }
`;

const onDeploymentChanged = gql`
  subscription shouldDeploy{
    deployment {
      shouldUpdate
    }
  }`;

const findIndex = (sessionId, sessions) => _.findIndex(sessions, s => s.id === sessionId);

let intervalId;

const formatSpeakerList = (speakers) => {
  let formattedSpeakers;

  if (speakers.length > 1) {
    formattedSpeakers = speakers.map(s => `${s.firstName} ${s.lastName}`).join(', ');
  } else {
    formattedSpeakers = `${speakers[0].firstName} ${speakers[0].lastName}`;
  }

  return formattedSpeakers;
};

class Session extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      sessionIndex: -1,
      upNextIndex: 0,
      background: 'session__background',
    };
  }

  componentDidMount() {
    const apolloClient = this.props.client;

    apolloClient
      .subscribe({ query: onDeploymentChanged })
      .subscribe(this.onDeploymentChanged.bind(this));

    this.props.subscribeToSessionUpdates();

    intervalId = setInterval(() => {
      const displayIndexes = this.getIndexOfSessionToDisplay(this.props.data.sessions);
      this.setState({
        ...this.state,
        ...displayIndexes,
      });
    }, 10000);
  }

  componentDidUpdate() {
    // this will end up getting called when the props change on the subscription
    const displayIndexes = this.getIndexOfSessionToDisplay(this.props.data.sessions);
    this.setState({
      ...this.state,
      ...displayIndexes,
    });
  }

  componentWillUnmount() {
    clearInterval(intervalId);
  }

  onDeploymentChanged(data) {
    console.log('reloading source');
    window.location.reload(true);
  }

  setBackground(status) {
    if (!status || status.speakerStatusChanged.data.toUpperCase() === 'GREEN') {

      this.setState({
        ...this.state,
        background: 'session__background',
      });

      return;
    }

    this.setState({
      ...this.state,
      background: 'session__background brb',
    });
  }

  getIndexOfSessionToDisplay(sessionList) {
    // loop through the sessions to see what we need to display
    const displayIndexes = {
      sessionIndex: -1,
      upNextIndex: this.state.upNextIndex,
    };

    for (const s of sessionList) {
      // is it today
      if (moment().isSame(s.scheduledDateTime, 'day')) {
        // is it in session
        if (
          moment().isBetween(
            moment(s.scheduledDateTime),
            moment(s.scheduledDateTime).add(60, 'minutes')
          )
        ) {
          // console.log(`In Session: ${s.title}, ${findIndex(s.id, sessionList)}`);

          const index = findIndex(s.id, sessionList);
          displayIndexes.sessionIndex = index;
          displayIndexes.upNextIndex = index + 1;
        }

        // is it up next?
        if (moment().isBefore(s.scheduledDateTime)) {
          const minutesUntil = moment(s.scheduledDateTime).diff(
            moment(),
            'minutes'
          );
          if (minutesUntil < 30) {
            // console.log(`in ${minutesUntil} ${s.title}`);

            const index = findIndex(s.id, sessionList);
            displayIndexes.sessionIndex = index;
            displayIndexes.upNextIndex = index + 1;
          }
        }
      } else {
        // next day
        displayIndexes.upNextIndex = findIndex(s.id, sessionList);
        break;
      }
    }

    return displayIndexes;
  }

  render() {
    const { loading, data, error } = this.props;

    if (loading) return null;
    if (error) return <p>Error...</p>;

    let sessionElement;
    let footerElement;

    if (this.state.sessionIndex >= 0) {
      sessionElement = (
        <Fragment>
          <Subscription subscription={onSpeakerStatusChange} variables={{ roomName: this.props.roomName }}>
            {({ data: subData }) => {
              this.setBackground(subData);
              return null;
            }}
          </Subscription>

          <div className="session">
            <img className={this.state.background} src={sessionBackground} alt="" />
            <div className="session__img-wrapper">
              <img className="session__img" src={`https://www.thatconference.com${data.sessions[this.state.sessionIndex].speakers[0].headShot}`} alt="" />
              <img className="session__img" src="https://www.thatconference.com/cloud/profilephotos/Kim-Cwiak-01bd9b04-13fc-4952-b4ec-5af56bc6950e-635654945410581745.JPG" alt=""/>
            </div>
            <div className="session__details">
              <h1 className="session__speaker">{formatSpeakerList(data.sessions[this.state.sessionIndex].speakers)}</h1>
              <h2 className="session__title">{data.sessions[this.state.sessionIndex].title}</h2>
              <div dangerouslySetInnerHTML={{ __html: data.sessions[this.state.sessionIndex].descriptionHtmlTruncated }} />
            </div>
          </div>
        </Fragment>
      );

      footerElement = (
        <Footer
          speakerName={formatSpeakerList(data.sessions[this.state.upNextIndex].speakers)}
          sessionTitle={data.sessions[this.state.upNextIndex].title}
        />
      );
    } else {
      sessionElement = (
        <Sponsors />
      );

      let footerIndex = 0;
      footerIndex = this.state.upNextIndex === 0 ? 0 : this.state.upNextIndex - 1;

      if (data.sessions.length >= 1) {
        footerElement = (
          <Footer
            scheduledDateTime={data.sessions[footerIndex].scheduledDateTime}
            speakerName={formatSpeakerList(data.sessions[footerIndex].speakers)}
            sessionTitle={data.sessions[footerIndex].title}
          />
        );
      } else {
        footerElement = (
          <Footer
            speakerName='THAT Conference'
            sessionTitle='Nothing to see here...'
          />
        );
      }
    }

    return (
      <Fragment>
        {sessionElement}
        {footerElement}
      </Fragment >
    );
  }
}

Session.propTypes = {
  roomName: PropTypes.string.isRequired,
  loading: PropTypes.bool.isRequired,

};

export default Session;
