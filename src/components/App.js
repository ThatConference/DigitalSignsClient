import React from 'react';
import logo from './logo.svg';
import './App.css';

const App = props => (
  <div className="App">
    <header className="App-header">
      <img src={logo} className="App-logo" alt="logo" />
      <h1 className="App-title">THAT Sign - FAQ</h1>
    </header>
    <p className="App-intro">
      <a href="/rooms/default">goto rooms</a>
    </p>
  </div>
);

export default App;
