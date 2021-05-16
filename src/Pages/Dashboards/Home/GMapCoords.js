import React, { Component } from "react";
import GoogleMapReact from "google-map-react";
import { getLatLng, geocodeByAddress } from "react-places-autocomplete";

var GMAPAPI = process.env.REACT_APP_GMAPAPI;

class SimpleMap extends Component {
  constructor(props) {
    super(props);
    this.state = { oneLoadCount: 0, prevCoordsCount: 0 };
    this.markerClick = this.markerClick.bind(this);
    this.checkForEnteredListing = this.checkForEnteredListing.bind(this);
  }
  static defaultProps = {
    center: {
      lat: 20.79,
      lng: 203.7,
    },
    zoom: 10,
  };

  markerClick() {
    window.location.pathname = "/account";
  }

  checkForEnteredListing() {
    if (localStorage.getItem("LocationDataCoords") !== "") {
      if (this.state.oneLoadCount < 1) {
        console.log(String(localStorage.getItem("LocationDataCoords")));
        var marker;
        function initMap() {
          const map = new google.maps.Map(document.getElementById("map"), {
            center: {
              lat: 20.79,
              lng: 203.7,
            },
            zoom: 7,
          });

          function placeMarker(location) {
            if (marker == null) {
              marker = new google.maps.Marker({
                position: location,
                map: map,
              });
            } else {
            }
          }

          geocodeByAddress(localStorage.getItem("LocationDataCoords"))
            .then((results) => getLatLng(results[0]))
            .then((latLng) => console.log(placeMarker(latLng)))
            .catch((error) => console.error("Error", error));
        }

        initMap();
        console.log("GMap Load");
        this.setState({ oneLoadCount: 1 });
        this.setState({
          prevCoordsCount: localStorage.getItem("LocationDataCoords"),
        });
      }
      if (
        this.state.prevCoordsCount ===
        localStorage.getItem("LocationDataCoords")
      ) {
      } else {
        this.setState({ oneLoadCount: 0 });
      }
    }
  }
  componentDidMount() {
    let intervalId = setInterval(() => {
      this.checkForEnteredListing();
    }, 1000);
    this.setState({ intervalId: intervalId });
  }

  componentWillUnmount() {
    localStorage.setItem("LocationData", "");
    localStorage.setItem("LocationDataCoords", "");
    clearInterval(this.state.intervalId);
    document.removeEventListener(
      "click",
      this.checkForEnteredListing.bind(this),
      true
    );
    this.setState({ oneLoadCount: 0 });
  }

  handleApiLoaded = (map, maps) => {
    var marker;
    function initMap() {
      const map = new google.maps.Map(document.getElementById("map"), {
        center: {
          lat: 20.79,
          lng: 203.7,
        },
        zoom: 7,
      });

      var geocoder = new google.maps.Geocoder();
      map.addListener("click", function (e) {
        placeMarker(e.latLng, map);
      });

      function placeMarker(location) {
        if (marker == null) {
          marker = new google.maps.Marker({
            position: location,
            map: map,
          });
        } else {
          marker.setPosition(location);
        }
      }
      google.maps.event.addListener(map, "click", function (event) {
        placeMarker(event.latLng);
        geocoder.geocode(
          {
            latLng: event.latLng,
          },
          function (results, status) {
            if (status == google.maps.GeocoderStatus.OK) {
              if (results[0]) {
                localStorage.setItem(
                  "LocationData",
                  results[0].formatted_address
                );
              }
            }
            localStorage.setItem(
              "LocationDataCoords",
              String(
                JSON.stringify(String(event.latLng), null, 2)
                  .replace(/[()]/g, "")
                  .replace(/[""]/g, "")
              )
            );
          }
        );
      });
      const card = document.getElementById("pac-card");
      const input = document.getElementById("pac-input");
      map.controls[google.maps.ControlPosition.TOP_RIGHT].push(card);
      const autocomplete = new google.maps.places.Autocomplete(input);
      // Bind the map's bounds (viewport) property to the autocomplete object,
      // so that the autocomplete requests use the current map bounds for the
      // bounds option in the request.
      autocomplete.bindTo("bounds", map);
      // Set the data fields to return when the user selects a place.
      autocomplete.setFields([
        "address_components",
        "geometry",
        "icon",
        "name",
      ]);
      const infowindow = new google.maps.InfoWindow();
      const infowindowContent = document.getElementById("infowindow-content");
      infowindow.setContent(infowindowContent);
      const marker = new google.maps.Marker({
        map,
        anchorPoint: new google.maps.Point(20, 203),
      });
      autocomplete.addListener("place_changed", () => {
        infowindow.close();
        marker.setVisible(false);
        const place = autocomplete.getPlace();

        if (!place.geometry) {
          // User entered the name of a Place that was not suggested and
          // pressed the Enter key, or the Place Details request failed.
          window.alert("No details available for input: '" + place.name + "'");
          return;
        }

        // If the place has a geometry, then present it on a map.
        if (place.geometry.viewport) {
          map.fitBounds(place.geometry.viewport);
        } else {
          map.setCenter(place.geometry.location);
          map.setZoom(17); // Why 17? Because it looks good.
        }
        marker.setPosition(place.geometry.location);
        marker.setVisible(true);
        let address = "";

        if (place.address_components) {
          address = [
            (place.address_components[0] &&
              place.address_components[0].short_name) ||
              "",
            (place.address_components[1] &&
              place.address_components[1].short_name) ||
              "",
            (place.address_components[2] &&
              place.address_components[2].short_name) ||
              "",
          ].join(" ");
        }
        infowindowContent.children["place-icon"].src = place.icon;
        infowindowContent.children["place-name"].textContent = place.name;
        infowindowContent.children["place-address"].textContent = address;
        infowindow.open(map, marker);
      });

      // Sets a listener on a radio button to change the filter type on Places
      // Autocomplete.
    }
    initMap();
    console.log("GMap Load");
  };
  render() {
    const AnyReactComponent = ({ text }) => (
      <button
        className="maptxt"
        style={{ height: "25px" }}
        type="button"
        onClick={this.markerClick}
      >
        {text}
      </button>
    );

    return (
      // Important! Always set the container height explicitly
      <div style={{ height: "40vh", width: "100%" }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: GMAPAPI }}
          defaultCenter={this.props.center}
          defaultZoom={this.props.zoom}
          yesIWantToUseGoogleMapApiInternals
          onGoogleApiLoaded={({ map, maps }) => this.handleApiLoaded(map, maps)}
        ></GoogleMapReact>
      </div>
    );
  }
}

export default SimpleMap;
