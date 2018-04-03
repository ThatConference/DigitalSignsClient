import { PropTypes } from 'prop-types';
import React, { Fragment } from 'react';

import Session from './Session';
import Footer from './Footer';

import './Room.css';

/*

{
  "roomId": fromQueryString
}
room(roomId=$roomId){
  upnext {
    speakerName: "clark",
    sessionTitle: "foo is bar"
  },
  currentSession: {
    sessionTitle: 'asdf',
    speakerName: 'clark',
    speakerCompany: 'unspecified',
    haedshot: 'http://foo/foo'
  }
}

// query here? and pass down through props?

*/

const Room = props => (
  <Fragment>
    <main className="room">
      <Session roomId={props.match.params.roomId} />
      <Footer />
    </main>
  </Fragment>
);

Room.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      roomId: PropTypes.node,
    }).isRequired,
  }).isRequired,
};

export default Room;
