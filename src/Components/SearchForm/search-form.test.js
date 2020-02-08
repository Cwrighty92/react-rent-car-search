import React from "react";
import { shallow } from "enzyme";
import axios from "axios";
import SearchForm from "./search-form";
import { render, fireEvent, cleanup, act, wait } from "@testing-library/react";
import useDebounce from "../use-debouncer";

jest.mock("../use-debouncer");

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

  it("should make request when characters are 2 or more", async () => {
    const axiosGetSpy = jest.spyOn(axios, "get").mockResolvedValueOnce({
      data: { results: { docs: [{ name: "test" }] } }
    });

    useDebounce.mockReturnValueOnce("Manchester");

    const { getByTestId } = render(<SearchForm />);
    fireEvent.change(getByTestId("input"), { target: { value: "ma" } });

    expect(axiosGetSpy).toBeCalledWith(
      "https://www.rentalcars.com/FTSAutocomplete.do?solrIndex=fts_en&solrRows=6&solrTerm=Manchester"
    );
  });

  it("should not make request when value is less than 2", () => {
    const utils = render(<SearchForm />);
    const input = utils.getByTestId("input");

    useDebounce.mockReturnValueOnce("M");
    const axiosGetSpy2 = jest.spyOn(axios, "get").mockResolvedValueOnce({
      data: { results: { docs: [{ name: "test" }] } }
    });

    fireEvent.change(input, { target: { value: "m" } });

    expect(axiosGetSpy2).not.toHaveBeenCalled();
  });

  it("should not make request when debouncer is falsey", () => {
    const utils = render(<SearchForm />);
    const input = utils.getByTestId("input");

    useDebounce.mockReturnValueOnce("");
    const axiosGetSpy2 = jest.spyOn(axios, "get").mockResolvedValueOnce({
      data: { results: { docs: [{ name: "test" }] } }
    });

    fireEvent.change(input, { target: { value: "ma" } });

    expect(axiosGetSpy2).not.toHaveBeenCalled();
  });
});
