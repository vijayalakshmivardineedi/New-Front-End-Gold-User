import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const SearchResults = () => {
  const { query } = useParams();
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    // Fetch search results based on the query
    axios
      .get(`http://localhost:2000/api/products/search?query=${query}`)
      .then((response) => setSearchResults(response.data))
      .catch((error) => console.error(error));
  }, [query]);

  return (
    <div>
      <h2>Search Results for "{query}"</h2>
      <ul>
        {searchResults.map((result) => (
          <li key={result._id}>{result.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default SearchResults;
