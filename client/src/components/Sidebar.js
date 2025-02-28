import React from "react";
import { Link } from "react-router-dom";
import "./Sidebar.css";

function Sidebar({ darkMode }) {
  return (
    <aside className={`sidebar ${darkMode ? "dark-sidebar" : ""}`}>
      <nav className="nav">
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/dashboard">Dashboard</Link></li>
          <li><Link to="/upcoming-sessions">Upcoming Sessions</Link></li>
          <li><Link to="/feedback">Feedback</Link></li>
          <li><Link to="/about">About</Link></li>
          <li><Link to="/profile">Profile</Link></li>
        </ul>
      </nav>
      <div className="sidebar-footer">
        <span>Logout</span>
      </div>
    </aside>
  );
}

export default Sidebar;
