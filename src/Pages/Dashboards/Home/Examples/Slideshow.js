import React from "react";
import { Slide } from "react-slideshow-image";
import "./slide.css";
import { Zoom } from "react-slideshow-image";
import { Radar } from "react-chartjs-2";

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

const data4 = {
  labels: [
    "Transportation",
    "Agriculture",
    "Waste",
    "Energy",
    "Water",
    "Community",
    "Education",
  ],
  datasets: [
    {
      label: "Your Score",
      backgroundColor: "rgba(179,181,198,0.2)",
      borderColor: "rgba(179,181,198,1)",
      pointBackgroundColor: "rgba(179,181,198,1)",
      pointBorderColor: "#fff",
      pointHoverBackgroundColor: "#fff",
      pointHoverBorderColor: "rgba(179,181,198,1)",
      data: [65, 59, 90, 81, 56, 55, 40],
    },
    {
      label: "Comparison",
      backgroundColor: "rgba(255,99,132,0.2)",
      borderColor: "rgba(255,99,132,1)",
      pointBackgroundColor: "rgba(255,99,132,1)",
      pointBorderColor: "#fff",
      pointHoverBackgroundColor: "#fff",
      pointHoverBorderColor: "rgba(255,99,132,1)",
      data: [28, 48, 40, 19, 96, 27, 100],
    },
  ],
};
const Slideshow = () => {
  return (
    <Slide easing="ease">
      <Container fluid>
        <br />
        <Row
          style={{
            backgroundColor: "transparent",
            justifyContent: "center",
            paddingLeft: "5px",
            paddingRight: "5px",
          }}
        >
          <Card
            style={{
              justifyContent: "center",
              float: "center",
              alignContent: "center",
              maxWidth: window.innerWidth * 0.8,
              boxShadow: "0px 0px 0px 5px rgba(0,0,80, .3)",
            }}
          >
            <span style={{ textAlign: "center" }}>
              <b>&nbsp;Public And Private Listings</b>
            </span>
            <div
              style={{
                width: "100%",
              }}
            >
              <img
                alt="A`A Roots Business Listings"
                src="/images/Slideshow/black-sand.jpg"
                style={{
                  width: "100%",
                  position: "relative",
                }}
              ></img>
            </div>
            <div
              style={{
                width: "100%",
                position: "relative",
                backgroundColor: "white",
                bottom: "0px",
                right: "0",
              }}
            >
              <Radar data={data4} />
            </div>
          </Card>
        </Row>
        <br />
      </Container>
      <Container fluid>
        <br />
        <Row
          style={{
            backgroundColor: "transparent",
            justifyContent: "center",
            paddingLeft: "5px",
            paddingRight: "5px",
          }}
        >
          <Card
            style={{
              justifyContent: "center",
              float: "center",
              maxWidth: window.innerWidth * 0.8,
              alignContent: "center",
              boxShadow: "0px 0px 0px 5px rgba(0,0,80, .3)",
            }}
          >
            <span style={{ textAlign: "center" }}>
              <b>&nbsp;Generating Sustainable Information</b>
            </span>
            <div
              style={{
                width: "100%",
              }}
            >
              <img
                alt="aarootshi.com Maui, Lahaina Sustainable Data"
                src="/images/Slideshow/bs2.jpg"
                style={{
                  width: "100%",
                  position: "relative",
                }}
              ></img>{" "}
            </div>
            <div
              style={{
                width: "100%",
                backgroundColor: "white",
                bottom: "0px",
                right: "0",
              }}
            >
              <Radar data={data4} />
            </div>
          </Card>
        </Row>
        <br />
      </Container>
      <Container fluid>
        <br />
        <Row
          style={{
            backgroundColor: "transparent",
            justifyContent: "center",
            paddingLeft: "6px",
            paddingRight: "6px",
          }}
        >
          <Card
            style={{
              justifyContent: "center",
              float: "center",
              alignContent: "center",

              boxShadow: "0px 0px 0px 5px rgba(0,0,80, .3)",
            }}
          >
            <span style={{ textAlign: "center" }}>
              <b>&nbsp;Preserving Aloha</b>
            </span>
            <div
              style={{
                width: "100%",
              }}
            >
              {" "}
              <img
                alt="A`A Roots Business Listings"
                src="/images/Slideshow/haleakela.jpg"
                style={{
                  width: "100%",
                  position: "relative",
                }}
              ></img>{" "}
            </div>
            <div
              style={{
                width: "100%",
                backgroundColor: "white",
                bottom: "0px",
                right: "0",
              }}
            >
              <Radar data={data4} />
            </div>
          </Card>
        </Row>
        <br />
      </Container>
    </Slide>
  );
};

export default Slideshow;
