import React, { Fragment } from "react";


class MegaMenu extends React.Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      dropdownOpen: false,
      popoverOpen: false,
      url: "",
    };
    this.updateState = this.updateState.bind(this);
  }

  toggle() {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen,
      popoverOpen: !this.state.popoverOpen,
    });
  }
  updateState() {
    this.setState({
      url: window.location.path,
    });
  }
  componentDidMount() {
    window.addEventListener("popstate", this.updateState, false);
  }
  render() {
    return (
      <Fragment>
      </Fragment>
    );
  }
}

export default MegaMenu;
