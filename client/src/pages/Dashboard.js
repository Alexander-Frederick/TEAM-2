import React from "react";
import ClassCard from "../components/ClassCard";
import "./Dashboard.css"; 

function Dashboard({ darkMode, classesData }) {
  return (
    <div className="dashboard-page">
      <h2>Classes</h2>
      <div className="class-cards-container">
        {classesData.map((classData, index) => (
          <ClassCard 
            key={index} 
            title={classData.title} 
            description={classData.description} 
          />
        ))}
      </div>
    </div>
  );
}

export default Dashboard;
