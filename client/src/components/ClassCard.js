// src/components/ClassCard.js
import React from "react";
import "./ClassCard.css";

function ClassCard({ title, description }) {
  return (
    <div className="class-card">
      <h3 className="class-title">{title}</h3> {}
      <p className="class-description">{description}</p> 
      <button>Visit</button>
    </div>
  );
}

export default ClassCard;
