import { PropTypes } from 'prop-types';
import React, { Fragment, PureComponent } from 'react';
import { DateTime } from 'luxon';

import './Footer.css';

const getTime = () => {
  return DateTime.local().toFormat('hh:mm');
};

class Footer extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      currentTime: getTime(),
    };
  }

  componentDidMount() {
    setInterval(() => {
      this.setState({
        ...this.state,
        currentTime: getTime(),
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
              <b>UP NEXT:</b>
              <span className="footer_upNext_speaker">{speakerName} - <i>{sessionTitle}</i> </span>
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
