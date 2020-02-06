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
  const [hoverItem, updateHoverItem] = React.useState("");

  const getClass = itemIndex => {
    if (itemIndex === hoverItem) return "search-item hover-search";
    return "search-item";
  };
  return (
    <ul>
      {results.map(item => (
        <li
          className={getClass(item.index)}
          key={item.index + item.placeKey}
          onMouseEnter={() => updateHoverItem(item.index)}
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
