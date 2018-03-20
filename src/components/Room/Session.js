import React, { Fragment } from "react";

import logo from "../logo.svg";
import "./Session.css";

const Session = props => {
  return (
    <Fragment>
      <section className="session">
        <div className="headShot">
          <img src={logo} alt="" />
        </div>
        <div className="details">
          <div className="speakerName">CLARK SELL</div>
          <div className="speakerCompany">Unspecified</div>
          <div className="sessionTitle">How to be Awesome!!</div>
        </div>
      </section>
    </Fragment>
  );
};

export default Session;
