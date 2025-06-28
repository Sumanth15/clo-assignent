import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import AppRoutes from "./Router";
import Header from "./components/Header";
import "./App.css";

function App() {
  return (
    <Router>
      <Header title="CONNECT" />
      <AppRoutes />
    </Router>
  );
}

export default App;
