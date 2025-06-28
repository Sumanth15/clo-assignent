import React, { useState } from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

const SortDropdown = ({ onSortChange }) => {
  const [sortOption, setSortOption] = useState("name"); // Default sorting by Item Name

  const handleChange = (event) => {
    const selectedOption = event.target.value;
    setSortOption(selectedOption);
    onSortChange(selectedOption); // Notify parent component about the sorting change
  };


  return (
<FormControl
  variant="standard"
  sx={{
    m: 1,
    minWidth: 120,
    "& .MuiInputLabel-root": {
      color: "white", // Label text color
    },
    "& .MuiInputLabel-root.Mui-focused": {
      color: "white", // Label color when focused
    },
    "& .MuiSelect-root": {
      color: "white", // Dropdown text color
    },
    "& .MuiSelect-icon": {
      color: "white", // Dropdown arrow color
    },
    "& .MuiInput-root::before": {
      borderBottom: "1px solid #fff", // Custom underline color
    },
    "& .MuiInput-root::after": {
      borderBottom: "1px solid #fff", // Focused underline color
    },
  }}
>
  <InputLabel id="demo-simple-select-standard-label">Sort By</InputLabel>
  <Select
    labelId="demo-simple-select-standard-label"
    id="demo-simple-select-standard"
    value={sortOption}
    onChange={handleChange}
    label="Sort By"
  >
    <MenuItem value="name">Item Name</MenuItem>
    <MenuItem value="highPrice">Higher Price</MenuItem>
    <MenuItem value="lowPrice">Lower Price</MenuItem>
  </Select>
</FormControl>


  );
};

export default SortDropdown;
