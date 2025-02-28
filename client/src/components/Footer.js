// src/components/Footer.js
import React from "react";
import "./Footer.css";

function Footer({ darkMode }) {
  return (
    <footer className={`footer ${darkMode ? "dark-footer" : ""}`}>
      <p>Scholar Station - Version 1.0.0 (Beta)</p>
    </footer>
  );
}

export default Footer;
