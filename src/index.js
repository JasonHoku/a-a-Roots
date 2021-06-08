import "./polyfills";
import "react-app-polyfill/ie11";
import "react-app-polyfill/stable";

import "core-js";

import "core-js/features/set";

import React, { Suspense } from "react";

import Loader from "react-loaders";

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

import "firebaseui/dist/firebaseui.css";

import "./Pages/Dashboards/Home/Examples/backgroundeffect";

const store = configureStore();
const rootElement = document.getElementById("root");

ReactDOM.render(
  <Suspense
    fallback={
      <div className="loader-container">
        <Loader
          style={{
            transform: "scale(1.1)",
            top: "-100px",
            left: "140px",
            position: "relative",
            display: "center",
          }}
          color="#28bbDD"
          type="ball-zig-zag-deflect"
        />
        <div className="text-center" style={{ color: "white" }}>
          <h2>Loading a`a Roots </h2>
        </div>
      </div>
    }
  >
    <span style={{ position: "fixed", zIndex: 0 }} id="bgEffectDOM"></span>
    <Provider store={store}>
      <Router>
        <Main />
        <CheckVersions />
      </Router>
    </Provider>{" "}
  </Suspense>,
  rootElement
);

var isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
if (isSafari) {
  serviceWorkerRegistration.unregister();
} else {
  serviceWorkerRegistration.register();
}
reportWebVitals();
