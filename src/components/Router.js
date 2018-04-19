import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Room from './Room/Room';
import Map from './Map/Map';
import App from './App';

const Router = props => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={App} />
      <Route path="/rooms/:roomId" component={Room} />
      <Route path="/Map" component={Map} />
    </Switch>
  </BrowserRouter>
);

export default Router;
