import React from "react";
import { shallow } from "enzyme";
import App from "./App";
import AppHeader from "./Components/AppHeader/app-header";
import SearchForm from "./Components/SearchForm/search-form";

test("renders components as expected", () => {
  const component = shallow(<App />);

  expect(component.find(AppHeader).length).toBe(1);
  expect(component.find(SearchForm).length).toBe(1);
});
