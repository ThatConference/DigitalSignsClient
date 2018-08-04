import React, { Fragment, PureComponent } from 'react';

import './Sponsors.css';
import './Room.css';

let lastImage = 1;

const getRandomImage = () => {
  // bump to next image
  lastImage += 1;
  let nextImage = lastImage;

  // we just happen to know there are 13 images in total.
  nextImage = nextImage > 13 ? 1 : nextImage;
  lastImage = nextImage;

  return `/sponsors/${nextImage}.png`;
};

let intervalId;

class Sponsors extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      sponsorImage: getRandomImage(),
    };
  }

  componentDidMount() {
    intervalId = setInterval(() => {
      this.setState({
        ...this.state,
        sponsorImage: getRandomImage(),
      });
    }, 10000);
  }

  componentWillUnmount() {
    clearInterval(intervalId);
  }

  render() {
    return (
      <Fragment>
        <div className="sponsors">
          <div className="sponsors__img-wrapper">
            <img className="sponsors__img" src={this.state.sponsorImage} alt="" />
          </div>
        </div>
      </Fragment>
    );
  }
}

export default Sponsors;
