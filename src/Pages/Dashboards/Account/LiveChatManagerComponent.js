import React, { Component, Fragment, useState, useEffect, useRef } from "react";

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
} from "reactstrap";

import firebase from "firebase/app";

import "firebase/auth";
import "firebase/storage";
import "firebase/firestore";

import { useAuthState } from "react-firebase-hooks/auth";
import { useCollectionData } from "react-firebase-hooks/firestore";

import "./chat.css";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE,
  authDomain: "a-a-roots.firebaseapp.com",
  projectId: "a-a-roots",
  storageBucket: "a-a-roots.appspot.com",
  messagingSenderId: "565878516937",
  appId: "1:565878516937:web:a818482f4819ecc1837118",
  measurementId: "G-CE28VLQR7Z"
};
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}
function LiveChatManagerComponent() {
  const [url, setURL] = useState("");
  const [file, setFile] = useState(null);
  const [user] = useAuthState(auth);

  return (
    <Fragment>
      <Card>
        <CardBody
          style={{
            justifyContent: "center",
            justifyItems: "center",
            textAlign: "center",
            marginLeft: "-10px",
            marginRight: "-10px",
          }}
        >
          <h4 style={{ width: "100%", textAlign: "left" }}>
            <b>&nbsp;SiteChat</b>
          </h4>
          <section>{<ChatRoom />}</section>
        </CardBody>
      </Card>
      <br />
    </Fragment>
  );
}

const auth = firebase.auth();
const firestore = firebase.firestore();

function handleInputChangeEvent(event) {
  setState({
    [event.target.name]: event.target.value,
  });
}

function ChatRoom() {
  const dummy = useRef();
  const messagesRef = firestore.collection("messages");
  const query = messagesRef.orderBy("createdAt").limit(25);

  const [messages] = useCollectionData(query, { idField: "id" });

  const [formValue, setFormValue] = useState("");

  const sendMessage = async (e) => {
    e.preventDefault();

    const { uid, photoURL } = auth.currentUser;

    await messagesRef.add({
      text: formValue,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      uid,
      photoURL,
    });

    setFormValue("");
    dummy.current.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <main>
        {messages &&
          messages.map((msg) => <ChatMessage key={msg.id} message={msg} />)}

        <span ref={dummy}></span>
      </main>

      <form
        style={{ textAlign: "center" }}
        className="formchat"
        onSubmit={sendMessage}
      >
        <input
          className="inputchat"
          value={formValue}
          onChange={(e) => setFormValue(e.target.value)}
          placeholder="say something nice"
        />
        <button className="buttonchat" type="submit" disabled={!formValue}>
          🕊️
        </button>
      </form>
    </>
  );
}
function ChatMessage(props) {
  const { text, uid, photoURL } = props.message;

  const messageClass = uid === auth.currentUser.uid ? "sent" : "received";

  return (
    <>
      <div className={`message ${messageClass}`}>
        <img
          className="imgchat"
          src={photoURL || "./images/smallsquare3.png"}
        />
        <p className="pchat">{text}</p>
      </div>
    </>
  );
}
export default LiveChatManagerComponent;
