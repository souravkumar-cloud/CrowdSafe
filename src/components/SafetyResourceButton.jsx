// src/components/SafetyResourceButton.jsx
import React from "react";
import "../styles/SafetyResourceButton.css";

const SafetyResourceButton = ({ onClick }) => {
  return (
    <button className="safety-resource-button" onClick={onClick}>
      <span className="icon">🛟</span>
      <span className="text">Safety Resources</span>
    </button>
  );
};

export default SafetyResourceButton;
