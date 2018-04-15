import gql from 'graphql-tag';
import React, { Fragment } from 'react';
import { Query } from 'react-apollo';

import Loading from './common/Loading';

import logo from './logo.svg';
import './App.css';

const roomsQuery = `{ 
  rooms {
    name
    id
  }
}`;

const App = props => (
  <Query
    query={gql`
      ${roomsQuery}
    `}
  >
    {({ loading, error, data }) => {
      if (loading) return <Loading />;
      if (error) return <p>Error...</p>;

      const rooms = data.rooms.map(room => (
        <li key={room.id}>
          <a href={`/rooms/${room.id}`}>goto room: {room.name}</a>
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
