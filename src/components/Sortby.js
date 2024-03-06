// src/components/SortButton.js
import React from 'react';
import "./SortBy.css"
function Sortby({ sortBangles, sortBy }) {
  const handleSortChange = (e) => {
    sortBangles(e.target.value);
  };

  return (
    <div className='sortby'>
      <label className='sort'>Filter By</label>
      <select onChange={handleSortChange} value={sortBy} placeholder=''  className='fs-3' style={{width:"200px" , height:"40px"}}>
        <option value="asc" className='low'>Low to High</option>
        <option value="desc" className='high'>High to Low</option>
      </select>
    </div>
  );
}

export default Sortby;
