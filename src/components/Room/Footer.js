import moment from 'moment';
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
    const { speakerName, sessionTitle, scheduledDateTime } = this.props;

    return (
      <Fragment>
        <div className="footer">
          <div className="footer__upNext">
            <b>UP NEXT: {`${moment(scheduledDateTime).format('ddd, hA')}`} </b>
          </div>
          <div className="footer__upNext-session">
              <span className="footer_upNext_speaker">{speakerName} - <i>{sessionTitle}</i></span>
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
  scheduledDateTime: PropTypes.string,
};


export default Footer;
