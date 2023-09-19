import React from "react";
import "./Search.css";


//Search bar on store page
const Search = ({ value, onChangeData }) => {
  return (
    <div>
      <input
        className="search__input"
        type="text"
        placeholder="Enter product name"
        value={value}
        onChange={onChangeData}
      />
    </div>
  );
};

export default Search;
