import React, { useState } from "react";
import "./Filter.css";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";

const Filter = ({ onFilterChange }) => {
  const [priceRange, setPriceRange] = useState([0, 999]);
  const [selectedOptions, setSelectedOptions] = useState([]);

  const handleSliderChange = (event, newValue) => {
    setPriceRange(newValue);
    onFilterChange({ pricingOptions: selectedOptions, priceRange: newValue });
  };

  const handleCheckboxChange = (event) => {
    const { value, checked } = event.target;
    const updatedOptions = checked
      ? [...selectedOptions, parseInt(value, 10)]
      : selectedOptions.filter((option) => option !== parseInt(value, 10));
    setSelectedOptions(updatedOptions);
    onFilterChange({ pricingOptions: updatedOptions, priceRange });
  };

  const handleReset = () => {
    setPriceRange([0, 999]);
    setSelectedOptions([]); // Reset selected options
    onFilterChange({ pricingOptions: [], priceRange: [0, 999] });
  };

  return (
    <div className="filter-container-infilter">
      <div className="filter-options">
        <div className="filter-section">
          <span>Pricing Option</span>
          <label>
            <input
              type="checkbox"
              value={2}
              checked={selectedOptions.includes(2)} // Bind state to checkbox
              onChange={handleCheckboxChange}
            />{" "}
            Paid
          </label>
          <label>
            <input
              type="checkbox"
              value={0}
              checked={selectedOptions.includes(0)} // Bind state to checkbox
              onChange={handleCheckboxChange}
            />{" "}
            Free
          </label>
          <label>
            <input
              type="checkbox"
              value={1}
              checked={selectedOptions.includes(1)} // Bind state to checkbox
              onChange={handleCheckboxChange}
            />{" "}
            View Only
          </label>
          <div className="slider-container">
            <span>Price Range:</span>
            <Box sx={{ width: 200 }}>
              <Slider
                value={priceRange}
                onChange={handleSliderChange}
                valueLabelDisplay="auto"
                min={0}
                max={999}
              />
            </Box>
            <span>
              ${priceRange[0]} - ${priceRange[1]}
            </span>
          </div>
        </div>
      </div>
      <div className="filter-reset">
        <button onClick={handleReset}>Reset</button>
      </div>
    </div>
  );
};

export default Filter;
