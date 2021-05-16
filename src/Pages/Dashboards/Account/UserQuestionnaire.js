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
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  FormText,
  CardHeader,
  CardTitle,
  CardLink,
  CardImg,
  NavLink,
  TabContent,
  TabPane,
} from "reactstrap";

import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";

import PerfectScrollbar from "react-perfect-scrollbar";

import firebase from "firebase/app";
import "firebase/auth";
import "firebase/storage";
import "firebase/firestore";

import { useCollectionData } from "react-firebase-hooks/firestore";
import { useDocument } from "react-firebase-hooks/firestore";

function UserQuestionnaireComponent() {
  const [statusVar, setstatusVar] = useState("Loading..");
  const [editedDescription, seteditedDescription] = useState("");
  const [loadedIDData, setloadedIDData] = useState("");
  const [loadStage, setloadStage] = useState("1");
  const [sendReadyCreator, setsendReadyCreator] = useState("");
  const [sendReadyCategory, setsendReadyCategory] = useState("");
  const [sendReadyDescription, setsendReadyDescription] = useState("");
  const [sendReadyGMapCoords, setsendReadyGMapCoords] = useState("");
  const [sendReadyLocation, setsendReadyLocation] = useState("");
  const [sendReadyID, setsendReadyID] = useState("");
  const [sendReadyPublic, setsendReadyPublic] = useState("");
  const [sendReadyTitle, setsendReadyTitle] = useState("");
  const [loadedEzID, setloadedEzID] = useState("1");
  const [loadedTotalIDs, setloadedTotalIDs] = useState("1");
  const [loadedAnswerData, setloadedAnswerData] = useState("");
  const [loadedQuestionData, setloadedQuestionData] = useState("");
  const [loadedFlowData, setloadedFlowData] = useState("");
  const [loadedSnapshotData, setloadedSnapshotData] = useState("");
  const [totalUserListings, settotalUserListings] = useState("Loading...");
  const [questionType, setquestionType] = useState("warning");
  const [questionType2, setquestionType2] = useState("primary");
  const [loadedSnapshotDataIDs, setloadedSnapshotDataIDs] = useState("");
  const [activeQuestionListing, setactiveQuestionListing] = useState(null);

  const [readyQuestionAnswer, setreadyQuestionAnswer] = useState("");
  const [readyQuestionScore, setreadyQuestionScore] = useState(0);
  const [readyNextQuestionFlow, setreadyNextQuestionFlow] = useState("");
  const [
    readyQuestionScorePossibleTotal,
    setreadyQuestionScorePossibleTotal,
  ] = useState("Loading...");

  const [file, setFile] = useState(null);

  const [gotDownloadURL, setgotDownloadURL] = useState("Upload An Image");

  const auth = firebase.auth();
  const firestore = firebase.firestore();

  const query = firestore.doc(`UserData/${auth.currentUser.uid}`);

  const [docValue, docLoading, docError] = useDocument(query);

  const messagesRef = firestore.collection("LiveMapData");

  const [messages2] = useCollectionData(messagesRef, { idField: "id" });

  //Active Question Response Data
  const [readyYesScoreData, setreadyYesScoreData] = useState("");
  const [readyYesFlowData, setreadyYesFlowData] = useState("");

  const [readyNoScoreData, setreadyNoScoreData] = useState("");
  const [readyNoFlowData, setreadyNoFlowData] = useState("");

  const [readyNAScoreData, setreadyNAScoreData] = useState("");
  const [readyNAFlowData, setreadyNAFlowData] = useState("");

  const [readyCheckBoxSelected, setreadyCheckBoxSelected] = useState([]);

  const [readyCheckBoxCounter, setreadyCheckBoxCounter] = useState([]);

  useEffect(() => {
    if (loadStage === "1") {
      checkFormStates();
      console.log("Updating, Stage: " + loadStage);
      setreadyNextQuestionFlow("X");

      const loadsnapshot = async () => {
        let concData = [];
        let concData2 = [];
        const snapshot = await firebase
          .firestore()
          .collection("EcoQuestions")
          .get();

        snapshot.forEach(async function (doc) {
          concData = concData.concat(doc.data());
          concData2 = concData2.concat(doc.id);
        });
        setloadedSnapshotData(concData) & setloadedSnapshotDataIDs(concData2);
      };
      loadsnapshot().then(async () => {
        if (loadedSnapshotData != "") {
          setloadStage("2");
        }
      });
    }

    if (loadStage === "2") {
      console.log("Updating, Stage: " + loadStage);
      try {
        localStorage.setItem("sendReadyQuestion", loadedQuestionData);
        localStorage.setItem("sendReadyAnswer", loadedAnswerData);
        localStorage.setItem("sendReadyFlowData", loadedFlowData);
        localStorage.setItem("editedDescription", editedDescription);
        localStorage.setItem("sendReadyCategory", sendReadyCategory);
        localStorage.setItem("sendReadyDescription", sendReadyDescription);
        localStorage.setItem("sendReadyCreator", sendReadyCreator);
        localStorage.setItem("sendReadyGMapCoords", sendReadyGMapCoords);
        localStorage.setItem("sendReadyLocation", sendReadyLocation);
        localStorage.setItem("sendReadyID", sendReadyID);
        localStorage.setItem("sendReadyPublic", sendReadyPublic);
        localStorage.setItem("sendReadyTitle", sendReadyTitle);
        setloadedTotalIDs(loadedSnapshotData.length) &
          setloadedQuestionData(loadedSnapshotData[loadedEzID - 1].Question) &
          setloadedAnswerData(loadedSnapshotData[loadedEzID - 1].AnswerData) &
          setloadedFlowData(loadedSnapshotData[loadedEzID - 1].FlowTag) &
          setloadedIDData(loadedSnapshotData[loadedEzID - 1].ID) &
          setloadStage("3");
      } catch (error) {
        console.log(error);
      }
      setstatusVar("Viewing " + loadedEzID + " of: " + loadedTotalIDs);
    }
    if (loadStage === "3") {
      console.log("Updating, Stage: " + loadStage);
      let AnswerDataArray = loadedAnswerData.split(";");
      try {
        setreadyQuestionScore("0") & setreadyCheckBoxSelected([]);
        let AnswerDataArray = loadedAnswerData.split(";");

        let NAAnswerDataArray = loadedAnswerData.split("$|");

        let YesAnswerDataArray = loadedAnswerData.split("@|");

        let NoAnswerDataArray = loadedAnswerData.split("#|");

        let CheckBoxesArray = loadedAnswerData.split("[|");

        let MetaDataArray = loadedAnswerData.split("%|");

        let CheckBoxesFlow = loadedAnswerData.split("*|");

        setreadyYesFlowData(MetaDataArray[1]) &
          setreadyYesScoreData(MetaDataArray[2]) &
          setreadyNoFlowData(MetaDataArray[4]) &
          setreadyNoScoreData(MetaDataArray[5]) &
          setreadyNAFlowData(MetaDataArray[7]) &
          setreadyNAScoreData(MetaDataArray[8]) &
          // get CheckBox count
          setreadyCheckBoxCounter(CheckBoxesArray.length - 1);
        // read if is MultiSelect
        if (CheckBoxesArray.length > 1) {
          //question is Multiple Select
          setquestionType("primary") &
            setquestionType2("warning") &
            setreadyNextQuestionFlow(CheckBoxesFlow[1]) &
            setreadyQuestionScorePossibleTotal(CheckBoxesArray.length - 1);
        } else {
          //question is YES NO NA
          setreadyQuestionScorePossibleTotal(readyYesScoreData);
          setquestionType("warning");
          setquestionType2("primary");
        }
      } catch (error) {}
      setloadStage("4");
    }
    if (loadStage === "4") {
      console.log("Finished Loading!");
    }
  });

  const isInitialMount = useRef(true);

  function decideCurrentScore() {
    if (readyCheckBoxSelected.length > 0) {
      return readyCheckBoxSelected.length;
    } else return readyQuestionScore;
  }

  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggle = () => setDropdownOpen((prevState) => !prevState);

  const useStyles = makeStyles((theme) => ({
    button: {
      display: "block",
      marginTop: theme.spacing(2),
    },
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
    },
  }));

  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [activeQuestionAnswers, setactiveQuestionAnswers] = React.useState("");

  const handleClose = () => {
    setOpen(false);
  };
  const handleChange = (event) => {
    setactiveQuestionListing(event.target.value);
  };
  const handleOpen = () => {
    setOpen(true);
  };
  const [open2, setOpen2] = React.useState(false);

  const handleClose2 = () => {
    setOpen2(false);
  };
  const handleChange2 = (event) => {
    setactiveQuestionAnswers(event.target.value);
  };
  const handleOpen2 = () => {
    setOpen2(true);
  };

  function decideRenderUserListings() {
    try {
      return (
        <div>
          <FormControl className={classes.formControl}>
            <InputLabel id="demo-controlled-open-select-label" style={{}}>
              Select Listing:
            </InputLabel>
            <Select
              labelId="demo-controlled-open-select-label"
              id="demo-controlled-open-select"
              style={{
                height: "22px",
                paddingTop: "15px",
                paddingBottom: "15px",
                boxShadow: "3px 3px 3px 2px rgba(50,50,50, .3)",
              }}
              open={open}
              onClose={handleClose}
              onOpen={handleOpen}
              value={activeQuestionListing}
              onChange={handleChange}
            >
              {messages2 &&
                messages2.map((msg, index) => {
                  if (
                    msg.Creator === auth.currentUser.displayName ||
                    "Jason Hoku" === auth.currentUser.displayName
                  ) {
                    return (
                      <MenuItem key={msg.Title} value={msg.Title}>
                        {msg.Title}
                      </MenuItem>
                    );
                  }
                })}
            </Select>
          </FormControl>
        </div>
      );
    } catch (error) {}
  }
  function decideRenderUserAnswers() {
    try {
      return (
        <span>
          {docValue && (
            <span>
              <FormControl className={classes.formControl}>
                <InputLabel id="demo-controlled-open-select-label">
                  View Your Answers:
                </InputLabel>
                <Select
                  labelId="demo-controlled-open-select-label"
                  id="demo-controlled-open-select"
                  style={{
                    height: "22px",
                    minWidth: "200px",
                    paddingTop: "15px",
                    paddingBottom: "15px",
                    boxShadow: "3px 3px 3px 2px rgba(50,50,50, .3)",
                  }}
                  open={open2}
                  onClose={handleClose2}
                  onOpen={handleOpen2}
                  value={activeQuestionAnswers}
                  onChange={handleChange2}
                >
                  {(docValue.data() &&
                    JSON.stringify(docValue.data().userListingsData)
                      .split(",")
                      .map((msg, index) => (
                        <MenuItem key={msg} value={msg}>
                          {msg}
                        </MenuItem>
                      ))) ||
                    null}
                </Select>
              </FormControl>
            </span>
          )}
        </span>
      );
    } catch (error) {}
  }
  //questionaire decide action results
  function onClickEvent(e) {
    try {
      if (e.target.name === "checkBoxVar") {
        if (e.target.checked) {
          //before click
          if (readyCheckBoxSelected.indexOf(e.target.id) > -1) {
            setreadyCheckBoxSelected(
              readyCheckBoxSelected.filter(
                (readyCheckBoxSelected) => readyCheckBoxSelected !== e.target.id
              )
            );
          }
        } else {
          console.log("Checked False: " + e.target.checked);
          setreadyCheckBoxSelected(readyCheckBoxSelected.concat(e.target.id));
        }
        setreadyQuestionScore(readyCheckBoxSelected.length);
      }

      console.log(readyCheckBoxSelected);
      let AnswerDataArray = loadedAnswerData.split(";");

      let NAAnswerDataArray = loadedAnswerData.split("$|");

      let YesAnswerDataArray = loadedAnswerData.split("@|");

      let NoAnswerDataArray = loadedAnswerData.split("#|");

      let CheckBoxesArray = loadedAnswerData.split("[|");

      let MetaDataArray = loadedAnswerData.split("%|");
      if (e.target.id === "YesRadio") {
        console.log("Yes Flow:" + MetaDataArray[1]);
        console.log("Yes Score:" + MetaDataArray[2]);
        setreadyNextQuestionFlow(MetaDataArray[1]);
        setreadyQuestionScore(MetaDataArray[2]);
        document.getElementById("NoRadio").checked = false;
        document.getElementById("NARadio").checked = false;
      }

      if (e.target.id === "NoRadio") {
        console.log("No Flow:" + MetaDataArray[4]);
        console.log("No Score:" + MetaDataArray[5]);
        setreadyNextQuestionFlow(MetaDataArray[4]);
        setreadyQuestionScore(MetaDataArray[5]);
        document.getElementById("YesRadio").checked = false;
        document.getElementById("NARadio").checked = false;
      }
      if (e.target.id === "NARadio") {
        console.log("No Flow:" + MetaDataArray[7]);
        console.log("No Score:" + MetaDataArray[8]);
        setreadyNextQuestionFlow(MetaDataArray[7]);
        setreadyQuestionScore(MetaDataArray[8]);
        document.getElementById("YesRadio").checked = false;
        document.getElementById("NoRadio").checked = false;
      }
    } catch (error) {}
  }

  useEffect(() => {
    // initiate the event handler
    window.addEventListener("mousedown", onClickEvent);

    // this will clean up the event every time the component is re-rendered
    return function cleanup() {
      window.removeEventListener("mousedown", onClickEvent);
    };
  });

  function runSetToYNNA() {
    alert("NYI");
  }
  function runAddCheckBox() {
    alert("NYI");
  }

  const updateUserDatabase = async (e) => {
    const { uid, photoURL } = auth.currentUser;

    await query.update({
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      uid,
    });
  };

  function runSaveUserAnswers() {
    const auth = firebase.auth();
    firebase
      .firestore()
      .collection("UserData")
      .doc(auth.currentUser.uid)
      .set(
        {
          username: String(auth.currentUser.displayName),
          uuid: String(auth.currentUser.uid),
          email: String(auth.currentUser.email),
          userListingsData: {
            [activeQuestionListing]: {
              [activeQuestionListing + loadedFlowData]:
                "Q: " + loadedFlowData + " S: " + readyQuestionScore,
            },
          },
        },
        { merge: true }
      );

    setloadedEzID(parseInt(loadedEzID) + 1);
    setloadStage("2");
    formResetter();
  }

  function decidePossibleScore() {
    return "X";
  }
  function onEditorChange(evt) {
    seteditedDescription(evt.editor.getData());
  }

  function decideUsersListingsAnswers() {
    try {
      return;
    } catch (error) {}
  }

  function decidePossibleAnswers() {
    try {
      let AnswerDataArray = loadedAnswerData.split(";");

      let NAAnswerDataArray = loadedAnswerData.split("$|");

      let YesAnswerDataArray = loadedAnswerData.split("@|");

      let NoAnswerDataArray = loadedAnswerData.split("#|");

      let CheckBoxesArray = loadedAnswerData.split("[|");

      let MetaDataArray = loadedAnswerData.split("%|");

      let readyAllAnswersDataArray = [];
      let readyYesAnswerDataArray = [];
      let readyNoAnswerDataArray = [];
      let readyNAAnswerDataArray = [];
      let readyCheckboxesAnswerDataArray = [];

      if (loadedAnswerData.includes("Yes")) {
        readyYesAnswerDataArray = (
          <span key="YesRadio">
            {YesAnswerDataArray[1]} &nbsp;
            <Input
              type="radio"
              id="YesRadio"
              key="YesRadio"
              name="YesRadio"
            ></Input>
            &nbsp; &nbsp; &nbsp;
          </span>
        );

        readyAllAnswersDataArray.push(readyYesAnswerDataArray);
      }
      if (loadedAnswerData.includes("No")) {
        readyNoAnswerDataArray = (
          <span key="NoRadio">
            {NoAnswerDataArray[1]} &nbsp;
            <Input key="NoRadio" id="NoRadio" type="radio"></Input>
            &nbsp; &nbsp; &nbsp;
          </span>
        );
        readyAllAnswersDataArray.push(readyNoAnswerDataArray);
      }
      if (loadedAnswerData.includes("[|")) {
        CheckBoxesArray.forEach((e) => {
          if (!e.includes("@|") && !e.includes("#|") && !e.includes("$|")) {
            if (e.length > 1) {
              readyCheckboxesAnswerDataArray.push(
                <div key={e} style={{ width: "85%", textAlign: "left" }}>
                  <Input
                    id={e}
                    style={{ marginTop: "5px", marginBottom: "5px" }}
                    key={e}
                    name="checkBoxVar"
                    type="checkbox"
                  ></Input>{" "}
                  &nbsp;
                  {e}
                  &nbsp; &nbsp; &nbsp; &nbsp;
                </div>
              );
            }
          }
        });

        readyAllAnswersDataArray.push(readyCheckboxesAnswerDataArray);
      }
      if (loadedAnswerData.includes("NA")) {
        readyNAAnswerDataArray = (
          <span key="NARadio">
            &nbsp;&nbsp;
            {NAAnswerDataArray[1]} &nbsp;
            <Input key="NARadio" id="NARadio" type="radio"></Input>
          </span>
        );

        readyAllAnswersDataArray.push(readyNAAnswerDataArray);
      }

      return <h5>{readyAllAnswersDataArray}</h5>;
    } catch (error) {}
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
  function handleInputChangeEvent(event) {
    setState({
      [event.target.name]: event.target.value,
    });
  }

  function runSendData() {
    firebase
      .firestore()
      .collection("EcoQuestions")
      .doc(String(loadedSnapshotDataIDs[loadedEzID - 1]))
      .set({
        Question: loadedQuestionData,
        AnswerData: loadedAnswerData,
        FlowTag: loadedFlowData,
        ID: loadedIDData,
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
        .collection("EcoQuestions")
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
      if (String(localStorage.getItem(`username`)).length > 3) {
        document.getElementById("finListButton").disabled = false;
        document.getElementById("finListButton").style.backgroundColor = "blue";

        setfinListButton("Send Listing"),
          setfinListButtonStatus("Ready To Publish"),
          setfinListButtonDisable(false);
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
        <h2 style={{ width: "100%", textAlign: "left" }}>
          <b>Question Manager:</b>
        </h2>
        <CardBody>
          <Row>
            <h4 style={{ width: "100%", textAlign: "left" }}>
              <b>&nbsp;Answer Editor:</b>
            </h4>
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
                  &nbsp;Your Listings:
                  {decideRenderUserListings()}
                  Selected Listing:{" "}
                  <b>{activeQuestionListing || "Awaiting Selection"} </b>
                  <br />
                  <br />
                  Your Answers: <br />
                  {decideRenderUserAnswers()}
                </h4>
                <br />
                <b>
                  <strong>
                    <h2> Question: {loadedFlowData}</h2>
                    <br />
                  </strong>
                  &nbsp;
                </b>
                <h5>{loadedQuestionData}</h5> <br />
                {decidePossibleAnswers()}
                <br />
                {readyCheckBoxSelected}
                <br />
                <Button
                  style={{ marginBottom: "5px" }}
                  color="success"
                  onClick={() => runSaveUserAnswers()}
                >
                  <span style={{ fontSize: "120%" }}>Save &amp; Proceed</span>
                </Button>
                <br />
                <br />
                {/*     Notes, Questions or Comments to Staff: <br />{" "}
                <Input
                  type="textarea"
                  style={{
                    width: "100%",
                    maxWidth: "300px",
                    minWidth: "250px",
                    height: "50px",
                  }}
                  value={readyQuestionAnswer}
                  onChange={(e) => setreadyQuestionAnswer(e.target.value)}
                ></Input>  */}
              </div>
            </div>
          </Row>
        </CardBody>
      </Card>
    </Fragment>
  );
}
export default UserQuestionnaireComponent;
