import React, { Component, Fragment, useState, useEffect, useRef } from "react";

import { gql, useQuery } from "@apollo/client";
import { ApolloClient, InMemoryCache, HttpLink } from "apollo-boost";
import { Query, ApolloProvider, Mutation } from "react-apollo";

import TextareaAutosize from "@material-ui/core/TextareaAutosize";
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
import axios from "axios";
import CKEditor from "ckeditor4-react";

import FireBaseImageUpload from "./firebaseImageUpload";

import { reverse, toInteger } from "lodash";
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/storage";
import "firebase/firestore";

function EditMenuComponent() {
  const [url, setURL] = useState("");

  const [textVar, settextVar] = useState("Select an Instance To Begin");

  const [statusVar, setstatusVar] = useState("ID# 1 / 1");

  const [loadedImgURL, setloadedImgURL] = useState("");
  const [loadedDescription, setloadedDescription] = useState("");
  const [editedDescription, seteditedDescription] = useState("");
  const [loadedDescriptionData, setloadedDescriptionData] = useState("");
  const [getDataEZID, setgetDataEZID] = useState("");
  const [ChangeImageURLVar, setChangeImageURLVar] = useState("");
  const [loadedPriceData, setloadedPriceData] = useState("");
  const [loadedGMapCoords, setloadedGMapCoords] = useState("");
  const [loadedLastSave, setloadedLastSave] = useState("");
  const [loadedCategory, setloadedCategory] = useState("");
  const [loadedPublic, setloadedPublic] = useState("");
  const [loadedIDData, setloadedIDData] = useState("");
  const loadStageRef = useRef(0);
  const [loadStage, setloadStage] = useState("1");
  const [loadedTitleData, setloadedTitleData] = useState("");
  const [sendReadyCreator, setsendReadyCreator] = useState("");
  const [sendReadyCategory, setsendReadyCategory] = useState("");
  const [sendReadyDescription, setsendReadyDescription] = useState("");
  const [sendReadyGMapCoords, setsendReadyGMapCoords] = useState("");
  const [sendReadyLocation, setsendReadyLocation] = useState("");
  const [sendReadyID, setsendReadyID] = useState("");
  const [sendReadyPublic, setsendReadyPublic] = useState("");
  const [sendReadyTitle, setsendReadyTitle] = useState("");
  const [loadedEzID, setloadedEzID] = useState("1");
  const [isLoadedOnce, setisLoadedOnce] = useState("1");
  const [loadedTotalIDs, setloadedTotalIDs] = useState("1");
  const [hasReceivedImgURL, sethasReceivedImgURL] = useState(false);
  const [gotLoadedObjectData, setgotLoadedObjectData] = useState("");
  const [gotLoadedObjectDataIDs, setgotLoadedObjectDataIDs] = useState("");
  const [categoryVar, setcategoryVar] = useState("MenuItems");
  const [file, setFile] = useState(null);
  const [dataArrayState, setDataArrayState] = useState([]);
  const [gotDownloadURL, setgotDownloadURL] = useState(
    "Upload An Image To Embed"
  );

  function handleInputChangeEvent(event) {
    setState({
      [event.target.name]: event.target.value,
    });
  }

  function handleInputChangeEvent(event) {
    setState({
      [event.target.name]: event.target.value,
    });
  }
  loadStageRef.current = 1;
  const isInitialMount = useRef(true);

  useEffect(() => {
    console.log("State Refresh");
    if (!isInitialMount.current) {
      //loads last, EveryTime
      // console.log("Running UseEffect2");
      // Listen To Snapshot & Update
    } else {
      console.log("State 2 Init");
      checkFormStates();
      let concData = [];
      let concData2 = [];
      let concData3 = [];

      if (loadStageRef.current === 1) {
        console.log("State Stage: " + loadStageRef.current);
        let concData = [];
        let concData2 = [];
        let dbData = {};
        let imgSrcArray = [];
        let gotLoadedObjectData = [];
        let gameObjectData = {};
        var db = firebase.firestore();
        db.collection(categoryVar)
          .get()
          .then((userData) => {
            userData.forEach((doc) => {
              var key = doc.id;
              var data = doc.data();
              data["key"] = key;
              dbData[key] = data;
            });
            let dbDataArray = Object.values(dbData);
            //Check Through Array of User Collections
            console.log(dbDataArray);
            setDataArrayState(dbDataArray);

            if (dbDataArray) {
              try {
                setloadedTotalIDs(dbDataArray.length);
                setloadedCategory(dbDataArray[loadedEzID - 1].Category) &
                  setloadedDescription(
                    dbDataArray[loadedEzID - 1].Description
                  ) &
                  setloadedPublic(dbDataArray[loadedEzID - 1].Available) &
                  setloadedDescriptionData(
                    dbDataArray[loadedEzID - 1].Description
                  ) &
                  setloadedTitleData(dbDataArray[loadedEzID - 1].Title) &
                  setloadedPriceData(dbDataArray[loadedEzID - 1].Price) &
                  setloadedImgURL(dbDataArray[loadedEzID - 1].ImgURL);
                setloadedLastSave(
                  dbDataArray[loadedEzID - 1].LastSave.toDate()
                ) &
                  setloadedIDData(dbDataArray[loadedEzID - 1].ID) &
                  setstatusVar(
                    "Viewing " +
                      categoryVar +
                      " " +
                      loadedEzID +
                      " of: " +
                      dbDataArray.length
                  ) &
                  setloadStage("3");
                loadStageRef.current = 3;
              } catch (error) {}
            }
          });

        if ((loadStageRef.current = 3)) {
          console.log("State Stage: " + loadStageRef.current);
          if (loadedEzID > dataArrayState.length) {
            setstatusVar(
              "Creating New " +
                categoryVar +
                " " +
                parseInt(dataArrayState.length + 1) +
                " of: " +
                dataArrayState.length
            );
          }
          setloadStage("4");
        }
        if (loadStage === "4") {
          console.log("State Stage: " + loadStageRef.current);
          console.log("Finished Loading!");
        }
      }
      isInitialMount.current = false;
    }
  });

  function onEditorChange(evt) {
    seteditedDescription(evt.editor.getData());
  }

  function copyImgURL() {
    var copyText = document.getElementById("copyImgURLElement");
    copyText.select();
    copyText.setSelectionRange(0, 99999);
    document.execCommand("copy");

    var tooltip = document.getElementById("myTooltip");
    tooltip.innerHTML = "Copied: " + copyText.value;
  }

  function outFunc() {
    var tooltip = document.getElementById("myTooltip");
    tooltip.innerHTML = "Copy to clipboard";
  }
  function handleUpload(e) {
    const storage = firebase.storage();
    e.preventDefault();
    const uploadTask = storage.ref(`/listings/${file.name}`).put(file);
    uploadTask.on("state_changed", console.log, console.error, () => {
      storage
        .ref("listings")
        .child(file.name)
        .getDownloadURL()
        .then((url) => {
          setFile(null);
          setURL(url);
          setloadedImgURL(url);
          console.log(url);
        });
    });
  }

  function handleChange(e) {
    setFile(e.target.files[0]);
  }

  function runSendData() {
    firebase.firestore().collection("MenuItems").doc(String(loadedEzID)).set({
      Price: loadedPriceData,
      Available: loadedPublic,
      ID: loadedEzID,
      Title: loadedTitleData,
      LastSave: firebase.firestore.FieldValue.serverTimestamp(),
      Description: loadedDescriptionData,
      Category: loadedCategory,
      ImgURL: loadedImgURL,
    });
  }

  function runDeleteData() {
    var answer = window.confirm(
      "Are you sure you want to delete " + loadedEzID
    );
    if (answer) {
      console.log(String(loadedEzID));
      firebase
        .firestore()
        .collection(categoryVar)
        .doc(String(gotLoadedObjectDataIDs[loadedEzID - 1]))
        .delete()
        .then(setloadStage("1") & setloadedTotalIDs(loadedTotalIDs - 1));
    } else {
      //some code
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
  function checkFormStates() {
    setgotDownloadURL(localStorage.getItem("gotDownloadURL"));
    handleImageUploadState();
    try {
      if (String(formTitle).length > 3) {
        console.log("ZZZ");
        if (String(localStorage.getItem(`username`)).length > 3) {
          if (String(formLoc.length) > 3) {
            if (String(editedDescription.length) > 3) {
              if (String(formCategory).length > 3) {
                if (String(formPublicType) !== "") {
                  if (String(formGMapCoords).length > 3) {
                    document.getElementById("finListButton").disabled = false;
                    document.getElementById(
                      "finListButton"
                    ).style.backgroundColor = "blue";

                    setfinListButton("Send Listing"),
                      setfinListButtonStatus("Ready To Publish"),
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
  function handleImageUploadState() {
    if (gotDownloadURL === "Upload An Image To Embed") {
      return (
        <div>
          <br />
          {gotDownloadURL}
          <br />
        </div>
      );
    } else {
      // User Has URL
      return (
        <div>
          <br />
          {gotDownloadURL}
          <br />
          <button
            style={{ borderRadius: "25px" }}
            onClick={() => {
              formResetter() &
                checkFormStates() &
                localStorage.setItem("gotDownloadURL", "Upload Image To Embed");
            }}
          >
            Reset Image Form
          </button>
        </div>
      );
    }
  }
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
            <b>&nbsp; Menu&nbsp;Manager</b>
          </h4>
          <span>
            <Button
              color="primary"
              onClick={() =>
                setcategoryVar("MenuItems") &
                setloadStage("1") &
                setloadedEzID("1")
              }
            >
              Browse By Category
            </Button>{" "}
            &nbsp;
            <Button
              color="primary"
              onClick={() =>
                setcategoryVar("MenuItems") &
                setloadStage("1") &
                setloadedEzID("1")
              }
            >
              Search
            </Button>{" "}
          </span>
          <h3>{statusVar}</h3>
          ID #: &nbsp;
          <input
            onChange={(e) => {
              setloadedEzID(e.target.value) &
                setloadStage("1") &
                formResetter();
              loadStageRef.current = 1;
              isInitialMount.current = true;
            }}
            value={loadedEzID}
            name="loadedEzID"
            style={{ width: "45px" }}
          ></input>
          &nbsp; &nbsp;
          <Button
            style={{ marginBottom: "5px" }}
            color="primary"
            onClick={() => {
              setloadedEzID(toInteger(loadedEzID) - 1) & setloadStage("1");
              loadStageRef.current = 1;
              isInitialMount.current = true;
            }}
          >
            ←
          </Button>{" "}
          &nbsp;
          <Button
            style={{ marginBottom: "5px" }}
            color="primary"
            onClick={() => {
              loadStageRef.current = 1;
              isInitialMount.current = true;
              setloadedEzID(toInteger(loadedEzID) + 1) & setloadStage("1");
            }}
          >
            →
          </Button>{" "}
          &nbsp;
          <Button
            style={{ marginBottom: "5px" }}
            color="success"
            onClick={() => {
              runSendData();
              setloadStage("1");
              loadStageRef.current = 1;
              isInitialMount.current = true;
            }}
          >
            Save
          </Button>{" "}
          &nbsp;
          <Button
            style={{ marginBottom: "5px" }}
            color="secondary"
            onClick={() =>
              setloadedEzID(toInteger(dataArrayState.length) + 1) &
              setloadStage("2") &
              seteditedDescription("") &
              setloadedDescription("") &
              setstatusVar(
                "Creating New " +
                  categoryVar +
                  " " +
                  parseInt(dataArrayState.length + 1) +
                  " of: " +
                  dataArrayState.length
              )
            }
          >
            New
          </Button>{" "}
          &nbsp;
          <Button
            style={{ marginBottom: "5px" }}
            color="danger"
            onClick={() =>
              runDeleteData() & setloadedEzID(1) & setloadStage("2")
            }
          >
            Delete
          </Button>
          <br />
          <br />
          <div
            style={{
              boxShadow: "0px 0px 0px 2px rgba(50,50,50, .8)",
              alignContent: "center",
              alignItems: "center",
              justifyContent: "center",
              textAlign: "center",
            }}
          >
            <Row>
              <Col style={{ width: "100%" }}>
                <b>Title</b>:<br />
                <TextareaAutosize
                  value={String(loadedTitleData)}
                  onChange={(e) => {
                    setloadedTitleData(e.target.value);
                  }}
                  aria-label="minimum height"
                  rowsMin={1}
                  placeholder=""
                />
              </Col>
              <Col>
                <b>ID</b>:<br />
                <input
                  style={{
                    display: "inline",
                    width: "100px",
                  }}
                  placeholder={loadedEzID}
                  value={String(loadedIDData)}
                  onChange={(e) => {
                    setloadedIDData(e.target.value);
                  }}
                ></input>
              </Col>
            </Row>
            <Row>
              <Col>
                <b>Price</b>:<br />
                <input
                  style={{ width: "100px" }}
                  value={String(loadedPriceData)}
                  onChange={(e) => {
                    setloadedPriceData(e.target.value);
                  }}
                ></input>
              </Col>
              <Col>
                <b>
                  Available:
                  <br />
                </b>
                Yes{" "}
                <input
                  id="AvailableRadio1"
                  type="radio"
                  checked={loadedPublic}
                  onChange={(e) => {
                    document.getElementById("AvailableRadio2").checked = false;
                    setloadedPublic(true);
                  }}
                ></input>{" "}
                &nbsp;&nbsp; No{" "}
                <input
                  checked={!loadedPublic}
                  id="AvailableRadio2"
                  type="radio"
                  onChange={(e) => {
                    document.getElementById("AvailableRadio1").checked = false;
                    setloadedPublic(false);
                  }}
                ></input>
                &nbsp;&nbsp;
              </Col>
            </Row>
            <Row>
              <Col>
                <b>
                  Category:
                  <br />
                </b>
                <TextareaAutosize
                  type="textarea"
                  aria-label="minimum height"
                  rowsMin={1}
                  placeholder=""
                  style={{
                    width: "100%",
                    maxWidth: "300px",
                    minWidth: "175px",
                  }}
                  value={String(loadedCategory)}
                  onChange={(e) => {
                    setloadedCategory(e.target.value);
                  }}
                ></TextareaAutosize>
              </Col>
            </Row>
            <Row>
              <Col>
                <b>
                  Description:
                  <br />
                </b>
                <TextareaAutosize
                  type="textarea"
                  aria-label="minimum height"
                  rowsMin={2}
                  placeholder=""
                  style={{
                    width: "100%",
                    maxWidth: "300px",
                    minWidth: "175px",
                  }}
                  value={String(loadedDescriptionData)}
                  onChange={(e) => {
                    setloadedDescriptionData(e.target.value);
                  }}
                ></TextareaAutosize>
              </Col>
            </Row>
            <Row>
              <Col>
                <b>
                  Last Save:
                  <br />
                </b>
                <input
                  style={{ width: "80%" }}
                  disabled
                  value={String(loadedLastSave)}
                ></input>
              </Col>
            </Row>
            <br />
          </div>
          &nbsp; <br />
          <div
            style={{
              boxShadow: "0px 0px 0px 2px rgba(50,50,50, .8)",
            }}
          >
            <h4 style={{ width: "100%", textAlign: "left" }}>
              <b>&nbsp;Upload Image:</b>
            </h4>
            <form
              role="imgForm"
              name="imgForm"
              id="imgForm"
              onSubmit={handleUpload}
            >
              <input type="file" onChange={handleChange} />
              <Button
                hidden={!file}
                fill="true"
                color="primary"
                disabled={!file}
                style={{
                  alignSelf: "center",
                  justifySelf: "center",
                  display: "block",
                  position: "relative",
                  width: "55%",
                }}
                type="submit"
              >
                <h5 style={{ position: "relative", top: "-2px" }}>
                  Upload Image
                </h5>
              </Button>{" "}
            </form>
            <img
              hidden={!hasReceivedImgURL}
              style={{ maxWidth: "100%" }}
              src={url}
              alt=""
            />
            <input
              disabled={true}
              hidden={!hasReceivedImgURL}
              type="text"
              value={loadedImgURL}
              id="copyImgURLElement"
            />{" "}
            &nbsp;
            <div hidden={!hasReceivedImgURL} className="tooltip2">
              <button onClick={() => copyImgURL()} onMouseOut={() => outFunc()}>
                <span className="tooltip2text" id="myTooltip">
                  Copy to clipboard
                </span>
                Copy text
              </button>
            </div>
          </div>
          <br />{" "}
          <div
            style={{
              boxShadow: "0px 0px 0px 2px rgba(50,50,50, .8)",
              width: "100%",
            }}
          >
            <div
              style={{
                width: "100%",
                textAlign: "center",
                maxWidth: "600px",
              }}
            >
              <h4
                style={{ width: "100%", maxWidth: "600px", textAlign: "left" }}
              >
                <b>&nbsp;Preview:</b>
              </h4>
            </div>
            <Row>
              <Col
                style={{
                  width: "90%",
                  maxWidth: window.innerWidth,
                }}
              >
                <img
                  style={{ maxWidth: window.innerWidth / 3 }}
                  src={loadedImgURL}
                ></img>
              </Col>
              <Col
                style={{
                  width: "90%",
                  maxWidth: window.innerWidth,
                }}
              >
                <b style={{ fontSize: "22px" }}>{loadedTitleData}</b>{" "}
                {loadedPriceData}
                <br />
                {loadedDescriptionData}
              </Col>
            </Row>
          </div>
        </CardBody>
      </Card>
    </Fragment>
  );
}
export default EditMenuComponent;
