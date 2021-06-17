import React, { Component, Fragment, useState, useEffect, useRef } from "react";

import CSSTransitionGroup from "react-transition-group/CSSTransitionGroup";

import { FaCartPlus } from "react-icons/fa";

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

  const loadStageRef = useRef(0);
  const isInitialMount = useRef(true);

  const [dataArrayState, setDataArrayState] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");

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
        db.collection("MenuItems")
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
          if (!JSON.stringify(renderedMenuItemsArray).includes(el.ID)) {
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

              renderedMenuItemsArray.push(el.ID);
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
                    <span>{el.Price}</span>
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

              renderedMenuItemsArray.push(el.ID);
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
                      style={{
                        maxWidth: "75px",
                        borderRadius: "25px",
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
          }
      });
    });
    console.log("Finished Rendering");
    console.log(categorizedMenuArray);
    console.log(loadStageRef.current);
    console.log(categorizedMenuArray);
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
      return (a = key(a)), (b = key(b)), reverse * ((a > b) - (b > a));
    };
  };
  return (
    <Fragment>
      <Helmet>
        <title>a`a Roots Menu</title>
        <meta
          name="description"
          content="Smoothies, Burritos, Bowls & More. @ The a`a Roots Menu."
        />
        <link rel="canonical" href="https://a-a-roots.web.app/menu" />
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
                <h1>a`a Roots: Menu</h1>
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
                  <br />
                  <p
                    style={{
                      float: "none",
                      maxWidth: "100%",
                    }}
                  ></p>
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
                        >
                          <strong>@aarootsmaui</strong>
                        </a>
                        <strong> </strong>
                      </p>
                      <p>(808) 298-2499</p>
                    </center>
                  </h2>
                  <p></p>
                  <p></p>
                </div>
              </CardBody>

              <CardBody
                style={{
                  maxWidth: "100%",
                }}
              >
                <center>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleClick}
                  >
                    Browse By Category
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
              <img
                style={{ maxWidth: window.innerWidth - 75 }}
                src={selectedImgModalState.src}
                alt={selectedImgModalState.title}
              />
            </div>
          </div>
        </Modal>
      </span>
    </Fragment>
  );
}
