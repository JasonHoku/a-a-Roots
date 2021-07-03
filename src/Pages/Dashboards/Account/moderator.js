import React, {
  Component,
  Fragment,
  useState,
  useEffect,
  useRef,
  lazy,
} from "react";

import ReactDOM from "react-dom";
import { ApolloClient, InMemoryCache, HttpLink } from "apollo-boost";
import { Query, ApolloProvider, Mutation } from "react-apollo";
import { gql, useQuery } from "@apollo/client";
import axios from "axios";

import UserQueryComponent from "./UserQueryComponent.js";
import { toInteger } from "lodash";
import ProductManagerComponent from "./ProductManagerComponent.js";
import ContentManagerComponent from "./ContentManagerComponent.js";
import EventManagerComponent from "./EventManagerComponent.js";

import EditMenuComponent from "./EditMenuComponent.js";
import SurveyManagerComponent from "./SurveyManagerComponent.js";

import VideoManager from "./VideoManager.js";
import IssueManager from "./IssueManager.js";
import NetworkManagerComponent from "./NetworkManagerComponent.js";

import classnames from "classnames";

import { toast } from "react-toastify";
import {
  FirebaseAppProvider,
  useFirestoreDocData,
  useFirestore,
  useFirebaseApp,
  useFirestoreCollectionData,
  useFirestoreCollection,
} from "reactfire";
import {
  Row,
  Col,
  Button,
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
  CardTitle,
  CardLink,
  CardImg,
  NavLink,
  TabContent,
  TabPane,
  Progress,
  CardFooter,
  ButtonGroup,
} from "reactstrap";
import AccountElements from "./account";
import ListingManagerComponent from "./ListingManager.js";

import firebase from "firebase/app";
import "firebase/auth";
import "firebase/storage";
import "firebase/firestore";

