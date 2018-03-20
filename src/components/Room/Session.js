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
          <span className="speakerNam,e">CLARK SELL</span>
          <span className="speakerCompany">Unspecified</span>
          <span className="sessionTitle">How to be Awesome!!</span>
        </div>
      </section>
    </Fragment>
  );
};

export default Session;
