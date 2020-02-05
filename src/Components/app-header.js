import React from "react";
import "./app-header.css";

const AppHeader = () => {
  return (
    <div className="app-header">
      <header className="rental-car-header">
        <img
          class="rental-image"
          src="https://cdn2.rcstatic.com/com.rentalcars.185492029745.eu-west-1.web.prod.static-live/images/header/logo_white.svg"
          alt="Car Hire - Rentalcars.com"
        ></img>
      </header>
      <div className="line">{""}</div>
      <div className="hero">
        <h1 className="car-hire">Car Hire - Search, Compare & Save</h1>
      </div>
    </div>
  );
};

export default AppHeader;
