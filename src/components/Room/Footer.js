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

  getUpNext() {
    let footerElements;
    if (this.props.isEnd) {
      footerElements = (
        <Fragment>
          <div className="footer__upNext">
            <span className="footer__text">...</span>
          </div>
          <div className="footer__upNext-session">
            <span className="footer__text footer_upNext_speaker" />
          </div>
        </Fragment >

      );
    } else {
      footerElements = (
        <Fragment>
          <div className="footer__upNext">
            <span className="footer__text"><b>UP NEXT <br /> {`${moment(this.props.scheduledDateTime).format('ddd, h:mmA')}`} </b></span>
          </div>
          <div className="footer__upNext-session">
            <span className="footer__text footer_upNext_speaker">{this.props.speakerName} - <i>{this.props.sessionTitle}</i></span>
          </div>
        </Fragment>
      );
    }

    return footerElements;
  }

  render() {
    return (
      <Fragment>
        <div className="footer">
          {this.getUpNext()}
          <div className="footer__time">
            <div className="footer__text footer__time-current">{this.state.currentTime}</div>
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
  isEnd: PropTypes.bool,
};


export default Footer;
