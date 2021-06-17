import React, { Component, Fragment } from "react";

import CSSTransitionGroup from "react-transition-group/CSSTransitionGroup";

import {
  Row,
  Col,
  Button,
  UncontrolledButtonDropdown,
  DropdownToggle,
  ListGroup,
  ListGroupItem,
  Card,
  CardBody,
  Form,
  FormGroup,
  Label,
  Container,
  Input,
  CardHeader,
  NavLink,
  TabContent,
  TabPane,
  Progress,
  CardFooter,
  ButtonGroup,
  CardLink,
} from "reactstrap";

import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";

export default class CRMDashboard2 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeTab: "1",
      formName: "",
      formEmail: "",
      formMessage: "",
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.toggle = this.toggle.bind(this);
  }

  toggle(tab) {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab,
      });
    }
  }

  handleInputChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  componentDidMount() {
    this.setState({ isLoading: true });
    setTimeout(() => {
      document.getElementById("HomeImg").style.opacity = 1;
      document.getElementById("HomeImg").hidden = false;
    }, 600);
    setTimeout(() => {
      document.getElementById("HomeFooter").style.opacity = 1;
      document.getElementById("HomeFooter").hidden = false;
    }, 900);
  }

  render() {
    const { data } = this.state;
    return (
      <Fragment>
        <Helmet>
          <title>A`a Roots Home: Discover, Order, Grow.</title>
          <meta
            name="description"
            content="Join A`a Roots in plotting Hawaii's ecosystem into intuitive and powerful technologies."
          />
          <link rel="canonical" href="https://AaRoots.com/home" />
        </Helmet>
        <CSSTransitionGroup
          component="div"
          transitionName="TabsAnimation"
          transitionAppear={true}
          transitionAppearTimeout={0}
          transitionEnter={false}
          transitionLeave={false}
        >
          <div
            hidden
            id="HomeImg"
            style={{
              position: "absolute",
              left: "0px",
              top: "80px",
              opacity: 0,
              background: "#000000",

              background:
                "linear-gradient(to bottom, rgba(0, 0, 0, 0.50) 100%, rgba(0, 0, 0, 0) 75%, rgba(0, 0, 0, 0.95) 100%), url(/images/homeimage.jpg)",
              backgroundPosition: "center",
              backgroundColor: "black",
              backgroundSize: "cover",
              backgroundAttachment: "fixed",
              backgroundRepeat: "no-repeat",
              transition: "background 5s ease-in-out",
              width: "100%",
              height: "525px",
            }}
          >
            <div style={{ height: "200px" }}></div>
            <span
              style={{ position: "relative", top: "-55px" }}
              className="homePageHeader"
            >
              <h1 style={{ color: "white", textAlign: "center" }}>
                WELCOME TO A`A ROOTS
              </h1>
              <h2 style={{ color: "white", textAlign: "center" }}>
                Specializing In Vegan Cuisine
                <br />
                <br />
                <Link to="/menu">
                  <Button
                    style={{ height: "75px", width: "150px" }}
                    color="primary"
                  >
                    <span style={{ fontSize: "22px" }}> Menu →</span>
                  </Button>
                </Link>
              </h2>
            </span>
          </div>
          <Row
            hidden
            id="HomeFooter"
            style={{ position: "relative", top: "485px" }}
          >
            <Card
              className="mb-3 main-card"
              style={{
                boxShadow: "0px 0px 0px 5px rgba(50,50,50, .8)",
              }}
            >
              <CardBody
                style={{
                  alignItems: "center",
                  justifyContent: "center",
                  backgroundColor: "transparent",
                  textAlign: "center",
                }}
              >
                <h2>
                  {" "}
                  Thank You For Visiting!{" "}
                  <span aria-label="sprout emoji" role="img">
                    🌱
                  </span>
                </h2>
                <br />
                <h3>
                  A`a Roots revolves around being health-conscious and
                  eco-friendly. We thrive to prepare fresh, locally sourced,
                  vegan dishes, along with freshly pressed juices and smoothies
                  that are infused with superfoods.
                </h3>
                <br />
                <h4>
                  We are passionate about creating a healthier community by
                  providing healthy options. What will you choose today?
                </h4>
                <br />
                <br />
                <Link to="/about">
                  <Button
                    style={{ height: "75px", width: "150px" }}
                    color="primary"
                  >
                    <span style={{ fontSize: "22px" }}> Our Story</span>
                  </Button>
                </Link>
                <br />
                <br /> <br />{" "}
                <div>
                  <h4>
                    <p>
                      &nbsp;For daily specials and new items, follow us on
                      Instagram or call us!
                    </p>
                    <center>
                      <p>
                        <a
                          href="https://www.instagram.com/aarootsmaui/"
                          target="_blank"
                        >
                          <strong>@aarootsmaui</strong>
                        </a>
                        <strong> </strong>
                      </p>
                      <p>(808) 298-2499</p>
                    </center>
                  </h4>
                </div>
                <br /> <br />
                <div>
                  Servicing Napili, Hokonkawai, Kapalua, Lahaina area residents
                  through local vegan, vegetarian, high quality, organic,
                  nutritious and delicious recipes.
                </div>
              </CardBody>
              <br />
            </Card>
            <br /> <br />
          </Row>
        </CSSTransitionGroup>
      </Fragment>
    );
  }
}
