import React, { useCallback, useContext, useEffect, useState } from "react";

import firebase from "firebase/app";
import "firebase/auth";

import { Row } from "reactstrap";

import { Card, CardBody, CardHeader } from "reactstrap";
import AccountElements from "../../Pages/Dashboards/Account/account";
import ModeratorElements from "../../Pages/Dashboards/Account/moderator";

import * as firebaseui from "firebaseui";

const defaultUser = { loggedIn: false, email: "" };
const UserContext = React.createContext({});
const UserProvider = UserContext.Provider;
const UserConsumer = UserContext.Consumer;

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

function onAuthStateChange(callback) {
  return firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      callback({ loggedIn: true, email: user.email, uid: user.uid });
    } else {
      callback({ loggedIn: false });
    }
  });
}
function login(username, password) {
  return new Promise((resolve, reject) => {
    firebase
      .auth()
      .signInWithEmailAndPassword(username, password)
      .then(() => resolve())
      .catch((error) => reject(error));
  });
}
function logout() {
  firebase.auth().signOut();
}
function LoginView({ onClick, error }) {
  const [loadElements, setloadElements] = useState(null);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  return (
    <div>
      <input
        onChange={(event) => {
          setUsername(event.target.value);
        }}
      />
      <input
        type="password"
        onChange={(event) => {
          setPassword(event.target.value);
        }}
      />
      <button
        onClick={() => {
          onClick(username, password);
        }}
      >
        Login
      </button>
      <span>{error}</span>
    </div>
  );
}
function LogoutView({ onClick }) {
  const [loadElements, setloadElements] = useState(null);
  const user = useContext(UserContext);
  return <div></div>;
}
function AppAuth() {
  const [user, setUser] = useState({ loggedIn: false });
  const [error, setError] = useState("");
  const [elementAuth, setelementAuth] = useState(null);
  const [loadStage, setloadStage] = useState("1");
  const [loadElements, setloadElements] = useState(null);

  var uiConfig = {
    callbacks: {
      signInSuccessWithAuthResult: function (authResult) {
        firebase
          .firestore()
          .collection("Users")
          .doc(authResult.user.uid)
          .set({
            username: String(authResult.user.displayName),
            uuid: String(authResult.user.uid),
            email: String(authResult.user.email),
          });

        localStorage.setItem("username", authResult.user.displayName);
        localStorage.setItem("email", authResult.user.email);

        return false;
      },
    },
    // Will use popup for IDP Providers sign-in flow instead of the default, redirect.
    signInFlow: "popup",
    signInOptions: [
      // Leave the lines as is for the providers you want to offer your users.
      firebase.auth.GoogleAuthProvider.PROVIDER_ID,
      firebase.auth.EmailAuthProvider.PROVIDER_ID,
    ],
    tosUrl: "/termsofservice",
    privacyPolicyUrl: "/privacy",
  };
  function decideUserLoad() {
    if (user.loggedIn) {
      if (
        user.uid === "U3lNgYx2IWbqWmoQNx6QYubTaHm1" ||
        user.uid === "U3lNgYx2IWbqWmoQNx6QYubTaHm1"
      ) {
        return (
          <span>
            <button
              className="zoom"
              style={{
                width: "90px",
                backgroundColor: "#AA3322",
                height: "30px",
                alignSelf: "right",
                float: "right",
                display: "flex",
                position: "absolute",
                top: "25px",
                right: "25px",
                borderRadius: "10px",
                fontSize: "15px",
              }}
              onClick={() => {
                firebase.auth().signOut();
                localStorage.setItem("username", null);
                localStorage.setItem("jwt", null);
                window.location.reload();
              }}
            >
              <span
                style={{
                  display: "inline-block",
                  paddingRight: "-5px",
                  paddingLeft: "-5px",
                }}
              >
                Sign&nbsp;Out
              </span>
            </button>
            <ModeratorElements />
          </span>
        );
      } else if (user.loggedIn) {
        return (
          <span>
            <button
              className="zoom"
              style={{
                width: "90px",
                backgroundColor: "#AA3322",
                height: "30px",
                position: "absolute",
                top: "20px",
                right: "15px",
                borderRadius: "10px",
                fontSize: "15px",
                zIndex: 9999,
              }}
              onClick={() => {
                firebase.auth().signOut();
                localStorage.setItem("username", null);
                localStorage.setItem("jwt", null);
                window.location.reload();
              }}
            >
              <span
                style={{
                  display: "inline-block",
                  paddingRight: "-5px",
                  paddingLeft: "-5px",
                }}
              >
                Sign&nbsp;Out
              </span>
            </button>
            <AccountElements />
          </span>
        );
      }
    }
  }

  useEffect(() => {
    if (firebaseui.auth.AuthUI.getInstance()) {
      const ui = firebaseui.auth.AuthUI.getInstance();
      ui.start("#firebaseui-auth-container", uiConfig);
    } else {
      const ui = new firebaseui.auth.AuthUI(firebase.auth());
      ui.start("#firebaseui-auth-container", uiConfig);
    }
    const unsubscribe = onAuthStateChange(setUser);
    return () => {
      unsubscribe();
    };
  }, []);
  const requestLogin = useCallback((username, password) => {
    login(username, password).catch((error) => setError(error.code));
  });
  const requestLogout = useCallback(() => {
    logout();
  }, []);

  if (!user.loggedIn) {
    return (
      <Card
        style={{
          backgroundColor: "#CCCCCCC",
          boxShadow: "0px 0px 0px 5px rgba(50,50,50, .9)",
          borderRadius: "10px",
          opacity: 100,
          justifyContent: "center",
          marginLeft: "-5px",
          marginRight: "-5px",
          color: "black",
          background:
            "linear-gradient(0.25turn, #103066FF, #FFFFFFDD,#FFFFFFDD,#FFFFFFDD,#FFFFFFDD,#FFFFFFDD,#FFFFFFDD,#FFFFFFDD,#FFFFFFDD,#FFFFFFDD, #103066FF)",
        }}
      >
        <br />
        <CardBody
          style={{
            backgroundColor: "#303030",
            borderRadius: "10px",
            color: "black",
            background: "transparent",
            minHeight: "70vh",
          }}
        >
          <div
            style={{
              paddingLeft: "15px",
              paddingRight: "25px",
            }}
          >
            <h2
              style={{
                color: "black",
                textAlign: "center",
              }}
            >
              <b> An account with a`a Roots is required to:</b>
            </h2>
            <br />
            <Row
              style={{
                justifyContent: "center",
                width: "100%",
                alignItems: "center",
                justifyContent: "center",
                alignContent: "center",
                alignItems: "center",
              }}
            >
              <div
                style={{
                  color: "black",
                  maxWidth: "850px",
                  position: "relative",
                }}
              >
                <h4
                  style={{
                    color: "black",
                    textAlign: "left",
                    maxWidth: "850px",
                    position: "relative",
                  }}
                >
                  <br />
                  <li>Add &amp; Manage Listings</li> <br />
                  <li>Subscribe to Updates</li>
                  <br />
                  <li>Get Help Creating Your Listing</li>
                  <br />
                  <li>Chat Amongst the Community</li> <br />
                </h4>
              </div>
              <br />
              <div style={{ width: "100%", textAlign: "center" }}></div>
              <div id="firebaseui-auth-container">{decideUserLoad()}</div>{" "}
              <br /> <br /> <br />
            </Row>
          </div>
        </CardBody>
      </Card>
    );
  } else {
    return (
      <UserProvider value={user}>
        <div id="firebaseui-auth-container">
          <LogoutView onClick={requestLogout} />
          {decideUserLoad()}
        </div>
      </UserProvider>
    );
  }
}
export default AppAuth;
