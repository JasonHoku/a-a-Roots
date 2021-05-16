import React from "react";
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from "react-places-autocomplete";
var GMAPAPI = process.env.REACT_APP_GMAPAPI;

class LocationSearchInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = { address: "" };
  }

  handleChange = (address) => {
    this.setState({ address });
  };

  handleSelect = (address) => {
    geocodeByAddress(address)
      .then((results) =>
        getLatLng(results[0]).then((latLng) =>
          localStorage.setItem(
            "LocationDataCoords",
            Array(String(
              JSON.stringify(latLng)
                .replace(/[()]/g, "")
                .replace(/[""]/g, "")
                .replace(/[{}]/g, "")
                .replace(/[lat:]/g, "")
                .replace(/[long:]/g, "")
            ))
          )
        )
      )

      .then((latLng) => localStorage.setItem("LocationData", (latLng, address)))

      .catch((error) => console.error("Error", error));
  };
  render() {
    let suggestions = [
      {
        active: false,
        description: "San Francisco, CA, USA",
        formattedSuggestion: {
          mainText: "San Francisco",
          secondaryText: "CA, USA",
        },
        id: "1b9ea3c094d3ac23c9a3afa8cd4d8a41f05de50a",
        index: 0,
        matchedSubstrings: [{ length: 8, offset: 0 }],
        placeId: "ChIJIQBpAG2ahYAR_6128GcTUEo",
        terms: [
          { offset: 0, value: "San Francisco" },
          { offset: 15, value: "CA" },
          { offset: 19, value: "USA" },
        ],
        types: ["locality", "political", "geocode"],
      },
    ];
    return (
      <PlacesAutocomplete
        value={this.state.address}
        onChange={this.handleChange}
        onSelect={this.handleSelect}
      >
        {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
          <div>
            <input
              {...getInputProps({
                placeholder: "Search Places ...",
                className: "location-search-input",
              })}
            />
            <div className="autocomplete-dropdown-container">
              {loading && <div>Loading...</div>}
              {suggestions.map((suggestion) => {
                const className = suggestion.active
                  ? "suggestion-item--active"
                  : "suggestion-item";
                // inline style for demonstration purpose
                const style = suggestion.active
                  ? { backgroundColor: "#fafafa", cursor: "pointer" }
                  : { backgroundColor: "#ffffff", cursor: "pointer" };
                return (
                  <div
                    {...getSuggestionItemProps(suggestion, {
                      className,
                      style,
                    })}
                  >
                    <span>{suggestion.description}</span>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </PlacesAutocomplete>
    );
  }
}
export default LocationSearchInput;
