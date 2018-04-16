import { PropTypes } from 'prop-types';
import React, { Fragment } from 'react';

import sessionBackground from '../TC-DigitalSign-Background.png';
import profilePic from '../logo.svg';
import './Session.css';

const Session = props => (
  <Fragment>
    <div className="session">
      <img className="session__background brb" src={sessionBackground} alt="" />
      <div className="session__img-wrapper">
        <img className="session__img" src={profilePic} alt="" />
      </div>
      <div className="session__details">
        <h1 className="session__speaker">CLARK SELL</h1>
        <h2 className="session__title">This is the best session every and you know it too</h2>
          ROOM ROUTE: {props.roomId}
      </div>
    </div>
  </Fragment>
);

Session.propTypes = {
  roomId: PropTypes.string.isRequired,
};

export default Session;
