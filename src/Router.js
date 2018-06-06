import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Room from './components/Room/Room';
import App from './components/App';

const Router = props => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={App} />
      <Route path="/rooms/:roomName" component={Room} />
    </Switch>
  </BrowserRouter>
);

export default Router;
