// src/components/Header.js
import React from "react";
import "./Header.css";
import logo from "../images/logo.png"; 

function Header({ darkMode, onToggleDarkMode }) {
  return (
    <header className="header">
      <div className="logo">
        <img src={logo} alt="Logo" className="logo-img" />
        Scholar Station
      </div>
      <button onClick={onToggleDarkMode} className="dark-mode-toggle">
        <i className={`fa ${darkMode ? "fa-sun" : "fa-moon"}`}></i>
      </button>
    </header>
  );
}

export default Header;
