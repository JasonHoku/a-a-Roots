import "./polyfills";
import "react-app-polyfill/ie11";
import "react-app-polyfill/stable";

import "core-js";

import "core-js/features/set";

import React from "react";
import ReactDOM from "react-dom";

import * as serviceWorkerRegistration from "./serviceWorkerRegistration";

import { BrowserRouter as Router } from "react-router-dom";

import "./App.scss";
import "./App.js";
import Main from "./Pages/Main";
import configureStore from "./config/configureStore";
import { Provider } from "react-redux";

import reportWebVitals from "./reportWebVitals";
import CheckVersions from "./Pages/Main/checkVersions";

var firebase = require("firebase");
import * as firebaseui from "firebaseui";
import "firebaseui/dist/firebaseui.css";


const store = configureStore();
const rootElement = document.getElementById("root");

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <Main />
      <CheckVersions />
    </Router>
  </Provider>,
  rootElement
);
var isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);

if (isSafari) {
  serviceWorkerRegistration.unregister();
} else {
  serviceWorkerRegistration.register();
}
reportWebVitals();
