import gql from 'graphql-tag';
import { PropTypes } from 'prop-types';
import React, { Fragment } from 'react';
import { Subscription } from 'react-apollo';

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

const onRoomChanged = gql`
    subscription onRoomScreenChanged($roomName: String!) {
        roomScreenChanged(roomName: $roomName) {
            id
            name
            deviceId
            session {
                speakerName
                title
            }
        }
    }
`;

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

const getClasses = (status) => {
  if (!status || status.speakerStatusChanged.data.toUpperCase() === 'GREEN') {
    return 'session__background';
  }
  return 'session__background brb';
};

const Session = props => (
  <div className="session">
    <Subscription subscription={onSpeakerStatusChange} variables={{ roomName: props.roomName }}>
      {({ data, loading }) => <img className={getClasses(data)} src={sessionBackground} alt="" />}
    </Subscription>

    <Subscription subscription={onRoomChanged} variables={{ roomId: props.roomId }}>
      {({ data, loading }) => {
        if (loading || !data) return null;

        return (
          <Fragment>
            <div className="session__img-wrapper">
              <img className="session__img" src={getRandomImage()} alt="" />
            </div>
            <div className="session__details">
              <h1 className="session__speaker">{data.roomScreenChanged.session.speakerName}</h1>
              <h2 className="session__title">{data.roomScreenChanged.session.title}</h2>
              {data.roomScreenChanged.name}: {data.roomScreenChanged.deviceId}
            </div>
          </Fragment>
        );
      }}
    </Subscription>
  </div>
);

Session.propTypes = {
  roomName: PropTypes.string.isRequired,
};

export default Session;
