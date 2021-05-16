import React, { Component, Fragment } from "react";
import CSSTransitionGroup from "react-transition-group/CSSTransitionGroup";


// Examples

import CRMDashboard2 from "./MenuPage";

//

export default class Menu extends Component {
  render() {
    return (
      <Fragment>
        <CSSTransitionGroup
          component="div"
          transitionName="TabsAnimation"
          transitionAppear={true}
          transitionAppearTimeout={0}
          transitionEnter={false}
          transitionLeave={false}
        >
          <CRMDashboard2 />
        </CSSTransitionGroup>
      </Fragment>
    );
  }
}
