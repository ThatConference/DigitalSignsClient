import gql from 'graphql-tag';
import { PropTypes } from 'prop-types';
import React, { Fragment } from 'react';
import { Subscription } from 'react-apollo';

import Session from './Session';
import Footer from './Footer';

import './Room.css';

const onRoomChanged = gql`
    subscription onRoomChanged($roomId: String!) {
        roomChanged(roomId: $roomId) {
            id
            name
        }
    }
`;

const Room = props => (
  <Subscription subscription={onRoomChanged} variables={{ roomId: props.match.params.roomId }}>
    {({ data, loading }) => (
      <Fragment>
        <main className="room">
          <Session roomId={!loading && data.roomChanged.id} />
          <Footer />
        </main>
      </Fragment>
        )}
  </Subscription>
);

Room.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      roomId: PropTypes.node,
    }).isRequired,
  }).isRequired,
};

export default Room;
