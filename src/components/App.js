import gql from 'graphql-tag';
import React, { Fragment } from 'react';
import { Query } from 'react-apollo';

import logo from './logo.svg';
import './App.css';

const roomsQuery = gql` 
  query getRooms ($eventId: String){
    rooms(eventId: $eventId) {
      name
    }
  }`;

const App = props => (
  <Query
    query={roomsQuery}
    variables={{ eventId: process.env.REACT_APP_EVENT_ID }}
  >

    {({ loading, error, data }) => {
      if (loading) return null;
      if (error) return <p>Error...</p>;

      const rooms = data.rooms.map(room => (
        <li key={room.name}>
          <a href={`/rooms/${room.name}`}>{room.name}</a>
        </li>
      ));

      return (
        <Fragment>
          <div className="App">
            <header className="App-header">
              <img src={logo} className="App-logo" alt="logo" />
              <h1 className="App-title">THAT Sign</h1>
            </header>
            <div className="App-intro">
              <ul>{rooms}</ul>
            </div>
          </div>
        </Fragment>
      );
    }}
  </Query>
);

export default App;
