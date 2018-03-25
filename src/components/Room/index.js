import React, { Fragment } from 'react';

import Session from './Session';
import Header from './Header';
import Footer from './Footer';

import './Room.css';

const Room = props => (
  <Fragment>
    <main className="room">
      <Header />
      <Session />
      <Footer />
    </main>
  </Fragment>
);

export default Room;
