import React, { Component, Fragment } from "react";
import { DateTime } from "luxon";

import Footer from "./Footer";
import "./Header.css";

const Header = props => {
  return (
    <Fragment>
      <section className="upNext">
        <div>
          <span>UP NEXT: </span>
          <span>Mat Bolwerk - Driving Dogs Crazy</span>
        </div>
        <span>
          {DateTime.local().toFormat("hh:mm")} | Next Session at 11:00
        </span>
      </section>
    </Fragment>
  );
};

export default Header;
