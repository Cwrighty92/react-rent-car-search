import React from "react";
import "./app-header.css";

const AppHeader = () => {
  return (
    <header className="app-header">
      <img
        className="rental-image"
        src="https://cdn2.rcstatic.com/com.rentalcars.185492029745.eu-west-1.web.prod.static-live/images/header/logo_white.svg"
        alt="Car Hire - Rentalcars.com"
      />
      <div className="line-seperator" />
      <h1 className="car-hire-title">{"Car Hire - Search, Compare & Save"}</h1>
    </header>
  );
};

export default AppHeader;
