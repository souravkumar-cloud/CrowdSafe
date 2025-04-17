import React from "react";
import "../styles/AlertBanner.css";

const AlertBanner = ({ message, onClose }) => {
  return (
    <div className="alert-banner">
      <div className="alert-content">
        <span className="alert-icon">⚠️</span>
        <p>{message}</p>
      </div>
      <button className="alert-close" onClick={onClose}>
        ×
      </button>
    </div>
  );
};

export default AlertBanner;
