import React from "react";

const PlaceTypes = {
  C: "City",
  A: "Airport",
  T: "Station",
  F: "Region",
  D: "District",
  G: "Place"
};

const PlacesList = ({ results }) => {
  return (
    <ul>
      {results.map(item => (
        <li className="search-item" key={item.index + item.placeKey}>
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
