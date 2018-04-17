import gql from 'graphql-tag';
import { PropTypes } from 'prop-types';
import React from 'react';
import { Subscription } from 'react-apollo';

import Loading from '../common/Loading';

import sessionBackground from '../TC-DigitalSign-Background.png';
import profilePic from '../logo.svg';
import './Session.css';

const onSpeakerStatusChange = gql`
    subscription onSpeakerStatusChange($roomId: Int!) {
        speakerStatusChanged(roomId: $roomId) {
            data
            coreid
        }
    }
`;

const onRoomChanged = gql`
    subscription onRoomScreenChanged($roomId: Int!) {
        roomScreenChanged(roomId: $roomId) {
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

const Session = props => (
  <div className="session">
    <Subscription subscription={onSpeakerStatusChange} variables={{ roomId: props.roomId }}>
      {({ data, loading }) => {
                if (!data || data.speakerStatusChanged.data.toUpperCase() === 'GREEN') { return <img className="session__background" src={sessionBackground} alt="" />; }

                if (data.speakerStatusChanged.data.toUpperCase() === 'RED') {
                    return <img className="session__background brb" src={sessionBackground} alt="" />;
                }
            }}
    </Subscription>

    <div className="session__img-wrapper">
      <img className="session__img" src={profilePic} alt="" />
    </div>

    <Subscription subscription={onRoomChanged} variables={{ roomId: props.roomId }}>
      {({ data, loading }) => {
                if (loading || !data) return <Loading />;

                return (
                  <div className="session__details">
                    <h1 className="session__speaker">{data.roomScreenChanged.session.speakerName}</h1>
                    <h2 className="session__title">{data.roomScreenChanged.session.title}</h2>
                    {data.roomScreenChanged.name}: {data.roomScreenChanged.deviceId}
                  </div>
                );
            }}
    </Subscription>
  </div>
);

Session.propTypes = {
  roomId: PropTypes.string.isRequired,
};

export default Session;
