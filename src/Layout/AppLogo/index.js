import React, { Fragment } from "react";
import { connect } from "react-redux";

import { Slider } from "react-burgers";

import { Link } from "react-router-dom";

import {
  setEnableClosedSidebar,
  setEnableMobileMenu,
  setEnableMobileMenuSmall,
} from "../../reducers/ThemeOptions";

class HeaderLogo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      active: false,
      mobile: false,
      activeSecondaryMenuMobile: false,
    };
  }

  handleClickOutside(event) {
    if (String(event.target.className).includes("Burger")) {
    } else {
      if (this.state.active === true) {
        this.toggleEnableClosedSidebar();
      }
    }
    this.setState({ active: false });
  }

  componentDidMount() {
    setTimeout(() => {
      document.getElementById("headerLogoID").hidden = false;
      document.getElementById("headerLogoID").style.opacity = 1;
    }, 750);
    document.addEventListener(
      "click",
      this.handleClickOutside.bind(this),
      true
    );
  }
  componentWillUnmount() {
    document.removeEventListener(
      "click",
      this.handleClickOutside.bind(this),
      false
    );
  }
  toggleEnableClosedSidebar = () => {
    let { enableClosedSidebar, setEnableClosedSidebar } = this.props;
    setEnableClosedSidebar(!enableClosedSidebar);
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
        <div className="app-header__logo">
          <Link
            style={{
              opacity: 0,
              transitionDuration: "1s",
              transition: "opacity 1s",
            }}
            id="headerLogoID"
            aria-label="Landing Page Link"
            to="/"
          >
            <div
              style={{
                position: "absolute",
                left: "50%",
                top: -25,
                transform: "translateX(-100px)",
              }}
              className="logo-src"
            >
              <img
                width="200px"
                height="100px"
                alt="A A Roots in Napili, Maui"
                style={{
                  zIndex: 999,
                  border: "0px",
                  position: "relative",
                  top: "25px",
                }}
                src="/logoHorizontal.webp"
              />
            </div>
          </Link>
          <div className="header__pane ml-auto"></div>
        </div>
        <span style={{ position: "absolute", top: "15px" }}>
          <Slider id="SidebarButton"
            aria-label="SidebarButton"
            role="button"
            aria-pressed="false"
            style={{ position: "absolute", top: "-25px" }}
            width={65}
            lineHeight={5}
            lineSpacing={8}
            color="#253030"
            active={this.state.active}
            onClick={() => {
              if (this.state.active) {
                this.setState({
                  active: !this.state.active,
                });
              } else {
                this.setState({
                  active: this.state.active,
                });
              }
              window.toggleSidebar();
            }}
          />
        </span>
      </Fragment>
    );
  }
}

const mapStateToProps = (state) => ({
  enableClosedSidebar: state.ThemeOptions.enableClosedSidebar,
  enableMobileMenu: state.ThemeOptions.enableMobileMenu,
  enableMobileMenuSmall: state.ThemeOptions.enableMobileMenuSmall,
});

const mapDispatchToProps = (dispatch) => ({
  setEnableClosedSidebar: (enable) => dispatch(setEnableClosedSidebar(enable)),
  setEnableMobileMenu: (enable) => dispatch(setEnableMobileMenu(enable)),
  setEnableMobileMenuSmall: (enable) =>
    dispatch(setEnableMobileMenuSmall(enable)),
});

export default connect(mapStateToProps, mapDispatchToProps)(HeaderLogo);
