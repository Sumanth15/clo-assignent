import React from "react";
import "./Header.css";

const Header = ({ title }) => {
  return (
    <header className="header">
      <h1>{title}</h1>
      <button className="header-button">OPTIONAL FEATURE</button>
    </header>
  );
};

export default Header;
