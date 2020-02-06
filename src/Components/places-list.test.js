import React from "react";
import { shallow } from "enzyme";
import PlacesList from "./places-list";

describe("Places list tests", () => {
  const testResults = [
    {
      name: "Picadilly Station",
      country: "Uk",
      placeKey: 12312,
      placeType: "T"
    },
    { name: "Alton Towers", country: "Uk", placeKey: 12314, placeType: "G" }
  ];
  it("should render empty ul when no search results", () => {
    const PlacesListComponent = shallow(<PlacesList results={[]} />);

    expect(PlacesListComponent.find("ul").children().length).toBe(0);
    expect(PlacesListComponent.find("li").length).toBe(0);
  });

  it("should render no results found", () => {
    const PlacesListComponent = shallow(
      <PlacesList results={[{ name: "No results found" }]} />
    );
    const listItem = PlacesListComponent.find("li").at(0);
    expect(
      listItem
        .find("div")
        .at(1)
        .text()
    ).toBe("No results found ");
    expect(listItem.find("li").length).toBe(1);
    expect(
      listItem
        .find("div")
        .at(0)
        .text()
    ).toBe("");
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
    ).toBe("Picadilly Station Uk");

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
});
