import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import Room from "./Room";
import App from "./App";

const Router = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={App} />
      <Route path="/rooms/:roomId" component={Room} />
    </Switch>
  </BrowserRouter>
);

export default Router;
