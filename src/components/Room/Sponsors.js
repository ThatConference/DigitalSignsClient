import React, { Fragment, PureComponent } from 'react';

import './Session.css';

const rando = arr => arr[Math.floor(Math.random() * arr.length)];
let lastImage = 0;

const getRandomImage = () => {
  const images = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13];

  let nextImage = rando(images);

  while (nextImage === lastImage) {
    nextImage = rando(images);
  }

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
