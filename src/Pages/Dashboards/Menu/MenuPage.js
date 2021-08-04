import React, { Component, Fragment, useState, useEffect, useRef } from "react";

import CSSTransitionGroup from "react-transition-group/CSSTransitionGroup";

import { FaCartPlus } from "react-icons/fa";

import TextareaAutosize from "@material-ui/core/TextareaAutosize";

import {
  Row,
  Col,
  Button,
  UncontrolledButtonDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Nav,
  NavItem,
  ListGroup,
  ListGroupItem,
  Card,
  CardBody,
  CardHeader,
  CardImg,
  NavLink,
  TabContent,
  TabPane,
  Progress,
  CardFooter,
  ButtonGroup,
} from "reactstrap";

import { Helmet } from "react-helmet";

import { Link } from "react-router-dom";

import firebase from "firebase/app";
import "firebase/auth";
import "firebase/storage";
import "firebase/firestore";

import { makeStyles } from "@material-ui/core/styles";
import Popover from "@material-ui/core/Popover";

import Modal from "@material-ui/core/Modal";

export default function CRMDashboard2() {
  const [gotMenuData, setGotMenuData] = useState([]);
  const [categoryList, setCategoryList] = useState([]);
  const [categoryListSet, setCategoryListSet] = useState([]);
  const [categorizedMenuArray, setCategorizedMenuArray] = useState([]);
  const [renderedMenuItemsArray, setRenderedMenuItemsArray] = useState([]);
  const [selectedImgModalState, setSelectedImgModalState] = useState({
    title: "",
    src: "",
  });

  const [hasReceivedImgURL, sethasReceivedImgURL] = useState(false);

  const [loadedDescriptionData, setloadedDescriptionData] = useState("");
  const [loadedPriceData, setloadedPriceData] = useState("");
  const [loadedLastSave, setloadedLastSave] = useState("");
  const [loadedCategory, setloadedCategory] = useState("");
  const [loadedPublic, setloadedPublic] = useState("");
  const [loadedTitleData, setloadedTitleData] = useState("");

  const loadStageRef = useRef(0);
  const isInitialMount = useRef(true);

  const [dataArrayState, setDataArrayState] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");

  const [url, setURL] = useState("");

  const [loadedImgURL, setloadedImgURL] = useState("");

  const [file, setFile] = useState(null);

  function handleChange(e) {
    setFile(e.target.files[0]);
  }

  function handleUpload(e) {
    const storage = firebase.storage();
    e.preventDefault();
    const uploadTask = storage.ref(`/submissions/${file.name}`).put(file);
    uploadTask.on("state_changed", console.log, console.error, () => {
      storage
        .ref("submissions")
        .child(file.name)
        .getDownloadURL()
        .then((url) => {
          setFile(null);
          setURL(url);
          setloadedImgURL(url);
          sethasReceivedImgURL(true);
          console.log(url);
        });
    });
  }

  const useStyles2 = makeStyles((theme) => ({
    modal: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
    paper: {
      backgroundColor: theme.palette.background.paper,
      border: "2px solid #000",
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
    },
  }));

  const classes2 = useStyles2();
  const [open2, setOpen2] = React.useState(false);

  const handleOpen2 = () => {
    setOpen2(true);
  };

  const handleClose2 = () => {
    setOpen2(false);

    setSelectedImgModalState({
      src: "",
      title: "",
    });
  };

  const [open3, setOpen3] = React.useState(false);

  const handleOpen3 = () => {
    setOpen3(true);
  };

  const handleClose3 = () => {
    setOpen3(false);
  };

  // PopOver
  const useStyles = makeStyles((theme) => ({
    typography: {
      padding: theme.spacing(2),
    },
  }));

  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  useEffect(() => {
    if (categorizedMenuArray.length > 0) {
      loadStageRef.current = 2;
    }

    console.log(categorizedMenuArray);
    console.log(loadStageRef.current);
    console.log(categorizedMenuArray);

    console.log("State Refresh");
    if (!isInitialMount.current) {
      //loads last, EveryTime
      // console.log("Running UseEffect2");
      // Listen To Snapshot & Update
    } else {
      loadStageRef.current = 1;
      console.log("State 2 Init");
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
        db.collection("Menu")
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

            setDataArrayState(dbDataArray);
            console.log(dbDataArray);
            setGotMenuData(dbDataArray);

            if (dbDataArray) {
              try {
                loadStageRef.current = 2;
              } catch (error) {}
            }
          });
      }

      if (loadStageRef.current === 2) {
      }
      isInitialMount.current = false;
    }
  });

  async function runSendData() {
    if (
      window.confirm(
        `
        Are you sure you want to save:
        \n
        ${loadedCategory}
        ${loadedTitleData}
        ${loadedPriceData}
        ${loadedDescriptionData}
        ${loadedImgURL}
        `
      )
    ) {
      firebase
        .firestore()
        .collection("MenuSubmissions")
        .doc()
        .set({
          Price: loadedPriceData,
          Available: loadedPublic,
          Title: loadedTitleData,
          LastSave: firebase.firestore.FieldValue.serverTimestamp(),
          Description: loadedDescriptionData,
          Category: loadedCategory,
          ImgURL: loadedImgURL,
        })
        .then(() => {
          //
        });
      alert("Your request has been received!");
    } else {
      // Do nothing!
    }
  }

  function decideRenderMenu() {
    gotMenuData.sort(sort_by("Category", true, (a) => a.toUpperCase()));
    let tempParsedCategories = [];
    gotMenuData.map((el, index) => {
      if (window.ItemCounter === undefined) {
        window.ItemCounter = 0;
        window.ItemCatCount = 0;
      }
      window.ItemCounter++;
      window.ItemCatCount++;

      console.log("X Items In Category:");

      console.log(window.ItemCatCount);
      console.log("X End");

      if (categoryList.length <= gotMenuData.length)
        categoryList.push(el.Category);
      categoryList.forEach((el2, index) => {
        if (el.Available)
          if (!JSON.stringify(renderedMenuItemsArray).includes(el.Title)) {
            if (
              !JSON.stringify(tempParsedCategories).includes(
                JSON.stringify(el.Category)
              )
            ) {
              categoryListSet.push(el.Category);
              console.log("New Category Detected");
              console.log(categoryListSet);
              if (window.CategoryCounter === undefined) {
                window.CategoryCounter = 0;
                window.ItemsPerCategory = window.ItemCounter;
              }
              window.CategoryCounter++;
              window.ItemsPerCategory = window.ItemCatCount;
              console.log("X Items In Category:");

              console.log(window.ItemCatCount);
              window.ItemCatCount = 0;

              console.log(el.Category);
              console.log(window.CategoryCounter);

              renderedMenuItemsArray.push(el.Title);
              categorizedMenuArray.push(
                <div
                  style={{
                    width: "100%",
                    height: "100%",
                    borderTop: "2px solid",
                    borderRadius: "25px",
                    fontWeight: 800,
                    fontFamily: `"Montserrat", sans-serif`,
                    backgroundColor: index % 2 ? "#eefffe" : "#ddfffd",
                    position: "relative",
                    top: "-5px",
                    padding: "5px",
                  }}
                  key={`AA_Div_${el.Category}${index}`}
                >
                  <span
                    id={`Cat_Div_${el.Category}`}
                    style={{
                      minWidth: "300px",
                      fontSize: "32px",
                      position: "relative",
                      top: "15px",
                      left: "15px",
                    }}
                  >
                    {el.Category}
                  </span>
                  <Col
                    style={{
                      minWidth: "250px",
                      maxWidth: "500px",
                      boxShadow: "0px 0px 0px 2px #ccdddd",
                      marginTop: "50px",
                      backgroundColor: index % 2 ? "#eeeeff" : "#ddddff",
                      position: "relative",
                      borderRadius: "25px",
                      top: "-5px",
                      padding: "5px",
                    }}
                    key={`Col_${el.Title}${index}`}
                  >
                    <span
                      style={{
                        fontSize: "32px",
                        fontWeight: 600,
                        fontFamily: `"Montserrat", sans-serif`,
                      }}
                    >
                      {el.Title}

                      <img
                        id={"menuImg" + el.Title}
                        onClick={() => {
                          setSelectedImgModalState({
                            src: el.ImgURL,
                            title: el.Title,
                          });
                          handleOpen2();
                        }}
                        onMouseOver={() => {
                          document.getElementById(
                            "menuImg" + el.Title
                          ).style.transform = "scale(1.5)";
                        }}
                        onMouseLeave={() => {
                          document.getElementById(
                            "menuImg" + el.Title
                          ).style.transform = "scale(1)";
                        }}
                        alt={el.title}
                        style={{
                          maxWidth: "75px",
                          borderRadius: "25px",
                          zIndex: 205,
                        }}
                        src={el.ImgURL}
                      ></img>
                    </span>
                    &nbsp;
                    <span
                      style={{
                        fontSize: "22px",
                        fontWeight: 600,
                        fontFamily: `"Montserrat", sans-serif`,
                      }}
                    >
                      &nbsp;{el.Price}
                    </span>
                    {/* <br /> */}
                    <button
                      hidden
                      style={{
                        height: "35px",
                        width: "35px",
                        borderRadius: "25px",
                        backgroundColor: "#66CC66",
                      }}
                    >
                      <span
                        style={{
                          position: "relative",
                          left: "-12px",
                        }}
                      >
                        <FaCartPlus size="25px" color="black" />
                      </span>
                      <br />
                    </button>
                    <br />
                    <span>{el.Description}</span>
                  </Col>
                </div>
              );
              tempParsedCategories.push(el.Category);
            } else {
              console.log(" Category Already Exists");
              console.log(el.Category);

              renderedMenuItemsArray.push(el.Title);
              categorizedMenuArray.splice(
                index - window.ItemCatCount,
                0,
                <Col
                  style={{
                    minWidth: "250px",
                    maxWidth: "500px",
                    borderRadius: "25px",
                    boxShadow: "0px 0px 0px 2px #ccdddd",
                    backgroundColor: index % 2 ? "#eeeeff" : "#ddddff",
                    position: "relative",
                    top: "-5px",
                    margin: "5px",
                    padding: "5px",
                  }}
                  key={`Col_${el.Title}${index}`}
                >
                  <span
                    style={{
                      fontSize: "32px",
                      fontWeight: 600,
                      fontFamily: `"Montserrat", sans-serif`,
                    }}
                  >
                    {el.Title}
                  </span>
                  <br />
                  <span>
                    <img
                      hidden={el.ImgURL === ""}
                      id={"menuImg" + el.Title}
                      onClick={() => {
                        setSelectedImgModalState({
                          src: el.ImgURL,
                          title: el.Title,
                        });
                        handleOpen2();
                      }}
                      onMouseOver={() => {
                        document.getElementById(
                          "menuImg" + el.Title
                        ).style.transform = "scale(1.5)";
                      }}
                      onMouseLeave={() => {
                        document.getElementById(
                          "menuImg" + el.Title
                        ).style.transform = "scale(1)";
                      }}
                      alt={el.title}
                      style={{
                        maxWidth: "75px",
                        borderRadius: "25px",
                        zIndex: 205,
                      }}
                      src={el.ImgURL}
                    ></img>
                    <span
                      style={{
                        fontSize: "22px",
                        fontWeight: 600,
                        fontFamily: `"Montserrat", sans-serif`,
                      }}
                    >
                      &nbsp;&nbsp;&nbsp;
                      {el.Price}
                    </span>{" "}
                    <br />
                    <button
                      hidden
                      style={{
                        height: "35px",
                        width: "35px",
                        borderRadius: "25px",
                        backgroundColor: "#66CC66",
                      }}
                    >
                      <span
                        style={{
                          position: "relative",
                          left: "-12px",
                        }}
                      >
                        <FaCartPlus size="25px" color="black" />
                      </span>
                    </button>
                    <span
                      style={{
                        fontSize: "16px",
                        fontWeight: 600,
                        fontFamily: `"Montserrat", sans-serif`,
                      }}
                    >
                      {el.Description}
                    </span>
                  </span>
                </Col>
              );
            }
            return false
          } else {return false}
          });
          return false
    });
    // console.log("Finished Rendering");
    // console.log(categorizedMenuArray);
    // console.log(loadStageRef.current);
    // console.log(categorizedMenuArray);
    if (loadStageRef.current === 1) {
      return categorizedMenuArray.reverse();
    } else {
      return categorizedMenuArray;
    }
  }

  const sort_by = (field, reverse, primer) => {
    const key = primer
      ? function (x) {
          return primer(x[field]);
        }
      : function (x) {
          return x[field];
        };

    reverse = !reverse ? 1 : -1;

    return function (a, b) {
      // eslint-disable-next-line no-sequences
      return (a = key(a)), (b = key(b)), reverse * ((a > b) - (b > a));
    };
  };
  return (
    <Fragment>
      <Helmet>
        <title>A`A Roots Menu</title>
        <meta
          name="description"
          content="Browse Through Smoothies, Burritos, Bowls, Wraps & More. @ The A`A Roots Menu."
        />
        <link rel="canonical" href="https://aarootshi.com/menu" />
      </Helmet>
      <CSSTransitionGroup
        component="div"
        transitionName="TabsAnimation"
        transitionAppear={true}
        transitionAppearTimeout={0}
        transitionEnter={false}
        transitionLeave={false}
      >
        <Row
          style={{
            backgroundColor: "transparent",
          }}
        >
          <Col
            style={{
              display: "flex",
              justifyContent: "center",
              backgroundColor: "transparent",
            }}
          >
            <Card
              style={{
                zIndex: 1,
                opacity: 100,
                width: "100%",
                position: "auto",
                boxShadow: "0px 0px 0px 5px rgba(50,50,50, .8)",
                backgroundColor: "#eefffe",
                left: "auto",
                flexDirection: "column",
              }}
            >
              <CardHeader>
                <h1>A`A Roots: Menu</h1>
              </CardHeader>
              <br />
              <CardBody
                style={{
                  display: "flex",

                  float: "none",
                  maxWidth: "100%",
                }}
              >
                <div>
                  <h2>
                    <p>
                      &nbsp;For daily specials and new items, follow us on
                      Instagram or call us!
                    </p>
                    <center>
                      <p>
                        <a
                          href="https://www.instagram.com/aarootsmaui/"
                          target="_blank"
                          rel="noreferrer"
                        >
                          <strong>@aarootsmaui</strong>
                        </a>
                        <strong> </strong>
                      </p>
                      <p>(808) 298-2499</p>
                    </center>
                  </h2>
                </div>
              </CardBody>
              <CardBody
                style={{
                  maxWidth: "100%",
                  position: "relative",
                  top: "-25px",
                }}
              >
                <center>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleClick}
                    style={{ fontSize: "22px" }}
                  >
                    <span style={{ position: "relative", top: "-5px" }}>
                      Browse Menu By Category
                    </span>
                  </Button>
                </center>
                <Popover
                  id={id}
                  open={open}
                  anchorEl={anchorEl}
                  onClose={handleClose}
                  anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "center",
                  }}
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "center",
                  }}
                >
                  Total Categories: {categoryListSet.length}
                  <br />
                  Category List: <br />
                  {categoryListSet.map((elMap, index) => {
                    return (
                      <div key={elMap + "_DivKey2"}>
                        <center>
                          <button
                            style={{ borderRadius: "15px" }}
                            onClick={() => {
                              handleClose();
                              setTimeout(() => {
                                document
                                  .getElementById(`Cat_Div_${elMap}`)
                                  .scrollIntoView({ behavior: "smooth" });
                              }, 250);
                            }}
                          >
                            <b>{elMap}</b>
                          </button>
                        </center>
                        <div style={{ height: "15px" }}></div>
                      </div>
                    );
                  })}
                </Popover>
                &nbsp; <br />
                <Row>{decideRenderMenu()}</Row>
              </CardBody>{" "}
              <CardBody>
                <Row
                  style={{
                    borderRadius: "25px",
                    width: "100%",
                    textAlign: "center",
                  }}
                >
                  <div
                    hidden={categoryList.length > 1}
                    style={{
                      height: "350px",
                      borderRadius: "25px",
                      boxShadow: "0px 0px 0px 2px #ccdddd",
                      width: "100%",
                      textAlign: "center",
                    }}
                  >
                    <h3 style={{ width: "100%", textAlign: "center" }}>
                      Querying The Live A`A Roots Menu
                    </h3>
                  </div>
                  <Col
                    hidden={categoryList.length <= 1}
                    style={{
                      textAlign: "center",
                      position: "relative",
                      left: "-50px",
                    }}
                  >
                    <button
                      onClick={() => {
                        handleOpen3();
                      }}
                      style={{
                        borderRadius: "25px",
                      }}
                    >
                      See something we're missing?
                    </button>
                  </Col>
                </Row>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </CSSTransitionGroup>
      <span>
        <Modal
          open={open2}
          onClose={handleClose2}
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
        >
          <div className={classes2.paper}>
            <br />
            <span style={{ float: "right" }}>
              {" "}
              <button onClick={handleClose2}>X</button>{" "}
            </span>
            <br />
            <h2 id="spring-modal-title">{selectedImgModalState.title}</h2>
            <br />
            <div>
              <center>
                <img
                  style={{ maxWidth: window.innerWidth - 75 }}
                  src={selectedImgModalState.src}
                  alt={selectedImgModalState.title}
                />
              </center>
            </div>
          </div>
        </Modal>
      </span>
      <span>
        <Modal
          open={open3}
          onClose={handleClose3}
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
        >
          <div className={classes2.paper}>
            <br />
            <span style={{ float: "right" }}>
              <button onClick={handleClose3}>X</button>
            </span>
            <br />
            <h2 id="spring-modal-title"> Menu Item Submission</h2>
            <br />
            <div>
              <div
                style={{
                  boxShadow: "0px 0px 0px 2px rgba(50,50,50, .8)",
                  alignContent: "center",
                  alignItems: "center",
                  justifyContent: "center",
                  textAlign: "center",
                  maxWidth: "500px",
                  margin: "auto",
                }}
              >
                <Row style={{ margin: "auto" }}>
                  <h2>
                    Thank you for your interest in improving the A`A Roots
                    online menu.
                  </h2>{" "}
                  <br />
                  <h5>
                    Fill out as much as you can, add a picture or simply report
                    a missing item.
                  </h5>{" "}
                  <br /> <br />
                  <Col>
                    <b>
                      Category:
                      <br />
                    </b>
                    <TextareaAutosize
                      type="textarea"
                      rowsMin={1}
                      placeholder=""
                      style={{
                        width: "100%",
                        maxWidth: "300px",
                        minWidth: "175px",
                        textAlign: "center",
                      }}
                      value={String(loadedCategory)}
                      onChange={(e) => {
                        setloadedCategory(e.target.value);
                      }}
                    ></TextareaAutosize>
                  </Col>
                </Row>
                <Col>
                  <b>Title</b>:<br />
                  <TextareaAutosize
                    style={{
                      width: "100%",
                      maxWidth: "300px",
                      minWidth: "175px",
                      textAlign: "center",
                    }}
                    value={String(loadedTitleData)}
                    onChange={(e) => {
                      setloadedTitleData(e.target.value);
                    }}
                    rowsMin={1}
                    placeholder=""
                  />
                </Col>
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
                </Row>{" "}
                <br />
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
                <br />
                <form
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
                  style={{ maxWidth: "150px" }}
                  src={url}
                  alt=""
                />{" "}
                <br />
                <button
                  onClick={() => {
                    runSendData();
                  }}
                >
                  Send
                </button>
                <br />
              </div>
            </div>
          </div>
        </Modal>
      </span>
    </Fragment>
  );
}
