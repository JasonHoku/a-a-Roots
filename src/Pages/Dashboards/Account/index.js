import React, {
  Component,
  useContext,
  Fragment,
  useEffect,
  useState,
  useRef,
} from "react";
import CSSTransitionGroup from "react-transition-group/CSSTransitionGroup";

import { unregister } from "../../../serviceWorker";
import AppAuth from "../../../Layout/AppAuth/index.js";

import "firebase/auth";
import "firebase/storage";
import "firebase/firestore";
import {
  Row,
  Col,
  Card,
  CardBody,
  Form,
  FormGroup,
  Label,
  Container,
  CardTitle,
  Input,
  FormText,
  CardHeader,
  CardLink,
  CardImg,
  NavLink,
  Progress,
  CardFooter,
  ButtonGroup,
} from "reactstrap";
import firebase from "firebase/app";
import "firebase/auth";

import { useAuthState } from "react-firebase-hooks/auth";
import { useCollectionData } from "react-firebase-hooks/firestore";

import { toast } from "react-toastify";

var CLIIP;

function AccountPage() {
  const isInitialMount = useRef(true);

  const UserContext = React.createContext({});
  const user = useContext(UserContext);
  const UserProvider = UserContext.Provider;
  const UserConsumer = UserContext.Consumer;

  const [elementAuth, setelementAuth] = useState(null);
  const [loadStage, setloadStage] = useState("1");
  const [loadElements, setloadElements] = useState(null);
  const [loadedSnapshotData, setloadedSnapshotData] = useState("");
  const [loadedSnapshotDataIDs, setloadedSnapshotDataIDs] = useState("");
  const [loadedOnce, setloadedOnce] = useState(1);

  useEffect(() => {
    let concData = [];
    let concData2 = [];
    if (loadStage === "1") {
      setloadStage("2");
    }
    if (loadStage === "2") {
      if (loadedOnce === 1) {
        const firebaseConfig = {
          apiKey: process.env.REACT_APP_FIREBASE,
          authDomain: "a-a-roots.firebaseapp.com",
          projectId: "a-a-roots",
          storageBucket: "a-a-roots.appspot.com",
          messagingSenderId: "565878516937",
          appId: "1:565878516937:web:a818482f4819ecc1837118",
          measurementId: "G-CE28VLQR7Z",
        };

        if (!firebase.apps.length) {
          firebase.initializeApp(firebaseConfig);
        }

        const loadsnapshot = async () => {
          let concData = [];
          let concData2 = [];
          const snapshot = await firebase
            .firestore()
            .collection("version")
            .get();

          snapshot.forEach(async function (doc) {
            concData = doc.data();
          });
        };
        loadsnapshot().then(async () => {
          setloadedOnce(2);
          setloadStage("3");
        });
      }
      if (loadStage === "3") {
        setloadedOnce(1);
      }
    }
  });

  function toggle(tab) {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab,
      });
    }
  }
  function componentDidMount() {
    this.setState({ isLoading: true });

    fetch("https://api.ipify.org")
      .then((response) => response.text())
      .then((response) => {
        CLIIP = response;
      })
      .then(function (parsedData) {})
      .catch((error) => this.setState({ error, isLoading: false }));
  }

  return (
    <Fragment>
      <Card
        className="AccountBackground"
        style={{
          justifySelf: "center",
          textAlign: "center",
          marginLeft: "-10px",
          position: "relative",
          top: "-30px",
          borderRadius: "35px",
          background:
            "linear-gradient(0.25turn, #10306655, #FFFFFFDD,#FFFFFFDD,#FFFFFFDD,#FFFFFFDD,#FFFFFFDD,#FFFFFFDD,#FFFFFFDD,#FFFFFFDD,#FFFFFFDD, #10306655)",
        }}
      >
        <CardBody
          style={{
            backgroundColor: "transparent",
            paddingRight: "-55px",
            paddingLeft: "-55px",
            minHeight: "85vh",
          }}
        >
          <CardHeader
            style={{
              backgroundColor: "transparent",
              paddingRight: "-25px",
              position: "relative",
              border: "none",
              top: "18px",
            }}
          >
            <h2>A'a Roots Utilities</h2>
          </CardHeader>
          <AppAuth />
          <VersionCheck />
        </CardBody>
      </Card>
      <br /> <br />
    </Fragment>
  );
}

const auth = firebase.auth();
const firestore = firebase.firestore();

function showNotification() {
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
    navigator.serviceWorker.register("sw2.js");
    Notification.requestPermission(function (result) {
      if (result === "granted") {
        navigator.serviceWorker.ready.then(function (registration) {
          var options = {
            body:
              "A new version of this website is available, please reload after saving any work to load new website content.",
            icon: "logo.png",
            vibrate: [100, 50, 100],
            data: {
              dateOfArrival: Date.now(),
              primaryKey: 1,
            },
          };
          registration.showNotification("Site Update", options);
        });
      }
    });
  }
}

function showNotification2(e) {
  toast(
    "A new version of this website is available, please reload after saving any work to load new website content.",
    {
      position: "top-right",
      autoClose: false,
      containerId: 1,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      onClose: () => unregister,
      draggable: true,
    }
  );
}

function VersionCheck() {
  const dummy = useRef();
  const messagesRef = firestore.collection("version");
  const query = messagesRef.limit(25);

  const [messages] = useCollectionData(query);
  if (messages) {
    let concData = JSON.parse(JSON.stringify(messages[0])).version;
    if (!localStorage.getItem("appVersion")) {
      localStorage.setItem("appVersion", concData);
    } else if (localStorage.getItem("appVersion") != concData) {
      var isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
      if (isSafari) {
        // showNotification();
        // showNotification2();
      }
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
      var isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);

      if (!iOS && !isSafari) {
        if (caches) {
          caches.keys().then(function (names) {
            for (let name of names) caches.delete(name);
          });
          localStorage.setItem("appVersion", concData);
        }
      }
    }
  }
  return null;
}
export default AccountPage;
