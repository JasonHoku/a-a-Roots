import React, { Fragment } from "react";
import { connect } from "react-redux";

import { Slider } from "react-burgers";

import cx from "classnames";

import { FiMoreVertical } from "react-icons/fi";

import { IconContext } from "react-icons";

import { Button } from "reactstrap";

import {
  setEnableMobileMenu,
  setEnableMobileMenuSmall,
} from "../../reducers/ThemeOptions";

class AppMobileMenu extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      active: false,
      mobile: false,
      activeSecondaryMenuMobile: false,
    };
    this.toggleMobileSidebar = this.toggleMobileSidebar.bind(this);
    this.hashChangeEvent = this.hashChangeEvent.bind(this);
    this.handleClickOutside = this.handleClickOutside.bind(this);
  }

  handleClickOutside(event) {
    if (String(event.target.className).includes("Burger")) {
    } else {
      this.setState({ active: false });
      this.toggleMobileSidebar();
      this.toggleMobileSmall();
    }
  }

  hashChangeEvent() {
    this.setState({ active: false });
    this.toggleMobileSidebar();
    this.toggleMobileSmall();
  }

  componentDidMount() {
    document.addEventListener(
      "click",
      this.handleClickOutside.bind(this),
      true,  {passive: true}
    );
  }
  componentWillUnmount() {
    document.removeEventListener(
      "click",
      this.handleClickOutside.bind(this),
      false
    );
    document.removeEventListener(
      "hashchange",
      this.hashChangeEvent.bind(this),
      false
    );
  }

  toggleMobileSidebar = () => {
    let { enableMobileMenu, setEnableMobileMenu } = this.props;
    setEnableMobileMenu(!enableMobileMenu);
  };

  toggleMobileSmall = () => {
    let { enableMobileMenuSmall, setEnableMobileMenuSmall } = this.props;
    setEnableMobileMenuSmall(!enableMobileMenuSmall);
  };

  state = {
    openLeft: false,
    openRight: false,
    relativeWidth: false,
    width: 280,
    noTouchOpen: false,
    noTouchClose: false,
  };

  render() {
    return (
      <Fragment>
        <div className="app-header__mobile-menu">
          <div onClick={this.toggleMobileSidebar}></div>
        </div>
        <div className="app-header__menu">
          <span onClick={this.toggleMobileSmall}></span>
        </div>
      </Fragment>
    );
  }
}

const mapStateToProps = (state) => ({
  closedSmallerSidebar: state.ThemeOptions.closedSmallerSidebar,
  enableMobileMenu: state.ThemeOptions.enableMobileMenu,
  enableMobileMenuSmall: state.ThemeOptions.enableMobileMenuSmall,
});

const mapDispatchToProps = (dispatch) => ({
  setEnableMobileMenu: (enable) => dispatch(setEnableMobileMenu(enable)),
  setEnableMobileMenuSmall: (enable) =>
    dispatch(setEnableMobileMenuSmall(enable)),
});

export default connect(mapStateToProps, mapDispatchToProps)(AppMobileMenu);
