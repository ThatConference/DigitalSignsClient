import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import React, { Fragment } from 'react';

import Loading from './Loading';
import Data from './Data';
import Session from './Session';
import Header from './Header';
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

const queryString = `{
  rates(currency: "USD") {
    currency
    rate
  }
}`;

const Room = props => (
  <Query
    query={gql`
      ${queryString}
    `}
  >
    {({ loading, error, data }) => {
      if (loading) return <Loading />;
      if (error) return <p>Error...</p>;

      return (
        <Fragment>
          <main className="room">
            <Header />
            <Session />
            <Footer />
          </main>
          <Data results={JSON.stringify(data)} />
        </Fragment>
      );
    }}
  </Query>
);

export default Room;
