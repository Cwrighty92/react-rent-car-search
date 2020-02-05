import React from "react";
import { shallow } from "enzyme";
import App from "./App";
import AppHeader from "./Components/app-header";
import SearchForm from "./Components/search-form";

test("renders learn react link", () => {
  const component = shallow(<App />);

  expect(component.find(AppHeader).length).toBe(1);
  expect(component.find(SearchForm).length).toBe(1);
});
