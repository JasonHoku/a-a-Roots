import React, { Fragment } from "react";
import MegaMenuFooter from "./Components/FooterMegaMenu";
import FooterDots from "./Components/FooterDots";

import collections from "../../assets/images/collections.png"; // gives image path

import productsandservices from "../../assets/images/productsandservices.png"; // gives image path

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
  NavLink,
  TabContent,
  TabPane,
  Progress,
  CardFooter,
  ButtonGroup,
} from "reactstrap";

class AppContent extends React.Component {
  render() {




    var element = document.getElementById("bgimg1");
    var element2 = document.getElementById("bgimg2");
    var element3 = document.getElementById("bgimg3");

    setTimeout(() => {
      element.style.opacity = "100";
      element.style.filter = "alpha(opacity=100)";
      element2.style.opacity = "0";
      element2.style.filter = "alpha(opacity=00)";
      element3.style.opacity = "0";
      element3.style.filter = "alpha(opacity=00)";
    }, 4000);

    setTimeout(() => {
      element3.style.opacity = "100";
      element3.style.filter = "alpha(opacity=100)";
      element.style.opacity = "0";
      element.style.filter = "alpha(opacity=00)";
      element2.style.opacity = "0";
      element2.style.filter = "alpha(opacity=00)";
    }, 8000);

    setTimeout(() => {
      element.style.opacity = "00";
      element.style.filter = "alpha(opacity=00)";
      element2.style.opacity = "100";
      element2.style.filter = "alpha(opacity=100)";
      element3.style.opacity = "0";
      element3.style.filter = "alpha(opacity=00)";
    }, 12000);

    ///bg loop
    setInterval(() => {
      setTimeout(() => {
        element.style.opacity = "100";
        element.style.filter = "alpha(opacity=100)";
        element2.style.opacity = "0";
        element2.style.filter = "alpha(opacity=00)";
        element3.style.opacity = "0";
        element3.style.filter = "alpha(opacity=00)";
      }, 6000);

      setTimeout(() => {
        element3.style.opacity = "100";
        element3.style.filter = "alpha(opacity=100)";
        element.style.opacity = "0";
        element.style.filter = "alpha(opacity=00)";
        element2.style.opacity = "0";
        element2.style.filter = "alpha(opacity=00)";
      }, 12000);

      (() => {
        element.style.opacity = "00";
        element.style.filter = "alpha(opacity=00)";
        element2.style.opacity = "100";
        element2.style.filter = "alpha(opacity=100)";
        element3.style.opacity = "0";
        element3.style.filter = "alpha(opacity=00)";
      }, 18000);
    }, 18000);

    return (

      <Fragment>

        <Row>
          <Col>
            <Card
              style={{
                position: "relative",
                top: 650,
                width: "26rem",
                opacity: 100,
              }}
            >
              <CardHeader>9/18/2020 # WEBSITE UNDER CONSTRUCTION # </CardHeader>{" "}
              <CardBody>
                Soon to feature: <br />
                <li>Metal Print Collection</li> <li> Wood &amp; Canvas Series</li>{" "}
              </CardBody>
            </Card>

            <Card
              style={{
                position: "relative",
                top: 1020,
                width: "20rem",
                opacity: 100,
              }}
            >
              <CardHeader> Coming Soon</CardHeader>{" "}
              <CardBody>
                Stay tuned for updates in the coming days at aarootshi.com
              </CardBody>
            </Card>
            <Card
              style={{
                position: "relative",
                top: 1150,
                width: "14rem",
                opacity: 100,
              }}
            >
              <CardHeader> Coming Soon</CardHeader>{" "}
              <CardBody>
                Affiliates, products and additional information arriving in the days to come.
              </CardBody>
            </Card>
          </Col>
        </Row>

        <Row>
          <Col>
            <img
              src={collections}
              id="bgimg1"
              style={{
                position: "relative",
                top: 650,
                left: 250,
                opacity: 100,
              }}
            />
          </Col>
        </Row>

        <Row>
          <Col>
            <img
              src={productsandservices}
              id="bgimg1"
              style={{
                position: "relative",
                top: 850,
                left: 250,
                opacity: 100,
              }}
            />
          </Col>

        </Row>
<Row
              style={{
                position: "relative",
                top: 1250,
                width: "14rem",
                opacity: 100,
              }}> <p> &nbsp; </p></Row>
      </Fragment>
    );
  }
}

export default AppContent;
