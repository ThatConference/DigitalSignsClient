import gql from 'graphql-tag';
import { PropTypes } from 'prop-types';
import React, { Fragment } from 'react';
import { Query } from 'react-apollo';

import Session from './Session';

import './Room.css';

const getCurrentSessionQuery = gql`
  query getCurrentSession($eventId: String!, $roomName: String!) { 
    sessions(eventId: $eventId, roomName: $roomName) {
      title
      descriptionHtmlTruncated
      scheduledRoom
      scheduledDateTime
      speakers {
        firstName
        lastName
        company
        headShot
      }
    }
  }`;

const onSessionChanged = gql`
  subscription onSessionChanged($eventId: String!, $roomName: String!) { 
    roomScreenChanged(eventId: $eventId, roomName: $roomName) {
      title
      descriptionHtmlTruncated
      scheduledRoom
      scheduledDateTime
      speakers {
        firstName
        lastName
        company
        headShot
      }
    }
  }`;


const Room = props => (
  <Fragment>
    <main className="room">
      <Query query={getCurrentSessionQuery} variables={{ eventId: process.env.REACT_APP_EVENT_ID, roomName: props.match.params.roomName }}>
        {({ subscribeToMore, ...result }) => (
          <Session
            {...result}
            roomName={props.match.params.roomName}
            subscribeToSessionUpdates={() =>
              subscribeToMore({
                document: onSessionChanged,
                variables: { eventId: process.env.REACT_APP_EVENT_ID, roomName: props.match.params.roomName },
                updateQuery: (prev, { subscriptionData }) => {
                  if (!subscriptionData.data) return prev;
                  return subscriptionData.data;
                },
              })
            }
          />
        )}
      </Query>
    </main>
  </Fragment>
);

Room.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      roomName: PropTypes.node,
    }).isRequired,
  }).isRequired,
};

export default Room;
