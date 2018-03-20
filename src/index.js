import React from "react";
import { render } from "react-dom";

import Router from "./components/Router";
import App from "./components/App";

import "./index.css";
import registerServiceWorker from "./registerServiceWorker";

render(<Router />, document.getElementById("root"));

registerServiceWorker();
