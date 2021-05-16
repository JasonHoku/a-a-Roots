import React, { useState } from "react";
import { Button } from "reactstrap";
import firebase from "firebase/app";
import "firebase/auth";

const backendUrl = process.env.REACT_APP_BACKEND_URL;

const providersNames = ["google"];

const Loginbutton = (props) => (
  <div
    className="app-header-right"
    style={{
      alignContent: "center",
    }}
  >
    <a href={`/account`}>
      <Button
        className="btn-icon-horizontal btn-transition app-header-right"
        color="light"
      >
        <span style={{ fontSize: "22px", textAlign: "center" }}>Account</span>
      </Button>
    </a>
  </div>
);

const Logoutbutton = (props) => (
  <Button
    style={{
      alignContent: "center",
    }}
    onClick={props.onClick}
  >
    Logout
  </Button>
);

const LoginAct = (props) => {
  const [isLogged, setIsLogged] = useState(!!localStorage.getItem("jwt"));

  const logout = (e) => {
    e.preventDefault();
    localStorage.removeItem("jwt");
    localStorage.removeItem("username");
    setIsLogged(false);
    window.location.reload();
  };

  let buttons;

  buttons = <Loginbutton />;

  let text;

  return (
    <div className="app-header-right">
      {text}
      {buttons}
    </div>
  );
};

export default LoginAct;