function ModeratorElements() {
  const firebaseConfig = {
    apiKey: process.env.REACT_APP_FIREBASE,
    authDomain: "a-a-roots.firebaseapp.com",
    projectId: "a-a-roots",
    storageBucket: "a-a-roots.appspot.com",
    messagingSenderId: "565878516937",
    appId: "1:565878516937:web:a818482f4819ecc1837118",
    measurementId: "G-CE28VLQR7Z",
  };
  const [message, setMessage] = useState("Hi there, how are you?");
  const [formName, setformName] = useState([]);
  const [formEmail, setformEmail] = useState([]);
  const [activeTab, setactiveTab] = useState("1");
  const [activeTab2, setactiveTab2] = useState("1");
  const [issuesMetric, setissuesMetric] = useState("");
  const [commentsMetric, setcommentsMetric] = useState("");
  const [chatMetric, setchatMetric] = useState("");
  const [SurveyMetric, setSurveyMetric] = useState("");

  const [userMetric, setuserMetric] = useState(
    parseInt(localStorage.getItem("users"))
  );
  const [newListingsMetric, setnewListingsMetric] = useState(
    parseInt(localStorage.getItem("ListingsToApprove")) || 0
  );

  const [loadStage, setloadStage] = useState("1");

  const isInitialMount = useRef(true);

  const auth = firebase.auth();

  function showNotification(e) {
    function iOS() {
      return (
        [
          "iPad Simulator",
          "iPhone Simulator",
          "iPod Simulator",
          "iPad",
          "iPhone",
          "iPod",
        ].includes(navigator.platform) ||
        // iPad on iOS 13 detection
        (navigator.userAgent.includes("Mac") && "ontouchend" in document)
      );
    }
    if (!iOS) {
      navigator.serviceWorker.register("sw.js");
      Notification.requestPermission(function (result) {
        if (result === "granted") {
          navigator.serviceWorker.ready.then(function (registration) {
            var options = {
              body: "A new user has joined A`A Roots",
              icon: "logo.png",
              vibrate: [100, 50, 100],
              data: {
                dateOfArrival: Date.now(),
                primaryKey: 1,
              },
            };
            registration.showNotification("New User", options);
          });
        }
      });
    }
  }

  function showNotification2(e) {
    toast("A new user has joined A`A Roots", {
      position: "top-right",
      autoClose: false,
      containerId: 1,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });
  }

  function GetCollectionLength(e) {
    const firebaseApp = useFirebaseApp();

    const collectionRef2 = firebaseApp.firestore().collection("Users");

    const items2 = useFirestoreCollectionData(collectionRef2);

    // easily check the loading status
    var status;
    if (status === "loading") {
      return "...";
    } else {
      if (items2.data) {
        if (parseInt(items2.data.length) > 0) {
          parseInt(items2.data.length);
          if (
            parseInt(items2.data.length) ===
            parseInt(localStorage.getItem("users"))
          ) {
            return items2.data.length;
          } else console.log("YYY");
          // showNotification(e);
          // showNotification2(e);
          localStorage.setItem("users", parseInt(items2.data.length));
          return items2.data.length;
        }
      }
    }
    return "...";
  }
  function GetDocData2(e) {
    // easily access the Firestore library
    const firebaseApp = useFirebaseApp();

    const docRef = useFirestore().collection("totalHits").doc("value");

    // subscribe to a document for realtime updates. just one line!
    const { status, data } = useFirestoreDocData(docRef);

    // easily check the loading status
    if (data) {
      return data.population;
    } else return "...";
  }

  function GetDocData3(e) {
    // easily access the Firestore library
    const firebaseApp = useFirebaseApp();

    const docRef = useFirestore().collection("totalClicks").doc("value");

    // subscribe to a document for realtime updates. just one line!
    const { status, data } = useFirestoreDocData(docRef);

    // easily check the loading status
    if (data) {
      return data.population;
    } else return "...";
  }

  function GetDocData(e) {
    // easily access the Firestore library
    const firebaseApp = useFirebaseApp();

    const docRef = useFirestore().collection("version").doc("0");

    // subscribe to a document for realtime updates. just one line!
    const { status, data } = useFirestoreDocData(docRef);

    // easily check the loading status
    if (data) {
      return data.version;
    } else return "...";
  }

  function loadProductsComponent(props) {
    if (activeTab === "Products") {
      return <ProductManagerComponent />;
    }
  }

  function loadEventsComponent(props) {
    if (activeTab === "Events") {
      return <EventManagerComponent />;
    }
  }

  function loadContentManagerComponent(props) {
    if (activeTab === "Content") {
      return <ContentManagerComponent />;
    }
  }

  function loadEditMenuComponent(props) {
    if (activeTab === "Comments") {
      return <EditMenuComponent />;
    }
  }

  function loadUserQueryComponent(props) {
    if (activeTab === "Users") {
      return <UserQueryComponent />;
    }
  }
  function loadAccountElementComponent() {
    if (activeTab === "2") {
      return <AccountElements />;
    }
  }

  function loadListingManagerComponent() {
    if (activeTab === "Listing Manager") {
      return <ListingManagerComponent />;
    }
  }

  function loadEventManagerComponent(props) {
    if (activeTab === "Events") {
      return <EventManagerComponent />;
    }
  }

  function loadIssueManagerComponent(props) {
    if (activeTab === "Issues") {
      return <IssueManager />;
    }
  }

  function loadNetworkManagerComponent(props) {
    if (activeTab === "Networks") {
      return <NetworkManagerComponent />;
    }
  }

  function loadSurveyManagerComponent(props) {
    if (activeTab === "Surveys") {
      return <SurveyManagerComponent />;
    }
  }

  function toggle(tab) {
    if (activeTab !== tab) {
      setactiveTab(tab);
    }
  }
  function valueCheck() {
    if (!localStorage.getItem("localData3")) {
      localStorage.setItem("localData3", 0);
    }
  }

  return (
    <Fragment>
      <Container
        className="ModeratorBackground"
        fluid
        style={{
          backgroundColor: "#FFFFFFDD",
          borderRadius: "55px",
        }}
      >
        <TabContent
          activeTab={activeTab}
          style={{
            backgroundColor: "transparent",
            opacity: 1,
            justifyContent: "center",
            paddingLeft: "-55px",
            paddingRight: "-55px",
            alignSelf: "center",
          }}
        >
          <h3 style={{ position: "relative", top: "15px" }}>
            Logged in as {auth.currentUser.displayName}
          </h3>
          <CardHeader
            style={{
              marginBottom: "-35px",
              justifyContent: "center",
              backgroundColor: "transparent",
              borderBottom: "none",
              alignSelf: "center",
              marginLeft: "-25px",
              marginRight: "-25px",
            }}
          >
            <Button
              size="sm"
              style={{ marginTop: "2px" }}
              outline
              color="alternate"
              className={
                "btn-pill btn-wide " + classnames({ active: activeTab === "1" })
              }
              onClick={() => {
                setTimeout(
                  document.getElementById("id002").scrollIntoView({
                    behavior: "smooth",
                    block: "start",
                    inline: "center",
                  }),
                  100
                );

                toggle("1");
              }}
            >
              Moderator Tools
            </Button>
            &nbsp;
            <Button
              outline
              style={{ marginTop: "2px" }}
              color="alternate"
              className={
                "btn-pill btn-wide " + classnames({ active: activeTab === "2" })
              }
              onClick={() => {
                setTimeout(
                  () =>
                    document.getElementById("id002").scrollIntoView({
                      behavior: "smooth",
                      block: "start",
                      inline: "center",
                    }),
                  100
                );

                toggle("2");
              }}
            >
              Regular User View
            </Button>
          </CardHeader>
          <br />
          <br />
          <Row style={{ justifyContent: "center" }}>
            <Card
              style={{
                boxShadow: "0px 0px 0px 5px rgba(50,50,50, .8)",
                alignContent: "center",
                height: "100%",
                marginTop: "-5px",
                marginBottom: "-10px",
                marginLeft: "25px",
                marginRight: "25px",
                alignItems: "center",
              }}
            >
              <CardTitle
                style={{
                  justifyContent: "center",
                  alignSelf: "center",
                  marginBottom: "-15px",
                }}
              >
                <h2>Main Website Tools:</h2>
              </CardTitle>
              <span
                style={{
                  marginLeft: "10px",
                  marginTop: "5px",
                  display: "block",
                }}
              >
                &nbsp;
                <button
                  style={{
                    backgroundColor: "#006666",
                    borderRadius: "16px",
                    height: "35px",
                    fontSize: "125%",
                    fontWeight: 750,
                    fontFamily: "monospace",
                    marginTop: "5px",
                  }}
                  onClick={() => {
                    setTimeout(
                      () =>
                        document.getElementById("id002").scrollIntoView({
                          behavior: "smooth",
                          block: "start",
                          inline: "center",
                        }),
                      100
                    );

                    toggle("Content");
                  }}
                >
                  {" "}
                  SiteContent{" "}
                </button>
                &nbsp;
                <button
                  style={{
                    backgroundColor: "#0033AA",
                    borderRadius: "16px",
                    height: "35px",
                    fontSize: "125%",
                    fontWeight: 750,
                    fontFamily: "monospace",
                    marginTop: "5px",
                  }}
                  onClick={() => {
                    setTimeout(
                      () =>
                        document.getElementById("id002").scrollIntoView({
                          behavior: "smooth",
                          block: "start",
                          inline: "center",
                        }),
                      100
                    );

                    toggle("Users");
                  }}
                >
                  Users
                </button>
                &nbsp;
                <button
                  style={{
                    backgroundColor: "#0000CC",
                    borderRadius: "16px",
                    height: "35px",
                    fontSize: "125%",
                    fontWeight: 750,
                    fontFamily: "monospace",
                    marginTop: "5px",
                  }}
                  onClick={() => {
                    setTimeout(
                      () =>
                        document.getElementById("id002").scrollIntoView({
                          behavior: "smooth",
                          block: "start",
                          inline: "center",
                        }),
                      100
                    );

                    toggle("Comments");
                  }}
                >
                  Edit Menu
                </button>
                &nbsp;
                <button
                  style={{
                    marginTop: "10px",
                    backgroundColor: "#000066",
                    borderRadius: "16px",
                    height: "35px",
                    fontSize: "125%",
                    fontWeight: 750,
                    fontFamily: "monospace",
                    marginTop: "5px",
                  }}
                  onClick={() => {
                    toggle("Notes");
                  }}
                >
                  Active Orders
                </button>
                {/*
                  &nbsp;
                  <button
                    style={{
                      marginTop: "10px",
                      backgroundColor: "#3300CC",
                      borderRadius: "16px",
                      height: "35px",
                      fontSize: "125%",
                      fontWeight: 750,
                      fontFamily: "monospace",
                      marginTop: "5px",
                    }}
                    onClick={() => {
                      setTimeout(
                        () =>
                          document.getElementById("id002").scrollIntoView({
                            behavior: "smooth",
                            block: "start",
                            inline: "center",
                          }),
                        100
                      );

                      toggle("Products");
                    }}
                  >
                    {" "}
                    Commerce{" "}
                  </button>*/}
                &nbsp;
                {/*
                  <button
                    style={{
                      marginTop: "10px",
                      backgroundColor: "#6600CC",
                      borderRadius: "16px",
                      height: "35px",
                      fontSize: "125%",
                      fontWeight: 750,
                      fontFamily: "monospace",
                      marginTop: "5px",
                    }}
                    onClick={() => {
                      setTimeout(
                        () =>
                          document.getElementById("id002").scrollIntoView({
                            behavior: "smooth",
                            block: "start",
                            inline: "center",
                          }),
                        100
                      );

                      toggle("Video");
                    }}
                  >
                    {" "}
                    Video Manager{" "}
                  </button>
                  &nbsp;*/}
                &nbsp;
                {/*     &nbsp;
                <button
                  style={{
                    backgroundColor: "#BB0099",
                    borderRadius: "16px",
                    height: "35px",
                    fontSize: "125%",
                    fontWeight: 750,
                    fontFamily: "monospace",
                    marginTop: "5px",
                  }}
                  onClick={() => {
                    setTimeout(
                      () =>
                        document.getElementById("id002").scrollIntoView({
                          behavior: "smooth",
                          block: "start",
                          inline: "center",
                        }),
                      100
                    );

                    toggle("Surveys");
                  }}
                >
                  Surveys
                </button>
                &nbsp;
                <button
                  style={{
                    backgroundColor: "#BB0033",
                    borderRadius: "16px",
                    height: "35px",
                    fontSize: "125%",
                    fontWeight: 750,
                    fontFamily: "monospace",
                    marginTop: "5px",
                  }}
                  onClick={() => {
                    setTimeout(
                      () =>
                        document.getElementById("id002").scrollIntoView({
                          behavior: "smooth",
                          block: "start",
                          inline: "center",
                        }),
                      100
                    );

                    toggle("Issue");
                  }}
                >
                  {" "}
                  Issues{" "}
                </button>*/}
                <br />
                <br />
              </span>
            </Card>
          </Row>
          <Row
            style={{
              alignContent: "center",
              height: "100%",
              marginTop: "10px",
              textAlign: "center",
              justifyContent: "center",
              alignSelf: "center",
              alignItems: "center",
              marginBottom: "25px",
            }}
          >
            <Card
              style={{
                boxShadow: "0px 0px 0px 5px rgba(50,50,50, .8)",
                alignContent: "center",
                height: "100%",
                alignItems: "center",
                justifyContent: "center",
                alignSelf: "center",
                marginBottom: "25px",
                position: "relative",
                top: "7px",
              }}
            >
              <CardTitle
                style={{
                  justifyContent: "center",
                  alignSelf: "center",
                }}
              >
                <h3>Highlight Metrics:</h3>
              </CardTitle>
              <h5>
                <FirebaseAppProvider firebaseConfig={firebaseConfig}>
                  <Row
                    style={{
                      boxShadow: "0px 0px 0px 2px rgba(50,50,50, .9)",
                      marginBottom: "2px",
                      paddingBottom: "2px",
                    }}
                  >
                    <Col style={{ width: "100%" }}>Clicks: </Col>
                    <Col style={{ textAlign: "right" }}>
                      <GetDocData3 />
                    </Col>
                  </Row>{" "}
                  <Row
                    style={{
                      boxShadow: "0px 0px 0px 2px rgba(50,50,50, .9)",
                      marginBottom: "2px",
                      paddingBottom: "2px",
                    }}
                  >
                    <Col> PageLoads: </Col>
                    <Col style={{ textAlign: "right" }}>
                      <GetDocData2 />
                    </Col>
                  </Row>{" "}
                  <Row
                    style={{
                      boxShadow: "0px 0px 0px 2px rgba(50,50,50, .9)",
                      marginBottom: "2px",
                      paddingBottom: "2px",
                    }}
                  >
                    <Col>Users: </Col>
                    <Col style={{ textAlign: "right" }}>
                      <GetCollectionLength />
                      <span id="id002"></span>
                    </Col>
                  </Row>{" "}
                  <Row
                    style={{
                      boxShadow: "0px 0px 0px 2px rgba(50,50,50, .9)",
                      marginBottom: "2px",
                      paddingBottom: "2px",
                    }}
                  >
                    <Col>SiteVersion: </Col>
                    <Col style={{ textAlign: "right" }}>
                      <GetDocData />
                    </Col>
                  </Row>
                </FirebaseAppProvider>{" "}
              </h5>
            </Card>
          </Row>
          <TabPane tabId="2">
            <Row style={{ justifyContent: "center" }}>
              {" "}
              <Card
                style={{
                  width: "100%",
                  backgroundColor: "transparent",
                  alignContent: "left",
                  borderRadius: "50px",
                  alignItems: "left",
                  textAlign: "left",
                }}
              >
                <h4 style={{ width: "100%", textAlign: "left" }}>
                  <b>&nbsp; Registered User View:</b>
                </h4>
                {loadAccountElementComponent()}
                <br />
              </Card>
            </Row>
          </TabPane>{" "}
          <TabPane tabId="3">
            <Row style={{ justifyContent: "center" }}>
              {" "}
              <Card
                style={{
                  width: "26rem",
                  boxShadow: "0px 0px 0px 5px rgba(50,50,50, .8)",
                  alignContent: "center",
                  alignItems: "center",
                }}
              ></Card>
            </Row>
          </TabPane>
          <TabPane tabId="Comments">
            <Row style={{ justifyContent: "center" }}>
              {" "}
              <Card
                style={{
                  width: "26rem",
                  boxShadow: "0px 0px 0px 5px rgba(50,50,50, .8)",
                  alignContent: "center",
                  alignItems: "center",
                }}
              >
                {loadEditMenuComponent()}
              </Card>
            </Row>
          </TabPane>
          <TabPane tabId="Events">
            <Row style={{ justifyContent: "center" }}>
              {" "}
              <Card
                style={{
                  width: "26rem",
                  boxShadow: "0px 0px 0px 5px rgba(50,50,50, .8)",
                  alignContent: "center",
                  alignItems: "center",
                }}
              >
                {loadEventManagerComponent()}
              </Card>
            </Row>
          </TabPane>
          <TabPane tabId="Products">
            <Row style={{ justifyContent: "center" }}>
              {" "}
              <Card
                style={{
                  width: "26rem",
                  boxShadow: "0px 0px 0px 5px rgba(50,50,50, .8)",
                  alignContent: "center",
                  alignItems: "center",
                }}
              >
                {loadProductsComponent()}
              </Card>
            </Row>
          </TabPane>
          <TabPane tabId="Content">
            {loadContentManagerComponent()}
            <br />
          </TabPane>
          <TabPane tabId="Surveys">
            <Row style={{ justifyContent: "center" }}>
              {" "}
              <Card
                style={{
                  width: "26rem",
                  boxShadow: "0px 0px 0px 5px rgba(50,50,50, .8)",
                  alignContent: "center",
                  alignItems: "center",
                }}
              >
                {loadSurveyManagerComponent()}
              </Card>
            </Row>
          </TabPane>
          <TabPane tabId="Video">
            <Row style={{ justifyContent: "center" }}>
              {" "}
              <Card
                style={{
                  width: "26rem",
                  boxShadow: "0px 0px 0px 5px rgba(50,50,50, .8)",
                  alignContent: "center",
                  alignItems: "center",
                }}
              ></Card>
            </Row>
          </TabPane>
          <TabPane tabId="Users">{loadUserQueryComponent()}</TabPane>
          <TabPane tabId="Issue">{loadIssueManagerComponent()}</TabPane>
          <TabPane tabId="Networks">{loadNetworkManagerComponent()}</TabPane>
          <TabPane tabId="Listing Manager">
            {loadListingManagerComponent()}
            <br />
          </TabPane>
        </TabContent>
        <br />
      </Container>
    </Fragment>
  );
}

export default ModeratorElements;
