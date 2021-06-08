import React, { Fragment, lazy, Suspense, useState } from "react";
import { connect } from "react-redux";
import cx from "classnames";
import { withRouter, Switch, Route, Redirect } from "react-router-dom";
import Loader from "react-loaders";

import { ToastContainer } from "react-toastify";

// Pages

import ResizeDetector from "react-resize-detector";

import { unregister } from "../../serviceWorker";

import "firebase/storage";
import "firebase/firestore";
import "firebase/analytics";
import "firebase/performance";

import firebase from "firebase/app";

import Privacy from "../../Pages/Dashboards/PrivacyPolicy/";
import Terms from "../../Pages/Dashboards/TermsOfService/";
// Layout

import AppHeader from "../../Layout/AppHeader/";
import AppSidebar from "../../Layout/AppSidebar/";

// Theme Options
import ThemeOptions from "../../Layout/ThemeOptions/";

import {
  FacebookShareButton,
  LinkedinShareButton,
  TwitterShareButton,
  TelegramShareButton,
  WhatsappShareButton,
  RedditShareButton,
  EmailShareButton,
  TumblrShareButton,
  FacebookIcon,
  TwitterIcon,
  LinkedinIcon,
  TelegramIcon,
  WhatsappIcon,
  RedditIcon,
  TumblrIcon,
  EmailIcon,
} from "react-share";

const HomeDashboard = lazy(() =>
  retry(() => import("../../Pages/Dashboards/Home/"))
);

const AccountPage = lazy(() =>
  retry(() => import("../../Pages/Dashboards/Account/"))
);

const Contact = lazy(() =>
  retry(() => import("../../Pages/Dashboards/Contact/"))
);

const Writing = lazy(() =>
  retry(() => import("../../Pages/Dashboards/Writing/"))
);

const Menu = lazy(() => retry(() => import("../../Pages/Dashboards/Menu/")));

function retry(fn, retriesLeft = 5, interval = 1000) {
  return new Promise((resolve, reject) => {
    fn()
      .then(resolve)
      .catch((error) => {
        setTimeout(() => {
          if (retriesLeft === 1) {
            // reject('maximum retries exceeded');
            reject(error);
            return;
          }

          // Passing on "reject" is the important part
          retry(fn, retriesLeft - 1, interval).then(resolve, reject);
        }, interval);
      });
  });
}

let shareUrl = "https://AaRoots.com/";
let title = "Feed Yourself Healthy With A'a Roots.";

