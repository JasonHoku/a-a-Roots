import React, { Component, Fragment, useState, useEffect } from "react";

import firebase from "firebase/app";
import "firebase/auth";
import "firebase/storage";
import "firebase/firestore";
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE,
  authDomain: "a-a-roots.firebaseapp.com",
  projectId: "a-a-roots",
  storageBucket: "a-a-roots.appspot.com",
  messagingSenderId: "565878516937",
  appId: "1:565878516937:web:a818482f4819ecc1837118",
  measurementId: "G-CE28VLQR7Z"
};
function LoadSubmitFinalListing() {
  const [url, setURL] = useState("");
  const [loadedEzID, setloadedEzID] = useState("");
  const [loadCount, setloadCount] = useState("1");
  const [loadCount2, setloadCount2] = useState("1");

  function runSaveUserAnswers() {
    const auth = firebase.auth();
    firebase
      .firestore()
      .collection("UserData")
      .doc(auth.currentUser.uid)
      .create(
        {
          username: String(auth.currentUser.displayName),
          uuid: String(auth.currentUser.uid),
          email: String(auth.currentUser.email),
          userListings: {
            [localStorage.getItem("formTitle")]: {
              [localStorage.getItem("formTitle")]: "No Answers Yet",
            },
          },
        },
        { merge: true }
      );
  }

  function runSaveListing() {
    const auth = firebase.auth();
    firebase
      .firestore()
      .collection("ListingsToApprove")
      .set(
        {
          username: String(auth.currentUser.displayName),
          uuid: String(auth.currentUser.uid),
          email: String(auth.currentUser.email),
          Title: `${localStorage.getItem("formTitle")}`,
          Creator: `${localStorage.getItem(`username`)}`,
          Location: `${localStorage.getItem("formLoc")}`,
          Description: `${localStorage
            .getItem("editedDescription")
            .replace(/(\r\n|\n|\r)/gm, ``)
            .replace(/(`)/gm, `'`)}`,
          Category: `${localStorage.getItem("formCategory")}`,
          Public: `${localStorage.getItem("formPublicType")}`,
          GMapCoords: `${localStorage.getItem("formGMapCoords")}`,
          userListingsData: {
            [activeQuestionListing]: {
              [activeQuestionListing]:
                "Q: " + loadedFlowData + " S: " + readyQuestionScore,
            },
          },
        },
        { merge: true }
      );
  }
  if (loadCount === "1") {
    runSaveListing();
    runSaveUserAnswers();
    <div>
      <span
        style={{
          alignSelf: "center",
          display: "block",
          position: "relative",
          borderRadius: "5px",
          width: "100%",
        }}
        span={runMutation({
          Title: `${localStorage.getItem("formTitle")}`,
          Creator: `${localStorage.getItem(`username`)}`,
          Location: `${localStorage.getItem("formLoc")}`,
          Description: `${localStorage
            .getItem("editedDescription")
            .replace(/(\r\n|\n|\r)/gm, ``)
            .replace(/(`)/gm, `'`)}`,
          Category: `${localStorage.getItem("formCategory")}`,
          Public: `${localStorage.getItem("formPublicType")}`,
          GMapCoords: `${localStorage.getItem("formGMapCoords")}`,
        }).then((res) => {
          console.log(res);
          if (res) {
            setloadCount("2");
            return null;
          }
        })}
      ></span>
    </div>;
    return null;
  } else return null;
}
export default LoadSubmitFinalListing;
