import React, { Component, Fragment } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import MetisMenu from "react-metismenu";
import clsx from "clsx";
import { setEnableMobileMenu } from "../../reducers/ThemeOptions";

import { IoIosInformationCircleOutline, IoIosCog } from "react-icons/io";

import { GiAtom } from "react-icons/gi";

import { GoMailRead } from "react-icons/go";

import { SiGooglecalendar, SiShopify } from "react-icons/si";

import { GiCutDiamond } from "react-icons/gi";

import { GrMapLocation } from "react-icons/gr";

import { Link } from "react-router-dom";

import { VscAccount } from "react-icons/vsc";

import { MdRestaurantMenu } from "react-icons/md";

import { makeStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";

const useStyles = makeStyles({
  list: {
    width: 250,
  },
  fullList: {
    width: "auto",
  },
});

export default function Nav() {
  const classes = useStyles();
  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  function toggleMobileSidebar() {
    console.log("Old");
  }
  const toggleDrawer = (anchor, open) => (event) => {
    try {
      if (
        event.type === "keydown" &&
        (event.key === "Tab" || event.key === "Shift")
      ) {
        return;
      }
    } catch (error) {}
    setState({ state, [anchor]: open });
  };
  if (!window.toggleSidebar) {
    window.toggleSidebar = toggleDrawer("left", true);
  }

  const list = (anchor) => (
    <div
      className={clsx(classes.list, {
        [classes.fullList]: anchor === "top" || anchor === "bottom",
      })}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <div
        style={{
          height: "130px",
          backgroundImage: " url(/logoHorizontal.webp)",
          backgroundSize: "100%",
          backgroundRepeat: "no-repeat",
          fontFamily: "",
          position: "relative",
          fontWeight: "600",
        }}
      ></div>

      <h5 className="app-sidebar__heading">&nbsp;Navigate</h5>
      <Link onClick={toggleMobileSidebar} to="/home">
        <h4>
          <button
            className="gradientBtn"
            style={{
              width: "115%",
              marginTop: "15px",
              height: "125%",
              marginBottom: "15px",
              position: "relative",
            }}
          >
            <span
              className="metismenu-item"
              style={{ position: "relative", top: "-3px", left: "-5px" }}
            >
              <svg className="spin2" height="25px" width="25px">
                <GiAtom />
              </svg>
              &nbsp;&nbsp;&nbsp;
            </span>
            <span
              className="sidebarLinks"
              style={{ position: "relative", top: "1px" }}
            >
              Home
            </span>
          </button>
        </h4>
      </Link>

      <Link onClick={toggleMobileSidebar} to="/menu">
        <h4>
          <button
            className="gradientBtn"
            style={{
              width: "115%",
              marginTop: "15px",
              marginBottom: "15px",
              position: "relative",
            }}
          >
            <span
              className="metismenu-item"
              style={{ position: "relative", top: "-3px", left: "-5px" }}
            >
              <MdRestaurantMenu />
              &nbsp;&nbsp;&nbsp;
            </span>
            <span
              className="sidebarLinks"
              style={{ position: "relative", top: "1px" }}
            >
              Menu
            </span>
          </button>
        </h4>
      </Link>

      <h3 className="app-sidebar__heading">&nbsp;Learn</h3>

      <Link onClick={toggleMobileSidebar} to="/about">
        <h4>
          <button
            className="gradientBtn"
            style={{
              width: "115%",
              marginTop: "15px",
              marginBottom: "15px",
              position: "relative",
            }}
          >
            <span
              className="metismenu-item"
              style={{ position: "relative", top: "-3px", left: "-5px" }}
            >
              <IoIosInformationCircleOutline />
              &nbsp;&nbsp;&nbsp;
            </span>
            <span
              className="sidebarLinks"
              style={{ position: "relative", top: "1px" }}
            >
              About
            </span>
          </button>
        </h4>
      </Link>

      <Link onClick={toggleMobileSidebar} to="/contact">
        <h4>
          <button
            className="gradientBtn"
            style={{
              width: "115%",
              marginTop: "15px",
              marginBottom: "15px",
              position: "relative",
            }}
          >
            <span
              className="metismenu-item"
              style={{ position: "relative", top: "-3px", left: "-5px" }}
            >
              <GoMailRead />
              &nbsp;&nbsp;&nbsp;
            </span>
            <span
              className="sidebarLinks"
              style={{ position: "relative", top: "1px" }}
            >
              Contact
            </span>
          </button>
        </h4>
      </Link>

      <h5 className="app-sidebar__heading">&nbsp;Account</h5>

      <Link onClick={toggleMobileSidebar} to="/account">
        <h4>
          <button
            className="gradientBtn"
            style={{
              width: "115%",
              marginTop: "15px",
              marginBottom: "15px",
              position: "relative",
            }}
          >
            <span
              className="metismenu-item"
              style={{ position: "relative", top: "-3px", left: "-5px" }}
            >
              <VscAccount />
              &nbsp;&nbsp;&nbsp;
            </span>
            <span
              className="sidebarLinks"
              style={{ position: "relative", top: "1px" }}
            >
              Login
            </span>
          </button>
        </h4>
      </Link>
    </div>
  );
  let anchor = "left";
  return (
    <Fragment>
      <div>
        <React.Fragment key={anchor}>
          <Drawer
            anchor={anchor}
            open={state[anchor]}
            onClose={toggleDrawer(anchor, false)}
          >
            {list(anchor)}
          </Drawer>
        </React.Fragment>
      </div>

      <Link to="/home" style={{ textDecoration: "none" }}>
        <div
          style={{
            minHeight: "100px",
            display: "flex",
            verticalAlign: "middle",
            alignItems: "center",
          }}
        >
          <img
            alt="a`a roots logo"
            src="/logoHorizontal.webp"
            style={{
              width: "100%",
              backgroundSize: "125%",
              backgroundRepeat: "no-repeat",
              backgroundPosition: "center",
              position: "relative",
              top: "50%",
              verticalAlign: "middle",
              alignItems: "center",
              minWidth: "50px",
              left: "-15px",
            }}
          ></img>
        </div>
      </Link>

      <Link onClick={toggleMobileSidebar} to="/home">
        <h4>
          <button
            className="gradientBtn"
            style={{
              width: "115%",
              marginTop: "15px",
              marginBottom: "15px",
              position: "relative",
            }}
          >
            <span
              className="metismenu-item"
              style={{ position: "relative", top: "-3px", left: "-15px" }}
            >
              <svg className="spin2" height="25px" width="25px">
                <GiAtom />
              </svg>
              &nbsp;&nbsp;&nbsp;
            </span>
            <span
              className="sidebarLinks"
              style={{ position: "relative", top: "1px" }}
            >
              Home
            </span>
          </button>
        </h4>
      </Link>

      <Link onClick={toggleMobileSidebar} to="/menu">
        <h4>
          <button
            className="gradientBtn"
            style={{
              width: "115%",
              marginTop: "15px",
              marginBottom: "15px",
              position: "relative",
            }}
          >
            <span
              className="metismenu-item"
              style={{ position: "relative", top: "-3px", left: "-15px" }}
            >
              <MdRestaurantMenu />
              &nbsp;&nbsp;&nbsp;
            </span>
            <span
              className="sidebarLinks"
              style={{ position: "relative", top: "1px" }}
            >
              Menu
            </span>
          </button>
        </h4>
      </Link>

      <h3 className="app-sidebar__heading">&nbsp;Learn</h3>

      <Link onClick={toggleMobileSidebar} to="/about">
        <h4>
          <button
            className="gradientBtn"
            style={{
              width: "115%",
              marginTop: "15px",
              marginBottom: "15px",
              position: "relative",
            }}
          >
            <span
              className="metismenu-item"
              style={{ position: "relative", top: "-3px", left: "-15px" }}
            >
              <IoIosInformationCircleOutline />
              &nbsp;&nbsp;&nbsp;
            </span>
            <span
              className="sidebarLinks"
              style={{ position: "relative", top: "1px" }}
            >
              About
            </span>
          </button>
        </h4>
      </Link>

      <Link onClick={toggleMobileSidebar} to="/contact">
        <h4>
          <button
            className="gradientBtn"
            style={{
              width: "115%",
              marginTop: "15px",
              marginBottom: "15px",
              position: "relative",
            }}
          >
            <span
              className="metismenu-item"
              style={{ position: "relative", top: "-3px", left: "-15px" }}
            >
              <GoMailRead />
              &nbsp;&nbsp;&nbsp;
            </span>
            <span
              className="sidebarLinks"
              style={{ position: "relative", top: "1px" }}
            >
              Contact
            </span>
          </button>
        </h4>
      </Link>

      <h5 className="app-sidebar__heading">&nbsp;Account</h5>

      <Link onClick={toggleMobileSidebar} to="/account">
        <h4>
          <button
            className="gradientBtn"
            style={{
              width: "115%",
              marginTop: "15px",
              marginBottom: "15px",
              position: "relative",
            }}
          >
            <span
              className="metismenu-item"
              style={{ position: "relative", top: "-3px", left: "-15px" }}
            >
              <VscAccount />
              &nbsp;&nbsp;&nbsp;
            </span>
            <span
              className="sidebarLinks"
              style={{ position: "relative", top: "1px" }}
            >
              Login
            </span>
          </button>
        </h4>
      </Link>
    </Fragment>
  );
}
