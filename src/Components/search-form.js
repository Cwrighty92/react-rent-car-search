import React from "react";
import axios from "axios";
import useDebounce from "./use-debouncer";
import "./search-form.css";

const SearchForm = () => {
  const [searchTerm, setSearchTerm] = React.useState("");
  const [results, setResults] = React.useState([]);
  const debouncedSearchTerm = useDebounce(searchTerm, 1000);

  const handleChange = event => {
    setSearchTerm(event.target.value);
  };

  React.useEffect(() => {
    if (debouncedSearchTerm) {
      if (debouncedSearchTerm.length < 2) {
        return setResults([]);
      }
      if (debouncedSearchTerm.length >= 2) {
        try {
          axios
            .get(
              `https://www.rentalcars.com/FTSAutocomplete.do?solrIndex=fts_en&solrRows=${6}&solrTerm=${debouncedSearchTerm}`
            )
            .then(function(response) {
              setResults(response.data.results.docs);
            });
        } catch (error) {
          console.log(error);
        }
      }
    } else {
      setResults([]);
    }
  }, [debouncedSearchTerm]);

  return (
    <form className="form">
      <h2 className="ideal-car">Let’s find your ideal car</h2>
      <label className="label">Pick-up Location</label>
      <div className="search-section">
        <input
          placeholder="city, airport, station, region, district..."
          className="search"
          value={searchTerm}
          onChange={handleChange}
          data-testid="input"
        />
        <ul>
          {results.map(item => (
            <li className="search-item" key={item.placeKey}>
              {item.name}
            </li>
          ))}
        </ul>
      </div>
    </form>
  );
};

export default SearchForm;
