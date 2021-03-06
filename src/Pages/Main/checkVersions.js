import React, { Component } from "react";
import { render } from "react-dom";

import "firebase/firestore";
import {
  FirebaseAppProvider,
  useFirestoreDocData,
  useFirestore,
} from "reactfire";

import firebase from "firebase/app";

import "firebase/auth";
import "firebase/storage";
import "firebase/firestore";

import { unregister } from "../../serviceWorker";

import { toast } from "react-toastify";

function CheckVersions() {
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

  function showNotification() {
    var isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);

    if (!isSafari) {
      navigator.serviceWorker.register("sw2.js");
      Notification.requestPermission(function (result) {
        if (result === "granted") {
          navigator.serviceWorker.ready.then(function (registration) {
            var options = {
              body:
                "A new version of this website is available, please reload after saving any work to load new website content.",
              icon: "logo512.png",
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
        onClose: () => unregister,
        pauseOnHover: true,
        draggable: true,
      }
    );
  }
  function Burrito() {
    // easily access the Firestore library
    const burritoRef = useFirestore().collection("version").doc("0");

    // subscribe to a document for realtime updates. just one line!
    const { status, data } = useFirestoreDocData(burritoRef);

    // easily check the loading status
    if (status === "loading") {
    } else {
      console.log(data.version);
      let concData = data.version;
      if (!localStorage.getItem("appVersion")) {
        localStorage.setItem("appVersion", concData);
      } else if (localStorage.getItem("appVersion") !== concData) {
        if (localStorage.getItem("appVersion") && concData.version) {
          var isSafari = /^((?!chrome|android).)*safari/i.test(
            navigator.userAgent
          );

          if (!isSafari) {
            // showNotification();
            // showNotification2();
            if (caches) {
              caches.keys().then(function (names) {
                for (let name of names) caches.delete(name);
              });
              localStorage.setItem("appVersion", concData);
            }
          }
        }
      }
    }
    return null;
  }
  return (
    <FirebaseAppProvider firebaseConfig={firebaseConfig}>
      <Burrito />
    </FirebaseAppProvider>
  );
}

export default CheckVersions;
