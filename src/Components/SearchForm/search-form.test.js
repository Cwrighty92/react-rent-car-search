import React from "react";
import { shallow } from "enzyme";
import SearchForm from "./search-form";

describe("search form tests", () => {
  const SearchFormComponent = shallow(<SearchForm />);
  it("Should render component correctly", () => {
    expect(SearchFormComponent.find("form").length).toBe(1);
    expect(SearchFormComponent.find("h2").text()).toBe(
      "Let’s find your ideal car"
    );
    expect(SearchFormComponent.find("label").text()).toBe("Pick-up Location");
  });

  it("renders search section correctly", () => {
    expect(
      SearchFormComponent.find("div").hasClass("search-section")
    ).toBeTruthy();
    expect(SearchFormComponent.find("input").prop("placeholder")).toBe(
      "city, airport, station, region, district..."
    );
  });
});
