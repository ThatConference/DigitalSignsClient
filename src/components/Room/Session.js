import _ from 'lodash';
import moment from 'moment';
import gql from 'graphql-tag';
import { PropTypes } from 'prop-types';
import React, { Fragment, PureComponent } from 'react';
import { Subscription } from 'react-apollo';

import Footer from './Footer';

import sessionBackground from '../TC-DigitalSign-Background.png';
import './Session.css';

const getClasses = (status) => {
  if (!status || status.speakerStatusChanged.data.toUpperCase() === 'GREEN') {
    return 'session__background';
  }
  return 'session__background brb';
};

const onSpeakerStatusChange = gql`
    subscription onSpeakerStatusChange($roomName: String!) {
        speakerStatusChanged(roomName: $roomName) {
            data
            coreid
        }
    }
`;

/*
const rando = arr => arr[Math.floor(Math.random() * arr.length)];
let lastImage = 0;

const getRandomImage = () => {
  const images = [1, 2, 3, 4, 5, 6, 7, 8];

  let nextImage = rando(images);

  while (nextImage === lastImage) {
    nextImage = rando(images);
  }

  lastImage = nextImage;

  return `/headshots/${nextImage}.png`;
};

*/

const findIndex = (sessionId, sessions) => _.findIndex(sessions, s => s.id === sessionId);

const getIndexOfSessionToDisplay = (sessionList) => {
  // loop through the sessions to see what we need to display
  let returnIndex = -1;
  sessionList.forEach((s) => {
    // is it today
    if (moment().isSame(s.scheduledDateTime, 'day')) {
      // is it in session
      if (
        moment().isBetween(
          moment(s.scheduledDateTime),
          moment(s.scheduledDateTime).add(60, 'minutes')
        )
      ) {
        returnIndex = findIndex(s.id, sessionList);
        console.log(`In Session: ${s.title}, ${findIndex(s.id, sessionList)}`);
      }

      // is it up next?
      if (moment().isBefore(s.scheduledDateTime)) {
        const minutesUntil = moment(s.scheduledDateTime).diff(
          moment(),
          'minutes'
        );
        if (minutesUntil < 30) {
          console.log(`in ${minutesUntil} s.title`);
          returnIndex = findIndex(s.id, sessionList);
        }
      }
    }
  });

  return returnIndex;

};

let displayInterval;

class Session extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      displayIndex: -1,
    };
  }

  componentDidMount() {
    this.props.subscribeToSessionUpdates();

    displayInterval = setInterval(() => {
      const currentIndex = getIndexOfSessionToDisplay(this.props.data.sessions);
      this.setState({
        ...this.state,
        displayIndex: currentIndex,
      });
    }, 10000);
  }


  componentDidUpdate() {
    // this will end up getting called when the props change on the subscription
    const currentIndex = getIndexOfSessionToDisplay(this.props.data.sessions);
    this.setState({
      ...this.state,
      displayIndex: currentIndex,
    });
  }

  componentWillUnmount() {
    clearInterval(displayInterval);
  }

  render() {
    console.log('render called');
    const { loading, data, error } = this.props;

    if (loading) return null;
    if (error) return <p>Error...</p>;

    let sessionElement;
    if (this.state.displayIndex >= 0) {
      sessionElement = (
        <Fragment>
          <div className="session__img-wrapper">
            <img className="session__img" src={`https://www.thatconference.com${data.sessions[this.state.displayIndex].speakers[0].headShot}`} alt="" />
          </div>
          <div className="session__details">
            <h1 className="session__speaker">{data.sessions[this.state.displayIndex].speakers[0].firstName} {data.sessions[0].speakers[0].lastName}</h1>
            <h2 className="session__title">{data.sessions[this.state.displayIndex].title}</h2>
            <div dangerouslySetInnerHTML={{ __html: data.sessions[this.state.displayIndex].descriptionHtmlTruncated }} />
          </div>
        </Fragment>
      );
    }

    return (
      <Fragment>
        <div className="session">

          <Subscription subscription={onSpeakerStatusChange} variables={{ roomName: this.props.roomName }}>
            {({ data: subData }) => <img className={getClasses(subData)} src={sessionBackground} alt="" />}
          </Subscription>
          {sessionElement}
        </div>

        <Footer
          speakerName={`${data.sessions[this.state.displayIndex + 1].speakers[0].firstName} ${data.sessions[this.state.displayIndex + 1].speakers[0].lastName}`}
          sessionTitle={data.sessions[this.state.displayIndex + 1].title}
        />

      </Fragment>
    );
  }
}

Session.propTypes = {
  roomName: PropTypes.string.isRequired,
  loading: PropTypes.bool.isRequired,

};

export default Session;
