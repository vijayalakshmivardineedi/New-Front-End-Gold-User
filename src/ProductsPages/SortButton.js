// src/components/SortButton.js
import React from 'react';

function SortButton({ sortBangles, sortBy }) {
  const handleSortChange = (e) => {
    sortBangles(e.target.value);
  };

  return (
    <div>
      <label>Sort by:</label>
      <select onChange={handleSortChange} value={sortBy}>
        <option value="asc">Ascending</option>
        <option value="desc">Descending</option>
      </select>
    </div>
  );
}

export default SortButton;
