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

const findIndex = (sessionId, sessions) => _.findIndex(sessions, s => s.id === sessionId);

let intervalId;

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
          console.log(`In Session: ${s.title}, ${findIndex(s.id, sessionList)}`);

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
            console.log(`in ${minutesUntil} s.title`);

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
            </div>
            <div className="session__details">
              <h1 className="session__speaker">{data.sessions[this.state.sessionIndex].speakers[0].firstName} {data.sessions[this.state.sessionIndex].speakers[0].lastName}</h1>
              <h2 className="session__title">{data.sessions[this.state.sessionIndex].title}</h2>
              <div dangerouslySetInnerHTML={{ __html: data.sessions[this.state.sessionIndex].descriptionHtmlTruncated }} />
            </div>
          </div>
        </Fragment>
      );

      footerElement = (
        <Footer
          speakerName={`${data.sessions[this.state.upNextIndex].speakers[0].firstName} ${data.sessions[this.state.upNextIndex].speakers[0].lastName}`}
          sessionTitle={data.sessions[this.state.upNextIndex].title}
        />
      );
    } else {
      sessionElement = (
        <Sponsors />
      );

      let footerIndex = 0;
      footerIndex = this.state.upNextIndex === 0 ? 0 : this.state.upNextIndex - 1;

      footerElement = (
        <Footer
          speakerName={`${data.sessions[footerIndex].speakers[0].firstName} ${data.sessions[footerIndex].speakers[0].lastName}`}
          sessionTitle={data.sessions[footerIndex].title}
        />
      );
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
