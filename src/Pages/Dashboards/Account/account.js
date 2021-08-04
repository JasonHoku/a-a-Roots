import React, { Component, Fragment, useState, useEffect, useRef } from "react";

import PayPalButton from "./PayPalExpress";

import { toInteger } from "lodash";

import classnames from "classnames";
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

import firebase from "firebase/app";
import "firebase/auth";
import "firebase/storage";
import "firebase/firestore";

var firebaseConfig = process.env.REACT_APP_FIREBASE;

function AccountElements() {
  const [activeTab, setactiveTab] = useState("1");
  const [formTitle, setformTitle] = useState("");
  const [formName, setformName] = useState("");
  const [formCategory, setformCategory] = useState("");
  const [QRCodeState, setQRCodeState] = useState(
    `http://aarootshi.com/${String(new Date())}`
  );
  const [formLoc, setformLoc] = useState("");
  const [finListButtonDisable, setfinListButtonDisable] = useState(true);
  const [formScoreReason, setformScoreReason] = useState("");
  const [loadedImgURL, setloadedImgURL] = useState("");
  const [loadedLocationData, setloadedLocationData] = useState("");
  const [loadedDescription, setloadedDescription] = useState("");
  const [editedDescription, seteditedDescription] = useState("");
  const [gotDownloadURL, setgotDownloadURL] = useState("");
  const [formGMapCoords, setformGMapCoords] = useState("");
  const [loadedEzID, setloadedEzID] = useState("");
  const [hasLoaded, sethasLoaded] = useState("1");
  const [imgUpped, setimgUpped] = useState("");
  const [readyPaymentCost, setreadyPaymentCost] = useState("20");
  const [readyPaymentItems, setreadyPaymentItems] = useState("No Item In Cart");
  const [formPublicType, setformPublicType] = useState("");
  const [sendCommentButtonText, setsendCommentButtonText] = useState(
    "Send Message"
  );

  const [formDesc, setformDesc] = useState("");
  const [intervalId, setintervalId] = useState("");
  const [finListButton, setfinListButton] = useState("Fill Form Entirely");
  const [finListButtonStatus, setfinListButtonStatus] = useState(
    "Form Not Filled Entirely"
  );

  const [seconds, setSeconds] = useState(0);
  const isInitialMount = useRef(true);

  useEffect(() => {
    const interval = setInterval(() => {
      console.log(interval);
      if (isInitialMount.current) {
      } else {
        isInitialMount.current = false;
        if (hasLoaded === "2") {
          loadSubmitUserListing();
          sethasLoaded("3");
        }
        if (hasLoaded === "3") {
          sethasLoaded("4");
        }
      }
    }, 1000);

    return () => clearInterval(interval);
  });
  function loadSubmitUserListing() {
    console.log("TRigg");
    if (hasLoaded === "1") {
    }
  }

  function onEditorChange(evt) {
    seteditedDescription(evt.editor.getData());
  }
  function toggle(tab) {
    if (activeTab !== tab) {
      setactiveTab(tab);
    }
  }

  var React = require("react");
  var QRCode = require("qrcode.react");
  function loadPayPalButton() {
    if (localStorage.getItem("localData2") === null) {
      localStorage.setItem("localData2", "0");
    }

    if (true) {
      localStorage.setItem(
        "ProductInfo",
        localStorage.getItem("localData2") +
          "X" +
          localStorage.getItem("username")
      );
      return (
        <span>
          <PayPalButton
            valueCheck={valueCheck()}
            cart={localStorage
              .getItem("localData2")
              .toString()
              .split("\n")
              .map((str) => (
                <p key={str}>{str}</p>
              ))}
            total={
              toInteger(localStorage.getItem("localData4")) +
              toInteger(localStorage.getItem("localData7"))
            }
            cartItems={localStorage
              .getItem("localData2")
              .toString()
              .split("\n")
              .map((str) => (
                <p key={str}>{str}</p>
              ))}
            removeProduct={handleRemoveProduct}
            style={{ width: "15rem" }}
          />
          {localStorage
            .getItem("localData2")
            .toString()
            .split("\n")
            .map((str) => (
              <p key={str}>{str}</p>
            ))}
        </span>
      );
    }
  }

  function handleImageUploadState() {
    if (gotDownloadURL === "Upload An Image To Embed") {
      return (
        <div>
          {gotDownloadURL}
          <br />
        </div>
      );
    } else {
      // User Has URL
      return (
        <div style={{ borderRadius: "25px", textAlign: "center" }}>
          {gotDownloadURL}
          <br />
          <button
            style={{ borderRadius: "25px", textAlign: "center" }}
            onClick={() => {
              formResetter();
              localStorage.setItem("gotDownloadURL", "Upload Image To Embed");
            }}
          >
            Reset Image Form
          </button>
        </div>
      );
    }
  }
  function loadPayPalButton() {
    if (true) {
      localStorage.setItem(
        "ProductInfo",
        readyPaymentItems + "X" + localStorage.getItem("username")
      );
      return (
        <span>
          <center> ${readyPaymentCost}</center>
          <PayPalButton
            valueCheck={valueCheck()}
            cart={readyPaymentCost
              .toString()
              .split("\n")
              .map((str) => (
                <p key={str}>{str}</p>
              ))}
            total={toInteger(readyPaymentCost)}
            cartItems={readyPaymentItems
              .toString()
              .split("\n")
              .map((str) => (
                <p key={str}>{str}</p>
              ))}
            removeProduct={handleRemoveProduct}
            style={{ width: "15rem" }}
          />
          {readyPaymentItems
            .toString()
            .split("\n")
            .map((str) => (
              <p key={str}>{str}</p>
            ))}
        </span>
      );
    }
  }
  function formResetter() {
    try {
      document.forms[1].reset();
      document.forms[2].reset();
      document.forms[3].reset();
      document.forms[4].reset();
      document.forms[5].reset();
      setgotDownloadURL(localStorage.getItem("gotDownloadURL"));
    } catch (error) {}
  }

  function valueCheck() {
    if (!localStorage.getItem("localData3")) {
      localStorage.setItem("localData3", 0);
    }
  }
  function handleRemoveProduct(id, e) {
    let cart = this.state.cart;
    let index = cart.findIndex((x) => x.id == id);
    cart.splice(index, 1);
    this.setState({
      cart: cart,
    });
    this.sumTotalItems(this.state.cart);
    this.sumTotalAmount(this.state.cart);
    e.preventDefault();
  }

  //Reset Quantity
  function updateQuantity(qty) {
    console.log("quantity added...");
    this.setState({
      quantity: qty,
    });
  }
  function checkFormStates() {
    setgotDownloadURL(localStorage.getItem("gotDownloadURL"));
    handleImageUploadState();
    setformGMapCoords(localStorage.getItem("LocationDataCoords"));
    try {
      if (String(formTitle).length > 1) {
        console.log("ZZZ");
        if (String(localStorage.getItem(`username`)).length > 3) {
          if (String(formLoc.length) > 3) {
            if (String(editedDescription.length) > 2) {
              if (String(formCategory).length > 1) {
                if (String(formPublicType) !== "") {
                  if (String(formGMapCoords).length > 3) {
                    document.getElementById("finListButton").disabled = false;
                    document.getElementById(
                      "finListButton"
                    ).style.backgroundColor = "blue";

                    setfinListButton("Send Listing");
                    setfinListButtonStatus("Ready To Publish");
                    setfinListButtonDisable(false);
                  }
                }
              }
            }
          }
        }
      } else {
        document.getElementById("finListButton").disabled = true;
      }
    } catch (e) {}
  }

  function handleInputChange(event) {
    setformName(event.target.value);
  }
  function handleInputChange(event) {
    setformName(event.target.value);
  }
  function handleInputChange2(event) {
    setformDesc(event.target.value);
  }

  function toggle(tab) {
    if (activeTab !== tab) {
      setactiveTab(tab);
    }
  }

  const auth = firebase.auth();
  return (
    <Fragment>
      <TabContent
        activeTab={activeTab}
        style={{
          backgroundColor: "transparent",
          opacity: 0.9,
          justifyContent: "center",
          alignSelf: "center",
          width: "100%",
        }}
      >
        <CardHeader
          className="ponoTitle"
          style={{
            backgroundColor: "transparent",
            justifyContent: "center",
            alignSelf: "center",
            width: "100%",

            opacity: 100,
          }}
        >
          <Button
            size="sm"
            fill="true"
            color="alternate"
            className={
              "btn-pill btn-wide " + classnames({ active: activeTab === "1" })
            }
            onClick={() => {
              toggle("1");
            }}
          >
            Welcome
          </Button>
          &nbsp;
          <Button
            size="sm"
            fill={true}
            color="alternate"
            className={
              "btn-pill btn-wide " + classnames({ active: activeTab === "3" })
            }
            onClick={() => {
              toggle("3");
            }}
          >
            Your Account
          </Button>
        </CardHeader>
        <TabPane tabId="1">
          <Card
            style={{
              boxShadow: "0px 0px 0px 5px rgba(50,50,50, .8)",
            }}
          >
            {loadSubmitUserListing()}
            <CardBody
              style={{
                backgroundColor: "transparent",
              }}
            >
              <h3>Online Ordering Coming Soon.</h3> <br />
              <br /> {loadPayPalButton()}
              <div style={{ width: "100%%", height: "100%" }}>
                {" "}
                <QRCode
                  style={{ width: "100%", height: "100%" }}
                  onClick={() => {
                    setQRCodeState(
                      `http://aarootshi.com/${String(new Date())}`
                    );
                  }}
                  value={QRCodeState}
                />
              </div>
            </CardBody>
          </Card>
        </TabPane>
        <TabPane tabId="3">
          <Row>
            <Card
              style={{
                width: "95%",
                maxWidth: "750px",
                backgroundColor: "#CCCCCCC",
                borderRadius: "25px",
                boxShadow: "0px 0px 0px 3px rgba(50,50,50, .8)",
              }}
            >
              <CardBody>
                <h3> Account Information:</h3>
                <h5>
                  <div
                    style={{
                      textAlign: "center",
                      justifyContent: "center",
                      alignItems: "center",
                      textAlign: "left",
                      position: "relative",
                      float: "center",
                      display: "center",
                    }}
                  >
                    <div
                      style={{
                        width: "275px",
                        textAlign: "left",
                        position: "relative",
                        float: "center",
                        margin: "auto",
                        display: "center",
                      }}
                    >
                      <br />
                      <br />
                      <b>Username:</b> {auth.currentUser.displayName} <br />
                      <br />
                      <b> E-Mail:</b> {auth.currentUser.email}
                      <br />
                      <br />
                      <b>Status:</b> Regular User
                      <br />
                      <br />
                      <br />
                    </div>
                  </div>
                  <br />
                </h5>
              </CardBody>
            </Card>
          </Row>
        </TabPane>
      </TabContent>
    </Fragment>
  );
}
export default AccountElements;
