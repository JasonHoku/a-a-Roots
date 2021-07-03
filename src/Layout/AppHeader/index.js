import React, { Fragment } from "react";
import cx from "classnames";
import { findDOMNode } from "react-dom";
import ReactGA from "react-ga";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import { connect } from "react-redux";

import CSSTransitionGroup from "react-transition-group/CSSTransitionGroup";

import { Popover, Nav, NavLink, Col, Row, NavItem, Button } from "reactstrap";

import HeaderLogo from "../AppLogo";

import MegaMenu from "./Components/MegaMenu";
import Login from "../../Login/Login";

import SendToGoogleAnalytics from "./Components/analytics";

import HeaderDots from "./Components/HeaderDots";

import LoginRedirect from "../../Login/LoginRedirect";

import {
  setEnableMobileMenu,
  setEnableMobileMenuSmall,
} from "../../reducers/ThemeOptions";

class Header extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      url: "",
    };
    this.updateState = this.updateState.bind(this);
    this.toggleMobileSmall = this.toggleMobileSmall.bind(this);
  }
  updateState() {
    this.setState({
      url: window.location.path,
    });

    this.onClickGA = this.onClickGA.bind(this);
  }

  componentDidMount() {
    document.addEventListener("click", this.onClickGA.bind(this), false,  {passive: true});
    document.addEventListener(
      "click",
      this.closePopupOnClick.bind(this),
      false , {passive: true}
    );
    ReactGA.initialize("UA-102481694-5");
  }

  componentWillUnmount() {
    document.removeEventListener("click", this.onClickGA.bind(this), false);
    document.removeEventListener(
      "click",
      this.closePopupOnClick.bind(this),
      false
    );
  }

  closePopupOnClick(event) {
    let { enableMobileMenuSmall, setEnableMobileMenuSmall } = this.props;
    if (enableMobileMenuSmall) {
      if (this.state.mobileActive === true) {
        console.log(String(event.target.id));
        if (
          String(event.target.className) === "[object SVGAnimatedString]" ||
          String(event.target.id) === "MobileMenuID" ||
          String(event.target.id) === "btn-icon-wrapper" ||
          String(event.target.id) === "MobileMenuID" ||
          String(event.target.className) === "MobileMenuID" ||
          String(event.target.id) === "MobileMenuIcon"
        ) {
          console.log("Yes");
        } else {
          console.log(String(event.target.id));
          this.toggleMobileSmall();
        }
      } else {
        this.setState({ mobileActive: false });
      }
      this.setState({ mobileActive: true });
    } else {
    }
  }

  toggleMobileSmall() {
    let { enableMobileMenuSmall, setEnableMobileMenuSmall } = this.props;
    setEnableMobileMenuSmall(!enableMobileMenuSmall);
    this.setState({ mobileActive: false });
  }

  onClickGA(event) {
    ReactGA.pageview(window.location.pathname + window.location);
    const domNode = findDOMNode(event.target);
    ReactGA.outboundLink(
      {
        label: "Clicked :" + domNode.outerHTML,
      },
      function () {
        try {
        } catch (error) {}
      }
    );
  }

  render() {
    let {
      headerBackgroundColor,
      enableMobileMenuSmall,
      enableHeaderShadow,
    } = this.props;
    return (
      <Fragment>
        <CSSTransitionGroup
          component="div"
          className={cx("app-header", headerBackgroundColor, {
            "header-shadow": enableHeaderShadow,
          })}
          transitionName="HeaderAnimation"
          transitionAppear={true}
          transitionAppearTimeout={300}
          transitionEnter={true}
          transitionEnterTimeout={300}
          transitionLeave={false}
        >
          <HeaderLogo />

          <SendToGoogleAnalytics />

          <div
            className={cx("app-header__content", {
              "header-mobile-open": enableMobileMenuSmall,
            })}
          >
            <div className="app-header-left">
              <MegaMenu />
            </div>
            <div className="app-header-right">
              <Link to="/menu">
                <Button
                  onClick={() => {
                    if (window.location.pathname === "/menu") {
                      window.location.reload();
                    }
                  }}
                  className="btn-icon-horizontal btn-transition app-header-right"
                  color="light"
                >
                  <span style={{ fontSize: "22px", textAlign: "center" }}>
                    Menu
                  </span>
                </Button>
              </Link>{" "}
              &nbsp;
              <Link to="/about">
                <Button
                  onClick={() => {
                    if (window.location.pathname === "/about") {
                      window.location.reload();
                    }
                  }}
                  className="btn-icon-horizontal btn-transition app-header-right"
                  color="light"
                >
                  <span style={{ fontSize: "22px", textAlign: "center" }}>
                    About
                  </span>
                </Button>{" "}
              </Link>
              &nbsp;
              <Link to="/contact">
                <Button
                  onClick={() => {
                    if (window.location.pathname === "/contact") {
                      window.location.reload();
                    }
                  }}
                  className="btn-icon-horizontal btn-transition app-header-right"
                  color="light"
                >
                  <span style={{ fontSize: "22px", textAlign: "center" }}>
                    Contact
                  </span>
                </Button>
              </Link>
              &nbsp;
              <span style={{ width: "15px" }}></span>
            </div>
          </div>
        </CSSTransitionGroup>
      </Fragment>
    );
  }
}

const mapStateToProps = (state) => ({
  enableHeaderShadow: state.ThemeOptions.enableHeaderShadow,
  closedSmallerSidebar: state.ThemeOptions.closedSmallerSidebar,
  headerBackgroundColor: state.ThemeOptions.headerBackgroundColor,
  enableMobileMenuSmall: state.ThemeOptions.enableMobileMenuSmall,
});

const mapDispatchToProps = (dispatch) => ({
  setEnableMobileMenu: (enable) => dispatch(setEnableMobileMenu(enable)),
  setEnableMobileMenuSmall: (enable) =>
    dispatch(setEnableMobileMenuSmall(enable)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);
