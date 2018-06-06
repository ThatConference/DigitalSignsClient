import { PropTypes } from 'prop-types';
import React, { Fragment } from 'react';

import Session from './Session';
import Footer from './Footer';

import './Room.css';

const Room = props => (
  <Fragment>
    <main className="room">
      <Session roomName={props.match.params.roomName} />
      <Footer />
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
