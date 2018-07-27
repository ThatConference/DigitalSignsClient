import gql from 'graphql-tag';
import { PropTypes } from 'prop-types';
import React, { Fragment, PureComponent } from 'react';
import { Subscription } from 'react-apollo';

import sessionBackground from '../TC-DigitalSign-Background.png';

import './Session.css';

const getClasses = (status) => {
  if (!status || status.speakerStatusChanged.data.toUpperCase() === 'GREEN') {
    return 'session__background';
  }
  return 'session__background brb';
};

const onSpeakerStatusChange = gql`
    subscription onSpeakerStatusChange($roomName: String!) {
        speakerStatusChanged(roomName: $roomName) {
            data
            coreid
        }
    }
`;
/*
const rando = arr => arr[Math.floor(Math.random() * arr.length)];
let lastImage = 0;

const getRandomImage = () => {
  const images = [1, 2, 3, 4, 5, 6, 7, 8];

  let nextImage = rando(images);

  while (nextImage === lastImage) {
    nextImage = rando(images);
  }

  lastImage = nextImage;

  return `/headshots/${nextImage}.png`;
};

*/

class Session extends PureComponent {

  componentDidMount() {
    this.props.subscribeToSessionUpdates();
  }

  render() {
    const { loading, data, error } = this.props;

    if (loading) return null;
    if (error) return <p>Error...</p>;

    return (
      <div className="session">
        <Subscription subscription={onSpeakerStatusChange} variables={{ roomName: this.props.roomName }}>
          {({ data: subData }) => <img className={getClasses(subData)} src={sessionBackground} alt="" />}
        </Subscription>

        <Fragment>
          <div className="session__img-wrapper">
            <img className="session__img" src={data.sessions[0].speakers[0].headShot} alt="" />
          </div>
          <div className="session__details">
            <h1 className="session__speaker">{data.sessions[0].speakers[0].firstName} {data.sessions[0].speakers[0].lastName}</h1>
            <h2 className="session__title">{data.sessions[0].title}</h2>
            <div dangerouslySetInnerHTML={{ __html: data.sessions[0].descriptionHtmlTruncated }} />
          </div>
        </Fragment>
      </div>
    );
  }
}

Session.propTypes = {
  roomName: PropTypes.string.isRequired,
};

export default Session;
