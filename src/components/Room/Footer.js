import { PropTypes } from 'prop-types';
import React, { Fragment } from 'react';
import { DateTime } from 'luxon';

import './Footer.css';

const Footer = ({ speakerName, sessionTitle }) => (
  <Fragment>
    <div className="footer">
      <div className="footer__upNext">
        <span>
          <b>UP NEXT:</b> ??TIME?? {speakerName} - <i>{sessionTitle}</i>
        </span>
      </div>
      <div className="footer__time">
        <div className="footer__time-current">{DateTime.local().toFormat('hh:mm')}</div>
      </div>
    </div>
  </Fragment>
);

Footer.propTypes = {
  speakerName: PropTypes.string.isRequired,
  sessionTitle: PropTypes.string.isRequired,
};


export default Footer;
