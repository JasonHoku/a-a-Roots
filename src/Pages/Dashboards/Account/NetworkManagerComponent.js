import React, { Component, Fragment, useState, useEffect, useRef } from "react";

import ReactDOM from "react-dom";
import {
  Row,
  ListGroupItem,
  Card,
  CardBody,
  Button,
  TabContent,
  TabPane,
  Container,
  Input,
  FormText,
} from "reactstrap";

import firebase from "firebase/app";
import "firebase/auth";
import "firebase/storage";
import "firebase/firestore";

import { useAuthState } from "react-firebase-hooks/auth";

import { useCollectionData } from "react-firebase-hooks/firestore";
import { useDocument } from "react-firebase-hooks/firestore";

import {
  FacebookProvider,
  Like,
  MessageUs,
  SendToMessenger,
  Subscribe,
} from "react-facebook";
import {
  FacebookShareCount,
  PinterestShareCount,
  VKShareCount,
  OKShareCount,
  RedditShareCount,
  TumblrShareCount,
  HatenaShareCount,
  FacebookShareButton,
  FacebookMessengerShareButton,
  FacebookMessengerIcon,
  LinkedinShareButton,
  TwitterShareButton,
  PinterestShareButton,
  VKShareButton,
  OKShareButton,
  TelegramShareButton,
  WhatsappShareButton,
  RedditShareButton,
  EmailShareButton,
  TumblrShareButton,
  LivejournalShareButton,
  MailruShareButton,
  ViberShareButton,
  WorkplaceShareButton,
  LineShareButton,
  WeiboShareButton,
  PocketShareButton,
  InstapaperShareButton,
  HatenaShareButton,
  FacebookIcon,
  TwitterIcon,
  LinkedinIcon,
  PinterestIcon,
  VKIcon,
  OKIcon,
  TelegramIcon,
  WhatsappIcon,
  RedditIcon,
  TumblrIcon,
  MailruIcon,
  EmailIcon,
  LivejournalIcon,
  ViberIcon,
  WorkplaceIcon,
  LineIcon,
  PocketIcon,
  InstapaperIcon,
  WeiboIcon,
  HatenaIcon,
} from "react-share";
import "./chat.css";

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

function NetworkManagerComponent() {
  const auth = firebase.auth();

  const firestore = firebase.firestore();

  const query = firestore.doc(`Secrets/${auth.currentUser.uid}`);

  const [docValue, docLoading, docError] = useDocument(query);

  const [loadStage, setloadStage] = useState("1");
  const [activeTab, setactiveTab] = useState("1");

  return (
    <Fragment>
    
    </Fragment>
  );
}

export default NetworkManagerComponent;
