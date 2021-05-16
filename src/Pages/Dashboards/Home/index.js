import React, { Component, Fragment } from "react";
import CSSTransitionGroup from "react-transition-group/CSSTransitionGroup";

import PageTitleAlt2 from "../../../Layout/AppMain/PageTitleAlt2";

import Tabs, { TabPane } from "rc-tabs";
import TabContent from "rc-tabs/lib/SwipeableTabContent";
import ScrollableInkTabBar from "rc-tabs/lib/ScrollableInkTabBar";


// Examples
import CRMDashboard2 from "./Examples/Variation2";


import { Router, Switch, Route } from "react-router-dom";


//  

export default class HomeDashboard extends Component {
  render() {
    return ( 
      <Fragment>
            <CRMDashboard2 />
      </Fragment>
    )
    
  }
}
