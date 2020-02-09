import axios from "axios";
import { renderHook } from "@testing-library/react-hooks";
import UseFetch from "./use-fetch";

describe("use fetch custom hook tests", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("test valid search term makes api call", async () => {
    const axiosGetSpy = jest.spyOn(axios, "get").mockResolvedValueOnce({
      data: { results: { docs: [{ name: "test" }] } }
    });

    const { waitForNextUpdate } = renderHook(() => UseFetch("test"));

    waitForNextUpdate();

    expect(axiosGetSpy).toBeCalledWith(
      "https://www.rentalcars.com/FTSAutocomplete.do?solrIndex=fts_en&solrRows=6&solrTerm=test"
    );
  });

  test("when search term is empty", async () => {
    const axiosGetSpy = jest.spyOn(axios, "get").mockResolvedValueOnce({
      data: { results: { docs: [{ name: "test" }] } }
    });

    renderHook(() => UseFetch(""));

    expect(axiosGetSpy).not.toHaveBeenCalled();
  });

  test("when search term is one chacter", async () => {
    const axiosGetSpy = jest.spyOn(axios, "get").mockResolvedValueOnce({
      data: { results: { docs: [{ name: "test" }] } }
    });

    renderHook(() => UseFetch("L"));

    expect(axiosGetSpy).not.toHaveBeenCalled();
  });
});
