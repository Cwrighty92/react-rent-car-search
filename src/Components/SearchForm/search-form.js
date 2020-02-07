import React from "react";
import axios from "axios";
import useDebounce from "../use-debouncer";
import PlacesList from "../PlacesList/places-list";
import "./search-form.css";

const SearchForm = () => {
  const [searchTerm, setSearchTerm] = React.useState("");
  const [results, setResults] = React.useState([]);
  const debouncedSearchTerm = useDebounce(searchTerm, 1000);

  React.useEffect(() => {
    if (debouncedSearchTerm) {
      if (debouncedSearchTerm.length < 2) {
        return setResults([]);
      }
      axios
        .get(
          `https://www.rentalcars.com/FTSAutocomplete.do?solrIndex=fts_en&solrRows=${6}&solrTerm=${debouncedSearchTerm}`
        )
        .then(function(response) {
          setResults(response.data.results.docs);
        })
        .catch(function(err) {
          console.log(err);
        });
    } else {
      setResults([]);
    }
  }, [debouncedSearchTerm]);

  return (
    <form className="form">
      <h2 className="ideal-car">Let’s find your ideal car</h2>
      <label className="label" htmlFor="place-search">
        Pick-up Location
      </label>
      <div className="search-section">
        <input
          type="text"
          placeholder="city, airport, station, region, district..."
          className="search"
          id="place-search"
          value={searchTerm}
          onChange={event => setSearchTerm(event.target.value)}
          data-testid="input"
        />
        <PlacesList results={results} />
      </div>
    </form>
  );
};

export default SearchForm;
