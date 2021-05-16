import React, { Fragment } from "react";

import PageTitle from "../../../Layout/AppMain/PageTitle";

// Examples
import ModalsExample from "./Examples";

export default class ModalsExamples extends React.Component {
  render() {
    return (
      <Fragment>
        <PageTitle heading="Modals"
          subheading="Wide selection of modal dialogs styles and animations available."
          icon="fa fa-phone icon-gradient bg-premium-dark"/>
        <ModalsExample />
      </Fragment>
    );
  }
}
