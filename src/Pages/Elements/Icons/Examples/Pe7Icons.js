import React, { Fragment } from "react";
import CSSTransitionGroup from "react-transition-group/CSSTransitionGroup";
import { Row, Col, Card, CardBody, CardTitle, Container } from "reactstrap";

const iconData = [
  "fa fa-album",
  "fa fa-arc",
  "fa fa-back-2",
  "fa fa-bandaid",
  "fa fa-car",
  "fa fa-diamond",
  "fa fa-door-lock",
  "fa fa-eyedropper",
  "fa fa-female",
  "fa fa-gym",
  "fa fa-hammer",
  "fa fa-headphones",
  "fa fa-helm",
  "fa fa-hourglass",
  "fa fa-leaf",
  "fa fa-magic-wand",
  "fa fa-male",
  "fa fa-map-2",
  "fa fa-next-2",
  "fa fa-paint-bucket",
  "fa fa-pendrive",
  "fa fa-photo",
  "fa fa-piggy",
  "fa fa-plugin",
  "fa fa-refresh-2",
  "fa fa-rocket",
  "fa fa-settings",
  "fa fa-shield",
  "fa fa-smile",
  "fa fa-usb",
  "fa fa-vector",
  "fa fa-wine",
  "fa fa-cloud-upload",
  "fa fa-cash",
  "fa fa-close",
  "fa fa-bluetooth",
  "fa fa-cloud-download",
  "fa fa-way",
  "fa fa-close-circle",
  "fa fa-id",
  "fa fa-angle-up",
  "fa fa-wristwatch",
  "fa fa-angle-up-circle",
  "fa fa-world",
  "fa fa-angle-right",
  "fa fa-volume",
  "fa fa-angle-right-circle",
  "fa fa-users",
  "fa fa-angle-left",
  "fa fa-user-female",
  "fa fa-angle-left-circle",
  "fa fa-up-arrow",
  "fa fa-angle-down",
  "fa fa-switch",
  "fa fa-angle-down-circle",
  "fa fa-scissors",
  "fa fa-wallet",
  "fa fa-safe",
  "fa fa-volume2",
  "fa fa-volume1",
  "fa fa-voicemail",
  "fa fa-video",
  "fa fa-user",
  "fa fa-upload",
  "fa fa-unlock",
  "fa fa-umbrella",
  "fa fa-trash",
  "fa fa-tools",
  "fa fa-timer",
  "fa fa-ticket",
  "fa fa-target",
  "fa fa-sun",
  "fa fa-study",
  "fa fa-stopwatch",
  "fa fa-star",
  "fa fa-speaker",
  "fa fa-signal",
  "fa fa-shuffle",
  "fa fa-shopbag",
  "fa fa-share",
  "fa fa-server",
  "fa fa-search",
  "fa fa-film",
  "fa fa-science",
  "fa fa-disk",
  "fa fa-ribbon",
  "fa fa-repeat",
  "fa fa-refresh",
  "fa fa-add-user",
  "fa fa-refresh-cloud",
  "fa fa-paperclip",
  "fa fa-radio",
  "fa fa-note2",
  "fa fa-print",
  "fa fa-network",
  "fa fa-prev",
  "fa fa-mute",
  "fa fa-power",
  "fa fa-medal",
  "fa fa-portfolio",
  "fa fa-like2",
  "fa fa-plus",
  "fa fa-left-arrow",
  "fa fa-play",
  "fa fa-key",
  "fa fa-plane",
  "fa fa-joy",
  "fa fa-photo-gallery",
  "fa fa-pin",
  "fa fa-phone",
  "fa fa-plug",
  "fa fa-pen",
  "fa fa-right-arrow",
  "fa fa-paper-plane",
  "fa fa-delete-user",
  "fa fa-paint",
  "fa fa-bottom-arrow",
  "fa fa-notebook",
  "fa fa-note",
  "fa fa-next",
  "fa fa-news-paper",
  "fa fa-musiclist",
  "fa fa-music",
  "fa fa-mouse",
  "fa fa-more",
  "fa fa-moon",
  "fa fa-monitor",
  "fa fa-micro",
  "fa fa-menu",
  "fa fa-map",
  "fa fa-map-marker",
  "fa fa-mail",
  "fa fa-mail-open",
  "fa fa-mail-open-file",
  "fa fa-magnet",
  "fa fa-loop",
  "fa fa-look",
  "fa fa-lock",
  "fa fa-lintern",
  "fa fa-link",
  "fa fa-like",
  "fa fa-light",
  "fa fa-less",
  "fa fa-keypad",
  "fa fa-junk",
  "fa fa-info",
  "fa fa-home",
  "fa fa-help2",
  "fa fa-help1",
  "fa fa-graph3",
  "fa fa-graph2",
  "fa fa-graph1",
  "fa fa-graph",
  "fa fa-global",
  "fa fa-gleam",
  "fa fa-glasses",
  "fa fa-gift",
  "fa fa-folder",
  "fa fa-flag",
  "fa fa-filter",
  "fa fa-file",
  "fa fa-expand1",
  "fa fa-exapnd2",
  "fa fa-edit",
  "fa fa-drop",
  "fa fa-drawer",
  "fa fa-download",
  "fa fa-display2",
  "fa fa-display1",
  "fa fa-diskette",
  "fa fa-date",
  "fa fa-cup",
  "fa fa-culture",
  "fa fa-crop",
  "fa fa-credit",
  "fa fa-copy-file",
  "fa fa-config",
  "fa fa-compass",
  "fa fa-comment",
  "fa fa-coffee",
  "fa fa-cloud",
  "fa fa-clock",
  "fa fa-check",
  "fa fa-chat",
  "fa fa-cart",
  "fa fa-camera",
  "fa fa-call",
  "fa fa-calculator",
  "fa fa-browser",
  "fa fa-box2",
  "fa fa-box1",
  "fa fa-bookmarks",
  "fa fa-bicycle",
  "fa fa-bell",
  "fa fa-battery",
  "fa fa-ball",
  "fa fa-back",
  "fa fa-attention",
  "fa fa-anchor",
  "fa fa-albums",
  "fa fa-alarm",
  "fa fa-airplay",
];

