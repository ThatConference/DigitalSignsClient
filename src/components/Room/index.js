import React, { Component, Fragment } from "react";

import Session from "./Session";
import Header from "./Header";
import Footer from "./Footer";

import "./Room.css";

class Room extends Component {
  render() {
    return (
      <Fragment>
        <main className="room">
          <Header />
          <Session />
          <Footer />
        </main>
      </Fragment>
    );
  }
}

export default Room;
