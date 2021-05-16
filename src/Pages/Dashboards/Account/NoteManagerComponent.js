import React, { Component, Fragment, useState, useEffect, useRef } from "react";

import { gql, useQuery } from "@apollo/client";
import { ApolloClient, InMemoryCache, HttpLink } from "apollo-boost";
import { Query, ApolloProvider, Mutation } from "react-apollo";

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

function NoteManagerComponent() {
  const [url, setURL] = useState("");
  const [noteVar, setnoteVar] = useState("");
  const [textVar2, settextVar2] = useState("Select an Instance To Begin");
  const [textVar, settextVar] = useState("Select an Instance To Begin");
  const [statusVar, setstatusVar] = useState("No Orders Found");
  const [onlineButton, setonlineButton] = useState("Go Online");
  const [purgeButton, setpurgeButton] = useState("Clear Old Instances");
  const [selectByIDVar, setselectByIDVar] = useState("0");
  const [loadedImgURL, setloadedImgURL] = useState("");
  const [loadedDescription, setloadedDescription] = useState("");
  const [editedDescription, seteditedDescription] = useState("");
  const [loadedLocationData, setloadedLocationData] = useState("");
  const [getDataEZID, setgetDataEZID] = useState("");
  const [ChangeImageURLVar, setChangeImageURLVar] = useState("");
  const [loadedCreatorData, setloadedCreatorData] = useState("");
  const [loadedGMapCoords, setloadedGMapCoords] = useState("");
  const [loadedLastEdit, setloadedLastEdit] = useState("");
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
  const [loadedSnapshotData, setloadedSnapshotData] = useState("");
  const [loadedSnapshotDataIDs, setloadedSnapshotDataIDs] = useState("");
  const [categoryVar, setcategoryVar] = useState("ListingsToApprove");
  const [file, setFile] = useState(null);
  const [gotDownloadURL, setgotDownloadURL] = useState(
    "Upload An Image To Embed"
  );

  function handleInputChangeEvent(event) {
    setState({
      [event.target.name]: event.target.value,
    });
  }
  loadStageRef.current = 0;
  const isInitialMount = useRef(true);

  useEffect(() => {
    checkFormStates();
    let concData = [];
    let concData2 = [];
    let concData3 = [];

    console.log("Updating, Stage: " + loadStage);
    if (loadStage === "1") {
      const loadsnapshot = async () => {
        let concData = [];
        let concData2 = [];
        const snapshot = await firebase
          .firestore()
          .collection(categoryVar)
          .get();
        snapshot.forEach(async function (doc) {
          concData = concData.concat(doc.data());
          concData2 = concData2.concat(doc.id);
        });
        setloadedSnapshotData(concData);
        setloadedSnapshotDataIDs(concData2);
      };
      loadsnapshot().then(async () => {
        setloadStage("2");
      });
      setisLoadedOnce("2");
    }

    if (loadStage === "2") {
      try {
        console.log(loadedSnapshotData);

        setisLoadedOnce("1");
        setloadedTotalIDs(loadedSnapshotData.length);
        setloadedCategory(loadedSnapshotData[loadedEzID - 1].Category) &
          setloadedDescription(loadedSnapshotData[loadedEzID - 1].Description) &
          setloadedGMapCoords(loadedSnapshotData[loadedEzID - 1].GMapCoords) &
          setloadedPublic(loadedSnapshotData[loadedEzID - 1].Public) &
          setloadedLocationData(loadedSnapshotData[loadedEzID - 1].Location) &
          setloadedTitleData(loadedSnapshotData[loadedEzID - 1].Title) &
          setloadedCreatorData(loadedSnapshotData[loadedEzID - 1].Creator) &
          setloadedLastEdit(loadedSnapshotData[loadedEzID - 1].LastEdit) &
          setloadedIDData(loadedSnapshotData[loadedEzID - 1].ID) &
          setstatusVar(
            "Viewing " +
              categoryVar +
              " " +
              loadedEzID +
              " of: " +
              loadedTotalIDs
          ) &
          setloadStage("3");
      } catch (error) {
        console.log(error);
      }
    }
    if (loadStage === "3") {
      setloadStage("4");
    }
    if (loadStage === "4") {
      console.log("Finished Loading!");
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
        });
    });
  }

  function handleChange(e) {
    setFile(e.target.files[0]);
  }

  function runSendData() {
    firebase
      .firestore()
      .collection("ListingsToApprove")
      .doc(String(loadedSnapshotDataIDs[loadedEzID - 1]))
      .set({
        Location: loadedLocationData,
        Creator: loadedCreatorData,
        GMapCoords: loadedGMapCoords,
        ID: loadedIDData,
        Title: loadedTitleData,
        Public: loadedPublic,
        LastEdit: new Date().toISOString(),
        Description: loadedDescription,
        Category: loadedCategory,
      });
  }

  function runSendDataToLive() {
    firebase.firestore().collection("LiveMapData").doc().set({
      Location: loadedLocationData,
      Creator: loadedCreatorData,
      GMapCoords: loadedGMapCoords,
      ID: loadedIDData,
      Title: loadedTitleData,
      Public: loadedPublic,
      LastEdit: new Date().toISOString(),
      Description: loadedDescription,
      Category: loadedCategory,
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
        .doc(String(loadedSnapshotDataIDs[loadedEzID - 1]))
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
            <b>&nbsp; Order&nbsp;Manager</b>
          </h4>
          <span>
            <Button
              color="primary"
              onClick={() =>
                setcategoryVar("ListingsToApprove") &
                setloadStage("1") &
                setloadedEzID("1")
              }
            >
              Live Orders
            </Button>{" "}
            &nbsp;
            <Button
              color="primary"
              onClick={() =>
                setcategoryVar("LiveMapData") &
                setloadStage("1") &
                setloadedEzID("1")
              }
            >
              Completed
            </Button>{" "}
          </span>
          <h3>{statusVar}</h3>
          ID #: &nbsp;
          <input
            onChange={(e) =>
              setloadedEzID(e.target.value) & setloadStage("1") & formResetter()
            }
            value={loadedEzID}
            name="loadedEzID"
            style={{ width: "45px" }}
          ></input>
          &nbsp; &nbsp;
          <Button
            style={{ marginBottom: "5px" }}
            color="primary"
            onClick={() =>
              setloadedEzID(toInteger(loadedEzID) - 1) & setloadStage("1")
            }
          >
            ←
          </Button>{" "}
          &nbsp;
          <Button
            style={{ marginBottom: "5px" }}
            color="primary"
            onClick={() =>
              setloadedEzID(toInteger(loadedEzID) + 1) & setloadStage("1")
            }
          >
            →
          </Button>{" "}
          &nbsp;
          <Button
            style={{ marginBottom: "5px" }}
            color="success"
            onClick={() => runSendData() & setloadStage("1")}
          >
            Save
          </Button>{" "}
          &nbsp;
          <Button
            style={{ marginBottom: "5px" }}
            color="success"
            onClick={() => runSendDataToLive() & setloadStage("1")}
          >
            Complete
          </Button>{" "}
          &nbsp;
          <Button
            style={{ marginBottom: "5px" }}
            color="secondary"
            onClick={() =>
              setloadedEzID(toInteger(loadedTotalIDs) + 1) &
              setloadStage("2") &
              seteditedDescription("") &
              setloadedDescription("")
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
                <input
                  value={String(loadedTitleData)}
                  onChange={(e) => {
                    setloadedTitleData(e.target.value);
                  }}
                ></input>
              </Col>
              <Col>
                <b>ID</b>:<br />
                <input
                  value={String(loadedIDData)}
                  onChange={(e) => {
                    setloadedIDData(e.target.value);
                  }}
                ></input>
              </Col>
            </Row>
            <Row>
              <Col>
                <b>Creator</b>:<br />
                <input
                  value={String(loadedCreatorData)}
                  onChange={(e) => {
                    setloadedCreatorData(e.target.value);
                  }}
                ></input>
              </Col>
              <Col>
                <b>
                  Public:
                  <br />
                </b>
                <input
                  value={String(loadedPublic)}
                  onChange={(e) => {
                    setloadedPublic(e.target.value);
                  }}
                ></input>
              </Col>
            </Row>
            <Row>
              <Col>
                <b>GMapCoords</b>:<br />
                <input
                  value={String(loadedGMapCoords)}
                  onChange={(e) => {
                    setloadedGMapCoords(e.target.value);
                  }}
                ></input>
              </Col>
              <Col>
                <b>
                  LastEdit:
                  <br />
                </b>
                <input
                  value={String(loadedLastEdit)}
                  onChange={(e) => {
                    setloadedLastEdit(e.target.value);
                  }}
                ></input>
              </Col>
            </Row>
            <Row>
              <Col>
                <b>Category:</b> <br />
                <Input
                  type="textarea"
                  style={{
                    width: "100%",
                    maxWidth: "300px",
                    minWidth: "175px",
                    height: "50px",
                  }}
                  value={String(loadedCategory)}
                  onChange={(e) => {
                    setloadedCategory(e.target.value);
                  }}
                ></Input>
              </Col>
              <Col>
                <b>
                  LocationData:
                  <br />
                </b>
                <Input
                  type="textarea"
                  style={{
                    width: "100%",
                    maxWidth: "300px",
                    minWidth: "175px",
                    height: "50px",
                  }}
                  value={String(loadedLocationData)}
                  onChange={(e) => {
                    setloadedLocationData(e.target.value);
                  }}
                ></Input>
              </Col>
            </Row>
            <Row>
              <Col
                style={{
                  width: "100%",
                  justifyContent: "center",
                  alignItems: "center",
                  textAlign: "center",
                }}
              >
                <b>Description</b>:<br />
                <center>
                  <div
                    style={{
                      maxWidth: "675px",
                      boxShadow: "0px 0px 0px 2px rgba(50,50,50, .8)",
                      justifyContent: "center",
                      alignItems: "center",
                      textAlign: "center",
                    }}
                    className="listingExample"
                    dangerouslySetInnerHTML={{
                      __html: loadedDescription,
                    }}
                  />
                </center>
              </Col>
            </Row>
          </div>
          &nbsp;{" "}
          <div
            style={{
              boxShadow: "0px 0px 0px 2px rgba(50,50,50, .8)",
            }}
          >
            <h4 style={{ width: "100%", textAlign: "left" }}>
              <b>&nbsp;Description Editor:</b>
            </h4>
            <div style={{ width: "100%", textAlign: "center" }}>
              <CKEditor onChange={onEditorChange} data={loadedDescription} />{" "}
              <br />{" "}
            </div>
          </div>
          <br />
          <div
            style={{
              boxShadow: "0px 0px 0px 2px rgba(50,50,50, .8)",
            }}
          >
            <h4 style={{ width: "100%", textAlign: "left" }}>
              <b>&nbsp;Upload An Image:</b>
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
              }}
            >
              <h4 style={{ width: "100%", textAlign: "left" }}>
                <b>&nbsp;Live Example:</b>
              </h4>
            </div>
            <Row>
              <Col
                style={{
                  width: "90%",
                }}
              >
                <b>{loadedTitleData}</b>
                <br />
                <a
                  target="_blank"
                  href={`https://www.google.com/search?q=${encodeURIComponent(
                    loadedLocationData
                  )}`}
                >
                  {loadedLocationData}
                </a>
                <center>
                  {" "}
                  <div
                    style={{
                      maxWidth: "675px",
                      boxShadow: "0px 0px 0px 2px rgba(50,50,50, .8)",
                      justifyContent: "center",
                      alignItems: "center",
                      textAlign: "center",
                    }}
                    className="listingExample"
                    dangerouslySetInnerHTML={{
                      __html: editedDescription,
                    }}
                  />
                </center>
              </Col>
            </Row>{" "}
          </div>{" "}
        </CardBody>
      </Card>
    </Fragment>
  );
}
export default NoteManagerComponent;
