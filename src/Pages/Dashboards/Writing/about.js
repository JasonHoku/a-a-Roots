import React, { Component, Fragment } from "react";
import CSSTransitionGroup from "react-transition-group/CSSTransitionGroup";

import {
  Row,
  Col,
  Button,
  UncontrolledButtonDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Nav,
  NavItem,
  ListGroup,
  ListGroupItem,
  Card,
  CardBody,
  CardHeader,
  CardLink,
  CardImg,
  NavLink,
  TabContent,
  TabPane,
  Progress,
  CardFooter,
  ButtonGroup,
} from "reactstrap";

import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";

const CLIENT = {
  sandbox: process.env.PAYPAL_CLIENT_ID_SANDBOX,
  production: process.env.PAYPAL_CLIENT_ID_PRODUCTION,
};

export default class WritingElements extends Component {
  constructor(props) {
    super(props);

    this.toggle2 = this.toggle2.bind(this);
    this.state = {
      activeTab2: "222",
      activeTab1: "11",
    };
  }

  toggle2(tab) {
    if (this.state.activeTab2 !== tab) {
      this.setState({
        activeTab2: tab,
      });
    }
  }

  toggle1(tab) {
    if (this.state.activeTab1 !== tab) {
      this.setState({
        activeTab1: tab,
      });
    }
  }

  render() {
    const { data } = this.state;

    return (
      <Fragment>
        <Helmet>
          <title>A`a Roots About</title>
          <meta
            name="description"
            content="Learn about A`a Roots at this informative webpage."
          />
          <link rel="canonical" href="https://a-a-roots.web.app/about" />
        </Helmet>
        <CSSTransitionGroup
          component="div"
          transitionName="TabsAnimation"
          transitionAppear={true}
          transitionAppearTimeout={0}
          transitionEnter={false}
          transitionLeave={false}
        >
          <Card
            style={{
              zIndex: 1,
              opacity: 100,
              width: "100%",
              position: "auto",
              boxShadow: "0px 0px 0px 5px rgba(50,50,50, .8)",
              left: "auto",
            }}
          >
            <CardBody
              style={{
                backgroundColor: "#FFFFFF",
                fontSize: "22px",
                fontWeight: 600,
                fontFamily: `"Montserrat", sans-serif`,
              }}
            >
              <CardHeader style={{ textAlign: "center" }}>
                <h2>OUR MISSION</h2>
              </CardHeader>
              <br /> &nbsp;&nbsp; a'a Roots revolves around being health
              conscious and eco friendly. We achieve this by preparing fresh and
              locally sourced vegan dishes, along with freshly pressed juices
              and smoothies that are infused with super-foods for everyone to
              enjoy.
              <br /> <br />
              <br />
              <CardHeader style={{ textAlign: "center" }}>
                <h2> SUPPORT LOCAL </h2>
              </CardHeader>
              <br /> <br />
              &nbsp;&nbsp; Mahalo to our local farms and businesses who have
              been supportive and share our passion of creating a healthier
              Community by providing healthy options. <br /> <br />
              <br />
              <CardHeader style={{ textAlign: "center" }}>
                <h2> GRAB & GO </h2>
              </CardHeader>
              <br /> <br />
              &nbsp;&nbsp;Don't forget to check daily our "GRAB & GO" cooler!
              <br /> <br />&nbsp;&nbsp; You'll find locally made products along with freshly
              squeezed juices, food for on-the-go, and delicious desserts
            </CardBody>
          </Card>
        </CSSTransitionGroup>
      </Fragment>
    );
  }
}
