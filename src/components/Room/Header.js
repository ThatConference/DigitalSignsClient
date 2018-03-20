import React, { Component, Fragment } from "react";
import { DateTime } from "luxon";

import "./Header.css";

const Header = props => {
  return (
    <Fragment>
      <header>
        <div className="upNext">
          <span><b>UP NEXT:</b> </span>
          <span>11:00am - Mat Bolwerk - <i>Driving Dogs Crazy</i></span>
        </div>
        <div className="timeWarnings">
          <div className="currentTime">
            {DateTime.local().toFormat("hh:mm")}
          </div>
        </div>
      </header>
    </Fragment>
  );
};

export default Header;
