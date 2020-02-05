import React from "react";
import { shallow } from "enzyme";

import AppHeader from "./app-header";

describe("app-header tests", () => {
  const AppHeaderComponent = shallow(<AppHeader />);

  it("Should render component correctly", () => {
    expect(
      AppHeaderComponent.find("div")
        .at(0)
        .hasClass("app-header")
    ).toBeTruthy();

    expect(
      AppHeaderComponent.find("div")
        .at(1)
        .hasClass("line")
    ).toBeTruthy();

    expect(
      AppHeaderComponent.find("div")
        .at(2)
        .hasClass("hero")
    ).toBeTruthy();
  });

  it("renders image with correct props", () => {
    expect(AppHeaderComponent.find("img").props()).toStrictEqual({
      alt: "Car Hire - Rentalcars.com",
      class: "rental-image",
      src:
        "https://cdn2.rcstatic.com/com.rentalcars.185492029745.eu-west-1.web.prod.static-live/images/header/logo_white.svg"
    });
  });

  it("should render h1 element text correctly", () => {
    expect(AppHeaderComponent.find("h1").text()).toBe(
      "Car Hire - Search, Compare & Save"
    );
  });
});
