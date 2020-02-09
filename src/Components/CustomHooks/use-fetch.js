import React from "react";
import axios from "axios";

const UseFetch = debouncedSearchTerm => {
  const [response, setResponse] = React.useState([]);
  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(
          `https://www.rentalcars.com/FTSAutocomplete.do?solrIndex=fts_en&solrRows=${6}&solrTerm=${debouncedSearchTerm}`
        );
        setResponse(res.data.results.docs);
      } catch (error) {
        console.log(error);
      }
    };
    if (debouncedSearchTerm && debouncedSearchTerm.length > 1) {
      fetchData();
    }
  }, [debouncedSearchTerm]);
  return response;
};

export default UseFetch;
