import { PropTypes } from 'prop-types';
import React, { Fragment, PureComponent } from 'react';
import { DateTime } from 'luxon';

import './Footer.css';

class Footer extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      currentTime: '...',
    };
  }

  componentDidMount() {
    setInterval(() => {
      this.setState({
        ...this.state,
        currentTime: DateTime.local().toFormat('hh:mm'),
      });
    }, 30000);
  }

  render() {
    const { speakerName, sessionTitle } = this.props;
    return (
      <Fragment>
        <div className="footer">
          <div className="footer__upNext">
            <span>
              <b>UP NEXT:</b> ??TIME?? {speakerName} - <i>{sessionTitle}</i>
            </span>
          </div>
          <div className="footer__time">
            <div className="footer__time-current">{this.state.currentTime}</div>
          </div>
        </div>
      </Fragment>
    );
  }
}

Footer.propTypes = {
  speakerName: PropTypes.string.isRequired,
  sessionTitle: PropTypes.string.isRequired,
};


export default Footer;
