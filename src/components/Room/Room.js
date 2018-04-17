import gql from 'graphql-tag';
import { PropTypes } from 'prop-types';
import React, { Fragment } from 'react';
import { Subscription } from 'react-apollo';

import Session from './Session';
import Footer from './Footer';

import './Room.css';

// const onRoomChanged = gql`
//     subscription onRoomScreenChanged($roomId: String!) {
//         roomScreenChanged(roomId: $roomId) {
//             id
//             name
//         }
//     }
// `;

const onRoomChanged = gql`
    subscription onRoomScreenChanged($roomId: String!) {
        roomScreenChanged(roomId: $roomId) {
            id
            name
        }
    }
`;

// props.match.params.roomId
const Room = props => (
  <Subscription subscription={onRoomChanged} variables={{ roomId: '1234' }}>
    {({ data, loading }) => (
      <Fragment>
        <main className="room">
          <Session roomId={!loading && data.roomScreenChanged.id} />
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
