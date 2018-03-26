import { PropTypes } from 'prop-types';
import React, { Fragment } from 'react';

import logo from '../logo.svg';
import './Session.css';

const Session = props => (
  <Fragment>
    <div className="session">
      <div className="session__img-wrapper">
        <img className="session__img" src={logo} alt="" />
      </div>
      <div className="session__details">
        <h1 className="session__title">
          ROOM ROUTE: <span> {props.roomId} </span>
        </h1>
        <h2 className="session__speaker">CLARK SELL</h2>
        <p className="session__speaker-company">Unspecified</p>
      </div>
    </div>
  </Fragment>
);

Session.propTypes = {
  roomId: PropTypes.string.isRequired,
};

export default Session;
