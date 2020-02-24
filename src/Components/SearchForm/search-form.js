import React from "react";
import useDebounce from "../CustomHooks/use-debouncer";
import useFetch from "../CustomHooks/use-fetch";
import PlacesList from "../PlacesList/places-list";
import "./search-form.css";

const SearchForm = () => {
  const [searchTerm, setSearchTerm] = React.useState("");
  const [results, setResults] = React.useState([]);
  const [selectedValue, setValue] = React.useState("");
  const debouncedSearchTerm = useDebounce(searchTerm, 1000);
  const resultsData = useFetch(debouncedSearchTerm);

  React.useEffect(() => {
    if (resultsData) {
      return setResults(resultsData);
    }
    setResults([]);
  }, [resultsData]);

  return (
    <form className="form">
      <h2 className="ideal-car">Let’s find your ideal car</h2>
      <label className="label" htmlFor="place-search">
        Pick-up Location
      </label>
      <div className="search-section">
        <input
          id="place-search"
          type="text"
          placeholder="city, airport, station, region, district..."
          className="search"
          value={searchTerm}
          onChange={event => setSearchTerm(event.target.value)}
          data-testid="input"
        />
        <PlacesList results={results} setValue={setValue} />
        <h2 id="selected-value">{selectedValue}</h2>
      </div>
    </form>
  );
};

export default SearchForm;
