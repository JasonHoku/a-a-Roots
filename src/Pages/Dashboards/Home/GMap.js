import React, { Component, Fragment, useState, useEffect, useRef } from "react";
import GoogleMapReact from "google-map-react";
import { getLatLng, geocodeByAddress } from "react-places-autocomplete";

import firebase from "firebase/app";
import "firebase/auth";
import "firebase/storage";
import "firebase/firestore";

var GMAPAPI = process.env.REACT_APP_GMAPAPI;

function SimpleMap() {

  const firebaseConfig = {
    apiKey: process.env.REACT_APP_FIREBASE,
    authDomain: "a-a-roots.firebaseapp.com",
    projectId: "a-a-roots",
    storageBucket: "a-a-roots.appspot.com",
    messagingSenderId: "565878516937",
    appId: "1:565878516937:web:a818482f4819ecc1837118",
    measurementId: "G-CE28VLQR7Z"
  };

  const isInitialMount = useRef(true);

  const [gotMapData, setgotMapData] = useState("1");
  const [loadStage, setloadStage] = useState("1");
  const [infoWindows, setinfoWindows] = useState("");
  const [loadedSnapshotData, setloadedSnapshotData] = useState("");

  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
  }

  useEffect(() => {
    let concData = [];
    let concData2 = [];
    if (isInitialMount.current === true) {
      console.log("LoadStage: " + loadStage);
      if (loadStage === "1") {
        handleApiLoaded() & setloadStage("2");
      }
      if (loadStage === "2") {
        if (gotMapData === "2") {
          handleApiLoaded() & setloadStage("3");
        }
      }
      if (loadStage === "3") {
        isInitialMount.current = false;
      }
    }
  });
  const defaultProps = {
    center: {
      lat: 20.79,
      lng: 203.7,
    },
    zoom: 10,
  };

  function handleApiLoaded(map, maps) {
    var geocoder = new google.maps.Geocoder();
    var marker;
    const iconBase = "https://maps.google.com/mapfiles/";
    const icons = {
      parking: {
        name: "Parking",
        icon: iconBase + "parking_lot_maps.png",
      },
      info: {
        name: "Info",
        icon: iconBase + "arrow.png",
      },
    };
    function initMap() {
      const map = new google.maps.Map(document.getElementById("map"), {
        center: {
          lat: 20.79,
          lng: 203.7,
        },
        zoom: 9,
        icon: icons,
        styles: [
          {
            elementType: "geometry",
            stylers: [
              {
                color: "#242f3e",
              },
            ],
          },
          {
            elementType: "labels.text.fill",
            stylers: [
              {
                color: "#746855",
              },
            ],
          },
          {
            elementType: "labels.text.stroke",
            stylers: [
              {
                color: "#242f3e",
              },
            ],
          },
          {
            featureType: "administrative.land_parcel",
            stylers: [
              {
                visibility: "off",
              },
            ],
          },
          {
            featureType: "administrative.locality",
            elementType: "labels.text.fill",
            stylers: [
              {
                color: "#d59563",
              },
            ],
          },
          {
            featureType: "administrative.neighborhood",
            stylers: [
              {
                visibility: "off",
              },
            ],
          },
          {
            featureType: "poi",
            elementType: "labels.text",
            stylers: [
              {
                visibility: "off",
              },
            ],
          },
          {
            featureType: "poi",
            elementType: "labels.text.fill",
            stylers: [
              {
                color: "#d59563",
              },
            ],
          },
          {
            featureType: "poi.park",
            elementType: "geometry",
            stylers: [
              {
                color: "#263c3f",
              },
            ],
          },
          {
            featureType: "poi.park",
            elementType: "labels.text.fill",
            stylers: [
              {
                color: "#6b9a76",
              },
            ],
          },
          {
            featureType: "road",
            elementType: "geometry",
            stylers: [
              {
                color: "#38414e",
              },
            ],
          },
          {
            featureType: "road",
            elementType: "geometry.stroke",
            stylers: [
              {
                color: "#212a37",
              },
            ],
          },
          {
            featureType: "road",
            elementType: "labels",
            stylers: [
              {
                visibility: "off",
              },
            ],
          },
          {
            featureType: "road",
            elementType: "labels.text.fill",
            stylers: [
              {
                color: "#9ca5b3",
              },
            ],
          },
          {
            featureType: "road.arterial",
            elementType: "labels",
            stylers: [
              {
                visibility: "off",
              },
            ],
          },
          {
            featureType: "road.highway",
            elementType: "geometry",
            stylers: [
              {
                color: "#746855",
              },
            ],
          },
          {
            featureType: "road.highway",
            elementType: "geometry.stroke",
            stylers: [
              {
                color: "#1f2835",
              },
            ],
          },
          {
            featureType: "road.highway",
            elementType: "labels",
            stylers: [
              {
                visibility: "off",
              },
            ],
          },
          {
            featureType: "road.highway",
            elementType: "labels.text.fill",
            stylers: [
              {
                color: "#f3d19c",
              },
            ],
          },
          {
            featureType: "road.local",
            stylers: [
              {
                visibility: "off",
              },
            ],
          },
          {
            featureType: "transit",
            elementType: "geometry",
            stylers: [
              {
                color: "#2f3948",
              },
            ],
          },
          {
            featureType: "transit.station",
            elementType: "labels.text.fill",
            stylers: [
              {
                color: "#d59563",
              },
            ],
          },
          {
            featureType: "water",
            elementType: "geometry",
            stylers: [
              {
                color: "#17263c",
              },
            ],
          },
          {
            featureType: "water",
            elementType: "labels.text",
            stylers: [
              {
                visibility: "off",
              },
            ],
          },
          {
            featureType: "water",
            elementType: "labels.text.fill",
            stylers: [
              {
                color: "#515c6d",
              },
            ],
          },
          {
            featureType: "water",
            elementType: "labels.text.stroke",
            stylers: [
              {
                color: "#17263c",
              },
            ],
          },
        ],
      });

      try {
        let concData = [];

        let concData2 = [];

        const loadsnapshot = async () => {
          let concData = [];
          let concData2 = [];
          const snapshot = await firebase
            .firestore()
            .collection("LiveMapData")
            .get();
          snapshot.forEach(async function (doc) {
            concData = concData.concat(doc.data());
          });
          setloadedSnapshotData(concData) & setgotMapData("2");
        };
        loadsnapshot()
          .then(async () => {
            if (loadedSnapshotData != "") {
              for (
                var i = 0;
                i < JSON.parse(JSON.stringify(loadedSnapshotData)).length;
                i++
              ) {
                let splitCoordsArray = String(
                  JSON.parse(JSON.stringify(loadedSnapshotData))[i].GMapCoords
                ).split(",");

                let features = [
                  {
                    position: new google.maps.LatLng(
                      splitCoordsArray[0],
                      splitCoordsArray[1]
                    ),
                    type: "info",
                    content:
                      "<b>" +
                      JSON.parse(JSON.stringify(loadedSnapshotData))[i].Title +
                      `</b><br /> <a href="https://www.google.com/search?q=${encodeURIComponent(
                        String(
                          JSON.parse(JSON.stringify(loadedSnapshotData))[i]
                            .Location
                        ) +
                          JSON.parse(JSON.stringify(loadedSnapshotData))[i]
                            .Title
                      ).replace(" ", "+")}"` +
                      ">" +
                      JSON.parse(JSON.stringify(loadedSnapshotData))[i]
                        .Location +
                      "</a><br />" +
                      JSON.parse(JSON.stringify(loadedSnapshotData))[i]
                        .Description,

                    title: JSON.parse(JSON.stringify(loadedSnapshotData))[i]
                      .Title,

                    label: JSON.parse(JSON.stringify(loadedSnapshotData))[i]
                      .Title,
                  },
                ];

                var infowindow = new google.maps.InfoWindow({
                  content: "",
                });

                // Create markers.
                features.forEach(function (feature) {
                  var marker = new google.maps.Marker({
                    position: feature.position,
                    content: feature.content,
                    icon: icons[feature.type].icon,
                    map: map,
                  });
                  var content =
                    "<a href='" + feature.content + "'>A link to google</a>";
                  marker.addListener("click", function () {
                    infowindow.setContent("<div>" + marker.content + "</div>");

                    infowindow.open(map, marker);
                  });
                });
              }
            }
          })
          .catch((err) => {
            console.log(err);
          });
      } catch (error) {
        console.log(error);
      }
    }

    console.log("GMap Load");
    initMap(map);
  }
  function markerClick() {
    window.location.pathname = "/account";
  }

  function componentWillUnmount() {}
  let latLong = "20.8474754, -156.6349604".split(",");
  const AnyReactComponent = ({ text }) => (
    <button
      className="maptxt"
      style={{ height: "25px" }}
      type="button"
      onClick={markerClick}
    >
      {text}
    </button>
  );
  return (
    <div
      id="map"
      style={{
        height: "500px",
        width: "100%",
        boxShadow: "0px 0px 0px 5px rgba(50,50,50, .8)",
      }}
    ></div>
  );
}

export default SimpleMap;
