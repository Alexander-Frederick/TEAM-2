import React from "react";
import "./Home.css";

function Home() {
  return (
    <div className="home-page">
      <h1>Welcome to Scholar Station</h1>
      <div className="search-form">
        <form className="search-form-elem">
          <input 
            type="text" 
            className="form-control" 
            placeholder="Search for classes" 
          />
          <button type="submit">
            {/* Optionally include an icon here */}
            Search
          </button>
        </form>
      </div>
    </div>
  );
}

export default Home;
