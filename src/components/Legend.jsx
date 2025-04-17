import React from "react";
import "../styles/Legend.css";

const Legend = ({ severityBased = false }) => {
  // Define categories if not using severity-based display
  const categories = [
    { name: "Assault", color: "#e74c3c" },
    { name: "Theft", color: "#e67e22" },
    { name: "Robbery", color: "#f39c12" },
    { name: "Harassment", color: "#9b59b6" },
    { name: "Other", color: "#3498db" },
  ];

  // Define severity levels for severity-based display
  const severityLevels = [
    { name: "Critical (90-100)", color: "#800000" },
    { name: "Severe (75-89)", color: "#a93226" },
    { name: "High (60-74)", color: "#d35400" },
    { name: "Moderate (45-59)", color: "#f39c12" },
    { name: "Low (30-44)", color: "#f1c40f" },
    { name: "Minor (15-29)", color: "#27ae60" },
    { name: "Negligible (0-14)", color: "#2980b9" },
  ];

  const items = severityBased ? severityLevels : categories;

  return (
    <div className="map-legend">
      <h3>{severityBased ? "Crime Severity" : "Categories"}</h3>
      <ul>
        {items.map((item) => (
          <li key={item.name}>
            <span
              className="color-indicator"
              style={{ backgroundColor: item.color }}
            ></span>
            {item.name}
          </li>
        ))}
      </ul>
      <div className="legend-instructions">
        <p>Click on map to add a report</p>
        <p>Click on markers to view details</p>
      </div>
    </div>
  );
};

export default Legend;
