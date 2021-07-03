import React, { Fragment } from "react";
import CSSTransitionGroup from "react-transition-group/CSSTransitionGroup";
import "../AppHeader/Components/analytics";
import mauisat from "../../assets/images/MauiSat2.webp";
import { Redirect } from "react-router-dom";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";

class LandingPage extends React.Component {
  constructor(props) {
    super(props);
    this.handleClickX = this.handleClick.bind(this);

    this.state = {
      sideBarVar: "1",
      redirect: false,
    };
  }

  runLoadSite() {
    document.getElementById("fadeIn").className = "landingContent fadeOut";

    setTimeout(() => {
      window.location.pathname = "/dashboards/home";
    }, 500);
  }

  handleClick() {}

  setRedirect = () => {
    this.setState({
      redirect: true,
    });
  };

  renderRedirect = () => {
    if (this.state.redirect) {
      return <Redirect to="/home" />;
    }
  };
  render() {
    console.log(window.location.pathname);
    if (window.location.pathname === "/") {
      return (
        <Fragment>
          <Helmet>
            <title>A'a Roots Maui: Quality Local Nutrition.</title>
            <meta
              name="description"
              content="A'a Roots: Bringing incredible, local, vegetarian and vegan delicacies to life."
            />
          </Helmet>
          <div
            onClick={() =>
              (document.getElementById("fadeIn").className =
                "landingContent fadeOut") &
              setTimeout(() => {
                this.setRedirect();
              }, 500)
            }
          >
            {this.renderRedirect()}
            <CSSTransitionGroup
              component="span"
              transitionName="MainAnimation4"
              transitionAppear={true}
              transitionAppearTimeout={700}
              transitionEnter={false}
              transitionLeave={false}
            >
              <span
                style={{ position: "absolute", zIndex: 2 }}
                id="fadeIn"
                className="landingContent fadeIn "
              >
                <br /> <h3 style={{ fontSize: "46px" }}>A`A Roots</h3> <br />
                <span style={{ width: "200px", height: "200px" }}>
                  <img
                    className="spin landingMaui"
                    style={{ width: "200px", zIndex: 11 }}
                    alt="The Island Of Maui"
                    src={mauisat}
                  ></img>
                  <img
                    alt="Pinpoint Centered On Maui"
                    className="landingPin "
                    style={{
                      position: "absolute",
                      zIndex: 12,
                      cursor: "pointer",
                    }}
                    src="./images/Google_Maps_pin.svg"
                  ></img>
                </span>
                <br />
                <br />
                <h2 style={{ margin: "35px" }}>
                  Hawaii's Resource For Everything Sustainable
                </h2>
                <h3 style={{ margin: "25px", textAlign: "center" }}>
                  &nbsp;&nbsp;Join A`A Roots in plotting Hawaii's ecosystem into
                  intuitive and powerful technologies. <br />
                </h3>
                <br />
                <h4>
                  <Link style={{ color: "white" }} to="/home">
                    Click Anywhere To Enter
                  </Link>
                </h4>
                <br />
                <br />
              </span>
            </CSSTransitionGroup>
          </div>
        </Fragment>
      );
    }
  }
}

export default LandingPage;