const Pe7IconsExamples = () => (
  <Fragment>
    <CSSTransitionGroup component="div" transitionName="TabsAnimation" transitionAppear={true}
      transitionAppearTimeout={0} transitionEnter={false} transitionLeave={false}>
      <Container fluid>
        <Row>
          <Col md="12">
            <Card className="main-card mb-3">
              <CardBody>
                <CardTitle>Gradient Icons</CardTitle>
                <div className="font-icon-wrapper font-icon-lg">
                  <i className="fa fa-filter icon-gradient bg-warm-flame"> </i>
                </div>
                <div className="font-icon-wrapper font-icon-lg">
                  <i className="fa fa-help1 icon-gradient bg-night-fade"> </i>
                </div>
                <div className="font-icon-wrapper font-icon-lg">
                  <i className="fa fa-moon icon-gradient bg-sunny-morning"> </i>
                </div>
                <div className="font-icon-wrapper font-icon-lg">
                  <i className="fa fa-plane icon-gradient bg-tempting-azure"> {" "} </i>
                </div>
                <div className="font-icon-wrapper font-icon-lg">
                  <i className="fa fa-box2 icon-gradient bg-amy-crisp"> </i>
                </div>
                <div className="font-icon-wrapper font-icon-lg">
                  <i className="fa fa-lock icon-gradient bg-malibu-beach"> </i>
                </div>
                <div className="font-icon-wrapper font-icon-lg">
                  <i className="fa fa-monitor icon-gradient bg-mean-fruit"> </i>
                </div>
                <div className="font-icon-wrapper font-icon-lg">
                  <i className="fa fa-mouse icon-gradient bg-heavy-rain"> </i>
                </div>
                <div className="font-icon-wrapper font-icon-lg">
                  <i className="fa fa-paint icon-gradient bg-arielle-smile"> {" "} </i>
                </div>
                <div className="font-icon-wrapper font-icon-lg">
                  <i className="fa fa-menu icon-gradient bg-ripe-malin"> </i>
                </div>
                <div className="font-icon-wrapper font-icon-lg">
                  <i className="fa fa-wristwatch icon-gradient bg-deep-blue"> {" "}</i>
                </div>
                <div className="font-icon-wrapper font-icon-lg">
                  <i className="fa fa-volume2 icon-gradient bg-happy-itmeo"> {" "} </i>
                </div>
                <div className="font-icon-wrapper font-icon-lg">
                  <i className="fa fa-video icon-gradient bg-happy-fisher"> </i>
                </div>
                <div className="font-icon-wrapper font-icon-lg">
                  <i className="fa fa-wallet icon-gradient bg-plum-plate"> </i>
                </div>
                <div className="font-icon-wrapper font-icon-lg">
                  <i className="fa fa-paint-bucket icon-gradient bg-grow-early"> {" "} </i>
                </div>
                <div className="font-icon-wrapper font-icon-lg">
                  <i className="fa fa-diamond icon-gradient bg-strong-bliss"> {" "} </i>
                </div>
                <div className="font-icon-wrapper font-icon-lg">
                  <i className="fa fa-magic-wand icon-gradient bg-mixed-hopes"> {" "} </i>
                </div>
                <div className="font-icon-wrapper font-icon-lg">
                  <i className="fa fa-arc icon-gradient bg-premium-dark"> </i>
                </div>
                <div className="font-icon-wrapper font-icon-lg">
                  <i className="fa fa-hourglass icon-gradient bg-love-kiss"> {" "} </i>
                </div>
              </CardBody>
            </Card>
          </Col>
          <Col md="12">
            <Card className="main-card mb-3">
              <CardBody>
                <Row>
                  {iconData.map((iconName) => (
                    <Col md="2" key={iconName}>
                      <div className="font-icon-wrapper">
                        <i className={iconName}> </i>
                        <p>{iconName}</p>
                      </div>
                    </Col>
                  ))}
                </Row>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </CSSTransitionGroup>
  </Fragment>
);

export default Pe7IconsExamples;