class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      closedSmallerSidebar: false,
      hasLoaded: 1,
    };
  }

  componentDidMount() {
    window.addEventListener("popstate", () => {
      window.dispatchEvent(new Event("locationchange"));
    });
    const defaultAnalytics = firebase.analytics();
    firebase.performance();
    this.toggle1();

    window.addEventListener("locationchange", this.toggle1, false);

    document.body.addEventListener("click", async function (e) {
      const cityRef = firebase
        .firestore()
        .collection("totalClicks")
        .doc("value");

      try {
        await firebase.firestore().runTransaction(async (t) => {
          const doc = await t.get(cityRef);

          const newPopulation = doc.data().population + 1;
          t.update(cityRef, { population: newPopulation });
        });
      } catch (e) {
        console.log("Transaction failure:", e);
      }
    });
  }

  componentWillUnmount() {
    document.removeEventListener("popstate", this.toggle1.bind(this), false);
  }

  async toggle1() {
    window.scrollTo(0, 0);
    const cityRef = firebase.firestore().collection("totalHits").doc("value");

    try {
      await firebase.firestore().runTransaction(async (t) => {
        const doc = await t.get(cityRef);

        const newPopulation = doc.data().population + 1;
        t.update(cityRef, { population: newPopulation });
      });
    } catch (e) {
      console.log("Transaction failure:", e);
    }

    let concData = [];
    let concData2 = [];
    let concData3 = [];
    try {
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
      const snapshot = await firebase.firestore().collection("version").get();

      snapshot.forEach(async function (doc) {
        concData = doc.data();
        console.log(concData.version);
        if (concData.version) {
          if (!localStorage.getItem("appVersion")) {
            localStorage.setItem("appVersion", concData.version);
          } else if (localStorage.getItem("appVersion") != concData.version) {
            function iOS() {
              return (
                [
                  "iPad Simulator",
                  "iPhone Simulator",
                  "iPod Simulator",
                  "iPad",
                  "iPhone",
                  "iPod",
                ].includes(navigator.platform) ||
                // iPad on iOS 13 detection
                (navigator.userAgent.includes("Mac") &&
                  "ontouchend" in document)
              );
            }
            if (!iOS) {
              var caches;
              if (caches) {
                caches.keys().then(function (names) {
                  for (let name of names) caches.delete(name);
                });
                localStorage.setItem("appVersion", concData.version);
              }
              unregister();
              window.location.reload(true);
            }
          }
        }
      });
    } catch (error) {}
  }

  render() {
    let {
      colorScheme,
      enableFixedHeader,
      enableFixedSidebar,
      enableFixedFooter,
      enableClosedSidebar,
      closedSmallerSidebar,
      enableMobileMenu,
      enablePageTabsAlt,
    } = this.props;

    return (
      <ResizeDetector
        handleWidth
        render={({ width }) => (
          <Fragment>
            <div
              className={cx(
                "app-container app-theme-" + colorScheme,
                { "fixed-header": enableFixedHeader },
                { "fixed-sidebar": enableFixedSidebar || width < 1250 },
                { "fixed-footer": enableFixedFooter },
                { "closed-sidebar": enableClosedSidebar || width < 1250 },
                {
                  "closed-sidebar-mobile": closedSmallerSidebar || width < 1250,
                },
                { "sidebar-mobile-open": enableMobileMenu },
                { "body-tabs-shadow-btn": enablePageTabsAlt }
              )}
            >
              <ThemeOptions />
              <AppHeader />
              <div className="app-main">
                <AppSidebar />
                <div className="app-main__outer">
                  <div className="app-main__inner">
                    <Switch>
                      <Route exact path="/" component={HomeDashboard} />
                      <Route exact path="/home" component={HomeDashboard} />
                      <Route path={`/menu`} component={Menu} />
                      <Route path={`/account`} component={AccountPage} />
                      <Route path={`/contact`} component={Contact} />
                      <Route path={`/about`} component={Writing} />
                      <Route path={`/privacy`} component={Privacy} />
                      <Route path={`/termsofservice`} component={Terms} />
                    </Switch>
                    <br />

                    <div id="footer">
                      <span
                        style={{
                          width: "100%",
                          textAlign: "center",
                          float: "center",
                          position: "relative",
                          bottom: "0",
                        }}
                      >
                        <div
                          className="FooterText"
                          style={{
                            width: "100%",
                            textAlign: "center",
                            float: "center",
                            position: "relative",
                            bottom: "-10px",
                          }}
                        >
                          &nbsp;
                          <b>a'a Roots : Maui's Best Vegan Experience</b>
                          <br />
                          <span className="Demo__some-network">
                            <FacebookShareButton
                              url={shareUrl}
                              quote={title}
                              className="Demo__some-network__share-button"
                            >
                              <FacebookIcon size={32} round />
                            </FacebookShareButton>
                          </span>
                          &nbsp;
                          <span className="Demo__some-network">
                            <TwitterShareButton
                              url={shareUrl}
                              title={title}
                              className="Demo__some-network__share-button"
                            >
                              <TwitterIcon size={32} round />
                            </TwitterShareButton>
                          </span>
                          &nbsp;
                          <span className="Demo__some-network">
                            <TelegramShareButton
                              url={shareUrl}
                              title={title}
                              className="Demo__some-network__share-button"
                            >
                              <TelegramIcon size={32} round />
                            </TelegramShareButton>
                          </span>
                          &nbsp;
                          <span className="Demo__some-network">
                            <WhatsappShareButton
                              url={shareUrl}
                              title={title}
                              separator=":: "
                              className="Demo__some-network__share-button"
                            >
                              <WhatsappIcon size={32} round />
                            </WhatsappShareButton>
                          </span>
                          &nbsp;
                          <span className="Demo__some-network">
                            <LinkedinShareButton
                              url={shareUrl}
                              className="Demo__some-network__share-button"
                            >
                              <LinkedinIcon size={32} round />
                            </LinkedinShareButton>
                          </span>
                          &nbsp;
                          <span className="Demo__some-network">
                            <RedditShareButton
                              url={shareUrl}
                              title={title}
                              windowWidth={660}
                              windowHeight={460}
                              className="Demo__some-network__share-button"
                            >
                              <RedditIcon size={32} round />
                            </RedditShareButton>
                          </span>
                          &nbsp;
                          <span className="Demo__some-network">
                            <TumblrShareButton
                              url={shareUrl}
                              title={title}
                              className="Demo__some-network__share-button"
                            >
                              <TumblrIcon size={32} round />
                            </TumblrShareButton>
                          </span>
                          &nbsp;
                          <span className="Demo__some-network">
                            <EmailShareButton
                              url={shareUrl}
                              subject={title}
                              body="body"
                              className="Demo__some-network__share-button"
                            >
                              <EmailIcon size={32} round />
                            </EmailShareButton>
                          </span>
                        </div>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <ToastContainer />
            </div>{" "}

          </Fragment>
        )}
      />
    );
  }
}

const mapStateToProp = (state) => ({
  colorScheme: state.ThemeOptions.colorScheme,
  enableFixedHeader: state.ThemeOptions.enableFixedHeader,
  enableMobileMenu: state.ThemeOptions.enableMobileMenu,
  enableFixedFooter: state.ThemeOptions.enableFixedFooter,
  enableFixedSidebar: state.ThemeOptions.enableFixedSidebar,
  enableClosedSidebar: state.ThemeOptions.enableClosedSidebar,
  enablePageTabsAlt: state.ThemeOptions.enablePageTabsAlt,
});

export default withRouter(connect(mapStateToProp)(Main));
