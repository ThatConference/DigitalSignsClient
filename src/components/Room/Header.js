import React, { Component, Fragment } from "react";
import { DateTime } from "luxon";

import "./Header.css";

const Header = props => {
  return (
    <Fragment>
      <div className="header">
        <div className="header__upNext">
          <span>
            <b>UP NEXT:</b> 11:00am - Mat Bolwerk -{" "}
            <i>Driving BIG Dogs Crazy</i>
          </span>
        </div>
        <div className="header__time">
          <div className="header__time-current">
            {DateTime.local().toFormat("hh:mm")}
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Header;
