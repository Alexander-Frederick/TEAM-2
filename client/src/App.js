import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import UpcomingSessions from "./pages/UpcomingSessions";
import Feedback from "./pages/Feedback";
import About from "./pages/About";
import "./App.css";

function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [showSidebar, setShowSidebar] = useState(false);
  const toggleDarkMode = () => setDarkMode(!darkMode);
  const toggleSidebar = () => setShowSidebar(!showSidebar);

  // Static data for class cards
  const classesData = [
    { title: "Math 101", description: "Introductory Algebra and Geometry" },
    { title: "Physics 101", description: "Fundamentals of Mechanics" },
    { title: "Chemistry 101", description: "Basic Principles of Chemistry" },
    { title: "COP 3035", description: "Advanced Programming in C++/Java" },
  ];

  return (
    <Router>
      <div className={`app-container ${darkMode ? "dark-app" : ""}`}>
        <Header darkMode={darkMode} onToggleDarkMode={toggleDarkMode} />
        <button onClick={toggleSidebar} className="sidebar-toggle">
          <i className={`fa ${showSidebar ? "fa-times" : "fa-bars"}`}></i>
        </button>
        <div className="main-content">
          {showSidebar && <Sidebar darkMode={darkMode} />}
          <Routes>
            <Route path="/" element={<Home />} />
            <Route
              path="/dashboard"
              element={<Dashboard darkMode={darkMode} classesData={classesData} />}
            />
            <Route path="/upcoming-sessions" element={<UpcomingSessions />} />
            <Route path="/feedback" element={<Feedback />} />
            <Route path="/about" element={<About />} />
          </Routes>
        </div>
        <Footer darkMode={darkMode} />
      </div>
    </Router>
  );
}

export default App;
