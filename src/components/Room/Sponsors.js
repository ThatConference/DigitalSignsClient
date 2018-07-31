import React, { Fragment, PureComponent } from 'react';

import './Session.css';

let lastImage = 1;

const getRandomImage = () => {
  let nextImage = lastImage += 1

  // we just happen to know there are 13 images in total.
  nextImage = nextImage > 13 ? 1 : nextImage;
  lastImage = nextImage;

  return `/sponsors/${nextImage}.jpg`;
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
        <div className="session__img-wrapper">
          <img className="session__img" src={this.state.sponsorImage} alt="" />
        </div>
      </Fragment>
    );
  }
}

export default Sponsors;
