import React from "react";
import "./places-list.css";

const PlaceTypes = {
  C: "City",
  A: "Airport",
  T: "Station",
  F: "Region",
  D: "District",
  G: "Place"
};

const PlacesList = ({ results, setValue }) => {
  return (
    <ul className="places-list">
      {results.map(item => (
        <li
          className="search-item"
          key={item.index}
          onClick={() => setValue(item.name)}
        >
          <div>{PlaceTypes[item.placeType]}</div>
          <div>
            {item.name} {item.country}
          </div>
        </li>
      ))}
    </ul>
  );
};

export default PlacesList;
