import React, { Fragment } from "react";

import logo from "../TC-Logo-Red.png";
import qrcode from "../qrcode.png";
import "./Footer.css";

const Footer = props => {
  return (
    <Fragment>
      <div className="footer">
        <div className="footer__qrcode-container">
          <img className="footer__qrcode" src={qrcode} alt=""/>
        </div>
        <div className="footer__logo-container">
            <img className="footer__logo" src={logo} alt="" />
        </div>
      </div>
    </Fragment>
  );
};

export default Footer;
