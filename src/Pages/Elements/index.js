import React, { Fragment } from "react";
// Layout
import AppHeader from "../../Layout/AppHeader/";
import AppSidebar from "../../Layout/AppSidebar/";

// Theme Options

import ThemeOptions from "../../Layout/ThemeOptions/";

const Elements = ({ match }) => (
  <Fragment>
    <ThemeOptions />
    <AppHeader />
    <div className="app-main">
      <AppSidebar />
      <div className="app-main__outer">
        <div className="app-main__inner"></div>
      </div>
    </div>
  </Fragment>
);

export default Elements;
