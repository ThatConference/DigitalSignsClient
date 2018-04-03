import React, { Fragment } from 'react';
import { DateTime } from 'luxon';

import './Footer.css';

const Footer = props => (
  <Fragment>
    <div className="footer">
      <div className="footer__upNext">
        <span>
          <b>UP NEXT:</b> 11:00am - Mat Bolwerk - <i>Driving BIG Dogs Crazy</i>
        </span>
      </div>
      <div className="footer__time">
        <div className="footer__time-current">{DateTime.local().toFormat('hh:mm')}</div>
      </div>
    </div>
  </Fragment>
);

export default Footer;
