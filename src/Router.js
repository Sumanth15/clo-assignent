import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./screens/Home";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      {/* Add more routes here as needed */}
    </Routes>
  );
};

export default AppRoutes;
