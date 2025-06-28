import React, { useState } from "react";
import "./SearchBar.css";
import { FiSearch } from "react-icons/fi";

const SearchBar = ({ placeholder, onSearch }) => {
  const [input, setInput] = useState("");

  const handleInputChange = (e) => {
    setInput(e.target.value);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      onSearch(input); // Call the onSearch function when Enter is pressed
    }
  };

  const handleIconClick = () => {
    onSearch(input); // Call the onSearch function when the search icon is clicked
  };

  return (
    <div className="search-bar-insearch">
      <input
        type="text"
        className="search-input"
        value={input}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        placeholder={placeholder || "Search..."}
      />
      <FiSearch className="search-icon" onClick={handleIconClick} />
    </div>
  );
};

export default SearchBar;
