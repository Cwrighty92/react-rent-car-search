import React from "react";
import { shallow } from "enzyme";
import axios from "axios";
import SearchForm from "./search-form";
import { render, fireEvent, cleanup } from "@testing-library/react";

describe("search form tests", () => {
  const SearchFormComponent = shallow(<SearchForm />);

  beforeEach(() => {
    jest.clearAllMocks();
  });

  afterEach(cleanup);

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

  it("should render empty ul when no search results", () => {
    expect(SearchFormComponent.find("ul").children().length).toBe(0);
    expect(SearchFormComponent.find("li").length).toBe(0);
  });

  it("should make request when characters are 2", async () => {
    const axiosGetSpy = jest.spyOn(axios, "get").mockResolvedValueOnce({
      data: { results: { docs: [{ name: "test" }] } }
    });
    const { getByTestId } = render(<SearchForm />);

    fireEvent.change(getByTestId("input"), { target: { value: "ma" } });

    expect(axiosGetSpy).toBeCalledWith(
      "https://www.rentalcars.com/FTSAutocomplete.do?solrIndex=fts_en&solrRows=6&solrTerm=ma"
    );
  });

  it("should not make request when value is less than 2", () => {
    const utils = render(<SearchForm />);
    const input = utils.getByTestId("input");

    const axiosGetSpy2 = jest.spyOn(axios, "get").mockResolvedValueOnce({
      data: { results: { docs: [{ name: "test" }] } }
    });

    fireEvent.change(input, { target: { value: "m" } });

    expect(axiosGetSpy2).not.toHaveBeenCalled();
  });
});
