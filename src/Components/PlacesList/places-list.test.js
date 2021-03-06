import React from "react";
import { shallow } from "enzyme";
import PlacesList from "./places-list";

describe("Places list tests", () => {
  const testResults = [
    { name: "Picadilly Sta", country: "Uk", index: 0, placeType: "T" },
    { name: "Alton Towers", country: "Uk", index: 1, placeType: "G" }
  ];

  it("should render empty ul when no search results", () => {
    const PlacesListComponent = shallow(<PlacesList results={[]} />);

    expect(PlacesListComponent.find("ul").children().length).toBe(0);
  });

  it("should render no results found if no matching results", () => {
    const PlacesListComponent = shallow(
      <PlacesList results={[{ name: "No results found", index: 0 }]} />
    );
    const listItem = PlacesListComponent.find("li").at(0);

    expect(listItem.text()).toBe("No results found ");
  });

  it("should render list items when search results passed", () => {
    const PlacesListComponent = shallow(<PlacesList results={testResults} />);
    const listItem1 = PlacesListComponent.find("li").at(0);
    const listItem2 = PlacesListComponent.find("li").at(1);

    expect(PlacesListComponent.find("ul").children().length).toBe(2);

    expect(
      listItem1
        .find("div")
        .at(1)
        .text()
    ).toBe("Picadilly Sta Uk");

    expect(
      listItem1
        .find("div")
        .at(0)
        .text()
    ).toBe("Station");

    expect(
      listItem2
        .find("div")
        .at(1)
        .text()
    ).toBe("Alton Towers Uk");

    expect(
      listItem2
        .find("div")
        .at(0)
        .text()
    ).toBe("Place");
  });

  it("should render no results found if no matching results", () => {
    const setValue = jest.fn();
    const PlacesListComponent = shallow(
      <PlacesList results={testResults} setValue={setValue} />
    );

    PlacesListComponent.find(".search-item")
      .at(0)
      .simulate("click");

    expect(setValue).toHaveBeenCalledWith("Picadilly Sta");
  });
});
