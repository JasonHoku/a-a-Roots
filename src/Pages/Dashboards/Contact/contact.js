import React, { Component, Fragment } from "react";
import CSSTransitionGroup from "react-transition-group/CSSTransitionGroup";

import emailjs from "emailjs-com";

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
  CardTitle,
  ListGroupItem,
  Card,
  CardBody,
  Form,
  FormGroup,
  Label,
  Container,
  Input,
  FormText,
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

var EJSSERVICE = process.env.REACT_APP_EJSSERVICE;
var EJSTEMPLATE = process.env.REACT_APP_EJSTEMPLATE;
var EJSUSER = process.env.REACT_APP_EJSUSER;

var CLIIP;

const CLIENT = {
  sandbox: process.env.PAYPAL_CLIENT_ID_SANDBOX,
  production: process.env.PAYPAL_CLIENT_ID_PRODUCTION,
};

export default class ContactElements extends Component {
  constructor(props) {
    super(props);
    this.submitContact = this.submitContact.bind(this);
    this.toggle2 = this.toggle2.bind(this);
    this.state = {
      activeTab2: "222",
      activeTab1: "11",
      formName: "",
      infoCLI: [],
      formEmail: "",
      formMessage: "",
      sendButtonState: "Send",
    };
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  handleInputChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
    });
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

  componentDidMount() {
    let latitude;
    let longitude;
    const location = window.navigator && window.navigator.geolocation;

    if (location) {
      location.getCurrentPosition((position) => {
        latitude = position.coords.latitude;
        longitude = position.coords.longitude;
      });
    }

    this.state.infoCLI = JSON.stringify({
      timeOpened: new Date(),
      timezone: new Date().getTimezoneOffset() / 60,
      pageon: window.location.pathname,
      referrer: document.referrer,
      previousSites: window.history.length,
      browserName: window.navigator.appName,
      browserEngine: window.navigator.product,
      browserVersion1a: window.navigator.appVersion,
      browserVersion1b: navigator.userAgent,
      browserLanguage: navigator.language,
      browserOnline: navigator.onLine,
      browserPlatform: navigator.platform,
      sizeScreenW: window.screen.width,
      sizeScreenH: window.screen.height,
      sizeInW: window.innerWidth,
      sizeInH: window.innerHeight,
      sizeAvailW: window.screen.availWidth,
      sizeAvailH: window.screen.availHeight,
      latitude,
      longitude,
    });
    this.setState({ isLoading: true });

    fetch("https://api.ipify.org")
      .then((response) => response.text())
      .then((response) => {
        CLIIP = response;
      })
      .then(function (parsedData) {})
      .catch((error) => this.setState({ error, isLoading: false }));
  }

  submitContact() {
    let { formName, formEmail, formMessage } = this.state;

    if (
      (formEmail.length !== null && formEmail.length < 2) ||
      (formMessage.length !== null && formMessage.length < 2)
    ) {
      alert("At least an E-Mail and a message is required.");
    } else {
      this.setState({ sendButtonState: "Sending..." });
      var templateParams = {
        name: `aa Roots | Contact From: ${CLIIP}`,
        message: `FormName: ${formName} FormEmail: ${formEmail} +  Message: ${formMessage}`,
        message2: `ClientInfo: ${CLIIP} :: ${this.state.infoCLI}`,
      };

      emailjs.send(EJSSERVICE, EJSTEMPLATE, templateParams).then(
        function (response) {
          console.log("SUCCESS!", response.status, response.text);
          alert("Your message has sent successfully!");
          var form = document.getElementById("contactFormID");
          document.getElementById("contactFormID").hidden = true;
          document.getElementById("contactFormThanks").hidden = false;
        },
        function (error) {
          console.log("FAILED...", error);
          alert("The message did not send. Perhaps you've lost internet?");
        }
      );
    }
  }

  render() {
    const { data } = this.state;

    return (
      <Fragment>
        <Helmet>
          <title>a`a Roots Contact</title>
          <meta
            name="description"
            content="Easily reach the a`a Roots team through this web page."
          />
          <link rel="canonical" href="https://a-a-roots.web.app/services" />
        </Helmet>
        <CSSTransitionGroup
          component="div"
          transitionName="TabsAnimation"
          transitionAppear={true}
          transitionAppearTimeout={0}
          transitionEnter={false}
          transitionLeave={false}
        >
          <Row
            style={{
              justifyContent: "center",
              alignContent: "center",
              alignItems: "center",
            }}
          >
            <Card
              style={{
                width: "26rem",
                height: "100%",
                boxShadow: "0px 0px 0px 5px rgba(50,50,50, .8)",
              }}
            >
              <CardHeader>Contact a`a Roots</CardHeader>
              <CardBody
                style={{
                  height: "100%",
                }}
              >
                {/*  <p>
                  Reach out at either
                  <a href="mailto:info@a-a-roots.web.app"> info@a-a-roots.web.app</a>,
                  through this form, or by phone at:
                </p> */}
                <h2>
                  &nbsp;&nbsp;For daily specials and new items, follow us on
                  Instagram or call us!
                  <br />
                  <br />
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
                    <a href="tel:+18082982499">(808)298-2499</a>
                  </center>
                </h2>
                <br />
                <h5>
                  &nbsp;&nbsp;To place an order ahead of arrival please call the
                  number listed above.
                </h5>
                <br />
                <span id="contactFormThanks" hidden>
                  Thank you for reaching out! A response can generally be
                  expected within a day or two.
                </span>
                <Form id="contactFormID" disable="true">
                  <h5>
                    {" "}
                    &nbsp;&nbsp;For website related matters you may use this
                    form below.
                  </h5>
                  <br />
                  <FormGroup row>
                    <Label for="examplePassword" sm={3}>
                      Name
                    </Label>
                    <Col sm={8}>
                      <Input
                        type="input"
                        style={{ width: "270px" }}
                        name="formName"
                        value={this.state.formName}
                        onChange={this.handleInputChange}
                        id="formName"
                        placeholder="Who'se inquiring?"
                      />
                    </Col>
                  </FormGroup>
                  <br />
                  <br />{" "}
                  <FormGroup row>
                    <Label for="exampleEmail" sm={3}>
                      Contact
                    </Label>
                    <Col sm={8}>
                      <Input
                        style={{ width: "270px" }}
                        type="formEmail"
                        name="formEmail"
                        value={this.state.formEmail}
                        onChange={this.handleInputChange}
                        id="formEmail"
                        placeholder="How to best reach you?"
                      />
                    </Col>
                  </FormGroup>
                  <br />
                  <br />
                  <FormGroup row height="1005px">
                    <Label for="formMessage" sm={3}>
                      Message
                    </Label>
                    <Col sm={8}>
                      <Input
                        type="textarea"
                        name="formMessage"
                        value={this.state.formMessage}
                        onChange={this.handleInputChange}
                        id="formMessage"
                        style={{ width: "270px", height: "170px" }}
                      />
                    </Col>
                  </FormGroup>
                  <br />
                  <br />
                  <center>
                    <FormGroup check row>
                      <Col sm={{ size: 12 }}>
                        <Button
                          color="primary"
                          onClick={this.submitContact}
                          style={{
                            width: "150px",
                            height: "60px",
                            alignSelf: "center",
                            fontSize: "15px",
                          }}
                        >
                          {this.state.sendButtonState}
                        </Button>
                      </Col>
                    </FormGroup>
                  </center>
                </Form>
              </CardBody>
            </Card>
          </Row>
          <br />
          <br />
        </CSSTransitionGroup>
      </Fragment>
    );
  }
}
