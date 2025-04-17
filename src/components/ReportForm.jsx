// src/components/ReportForm.jsx
import React, { useState, useEffect } from "react";
import "../styles/ReportForm.css";

// Severity keywords mapping (imported from your provided data)
const SEVERITY_KEYWORDS = {
  // Numeric degrees (with and without 'ST', 'ND', etc.)
  "1ST": 95,
  1: 90,
  ONE: 90,
  "2ND": 80,
  2: 75,
  TWO: 75,
  "3RD": 60,
  3: 55,
  THREE: 55,
  "4TH": 45,
  4: 40,
  FOUR: 40,
  "5TH": 35,
  5: 35,
  FIVE: 35,
  // General severity levels
  FELONY: 85,
  MISDEMEANOR: 20,
  VIOLATION: 15,
  INFRACTION: 10,
  UNCLASSIFIED: 30,
  UNKNOWN: 0,

  // Crime categories
  MURDER: 100,
  HOMICIDE: 95,
  KIDNAPPING: 90,
  RAPE: 90,
  SODOMY: 85,
  "SEXUAL ABUSE": 80,
  ROBBERY: 85,
  ARSON: 80,
  BURGLARY: 75,
  ASSAULT: 70,
  STRANGULATION: 70,
  WEAPON: 70,
  FIREARM: 70,
  ESCAPE: 65,
  LARCENY: 60,
  "STOLEN PROPERTY": 60,
  FORGERY: 55,
  FRAUD: 55,
  DRUG: 55,
  "CONTROLLED SUBSTANCE": 55,
  SALE: 60,
  POSSESSION: 50,
  PROSTITUTION: 45,
  OBSCENITY: 45,
  RECKLESS: 50,
  ENDANGERMENT: 50,
  CHILD: 60,
  CONTEMPT: 50,
  HARASSMENT: 45,
  BRIBERY: 50,
  IMPERSONATION: 40,
  LOITERING: 20,
  TRESPASS: 30,
  DISORDERLY: 25,
  INTOXICATED: 50,
  IMPAIRED: 50,
  MANSLAUGHTER: 85,
  VEHICULAR: 60,
  TERRORISTIC: 95,
  CONSPIRACY: 70,
  TAMPERING: 40,
  SOLICITATION: 30,
  NUISANCE: 20,
  GAMBLING: 35,
  RIOT: 50,
  PERJURY: 50,
  "BAIL JUMPING": 50,
  "FALSE REPORT": 40,
  RESISTING: 40,
  "LEAVING SCENE": 40,
  ABANDONMENT: 45,
  "SEX TRAFFICKING": 95,
  COERCION: 70,
  STALKING: 60,
  OBSTRUCTION: 60,
  TORTURE: 85,
  THEFT: 60,
  "UNAUTHORIZED USE": 50,
  MISCHIEF: 45,
  DANGEROUS: 70,
  POSSESS: 50,
  LAUNDERING: 70,
  FALSIFY: 60,
  SMUGGLING: 75,
  SECURITIES: 60,
  EXTORTION: 75,
  CONDUCT: 30,
  "END WELFARE": 65,
  OFFENSIVE: 30,
  "FAIL TO APPEAR": 20,
  INDECENT: 50,
  "INTENT TO SELL": 60,
  "USE OF CHILD": 85,
  DUI: 60,
  DRIVING: 45,
  ALCOHOL: 40,
  CANNABIS: 30,
  UNLICENSED: 25,
  "ANIMAL CRUELTY": 60,
  ILLEGAL: 50,
  "COURSE OF SEXUAL CONDUCT": 90,
  TERROR: 95,
  "OBSTRUCTION OF JUSTICE": 80,
  INTERFERENCE: 50,
  UNLAWFUL: 50,
  INCOMPETENT: 45,
  PEDESTRIAN: 10,
  PRIVACY: 45,
  "FAIL TO STOP": 30,
  "CELL PHONE": 10,
  NOISE: 10,
  FIREWORKS: 20,
  "LICENSE VIOLATION": 25,
  ABUSE: 75,
};

// Common categories for the dropdown
const CRIME_CATEGORIES = [
  "Assault",
  "Theft",
  "Robbery",
  "Harassment",
  "Drug",
  "Burglary",
  "Weapon",
  "Sexual Abuse",
  "Fraud",
  "DUI",
  "Trespass",
  "Vandalism",
  "Other",
];

const ReportForm = ({ selectedLocation, onSubmit, onClose }) => {
  const [reportData, setReportData] = useState({
    category: "Harassment",
    description: "",
    severity: 45, // Default moderate severity
  });

  // Auto-calculate severity based on description keywords
  useEffect(() => {
    const calculateSeverity = (text) => {
      if (!text) return 45; // Default moderate

      const words = text.toUpperCase().split(/\s+/);
      let highestSeverity = 0;

      // Check for keywords in description
      words.forEach((word) => {
        if (
          SEVERITY_KEYWORDS[word] &&
          SEVERITY_KEYWORDS[word] > highestSeverity
        ) {
          highestSeverity = SEVERITY_KEYWORDS[word];
        }
      });

      // Check for phrases (multi-word keys)
      Object.keys(SEVERITY_KEYWORDS).forEach((key) => {
        if (key.includes(" ") && text.toUpperCase().includes(key)) {
          if (SEVERITY_KEYWORDS[key] > highestSeverity) {
            highestSeverity = SEVERITY_KEYWORDS[key];
          }
        }
      });

      return highestSeverity || 45; // Default to moderate if nothing found
    };

    const autoSeverity = calculateSeverity(reportData.description);

    setReportData((prev) => ({
      ...prev,
      severity: autoSeverity,
    }));
  }, [reportData.description]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setReportData({
      ...reportData,
      [name]: value,
    });
  };

  const handleSeverityChange = (e) => {
    setReportData({
      ...reportData,
      severity: parseInt(e.target.value),
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(reportData);
  };

  // Function to convert severity score to text category
  const getSeverityCategoryText = (score) => {
    if (score >= 90) return "Critical";
    if (score >= 75) return "Severe";
    if (score >= 60) return "High";
    if (score >= 45) return "Moderate";
    if (score >= 30) return "Low";
    if (score >= 15) return "Minor";
    return "Negligible";
  };

  // Get severity color for the slider
  const getSeverityColor = (score) => {
    if (score >= 90) return "#800000"; // Dark red
    if (score >= 75) return "#a93226"; // Red
    if (score >= 60) return "#d35400"; // Dark orange
    if (score >= 45) return "#f39c12"; // Orange
    if (score >= 30) return "#f1c40f"; // Yellow
    if (score >= 15) return "#27ae60"; // Green
    return "#2980b9"; // Blue
  };

  return (
    <div className="report-form-overlay">
      <div className="report-form">
        <button className="close-button" onClick={onClose}>
          ×
        </button>
        <h2>Report Safety Concern</h2>
        <p className="location-info">
          Location: {selectedLocation.lat.toFixed(5)},{" "}
          {selectedLocation.lng.toFixed(5)}
        </p>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Category</label>
            <select
              name="category"
              value={reportData.category}
              onChange={handleChange}
              required
            >
              {CRIME_CATEGORIES.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label>Description</label>
            <textarea
              name="description"
              value={reportData.description}
              onChange={handleChange}
              placeholder="Please provide details about what happened..."
              required
              minLength={10}
            ></textarea>
          </div>

          <div className="form-group">
            <label>Severity (auto-calculated from description)</label>
            <div className="severity-container">
              <div className="severity-slider-container">
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={reportData.severity}
                  onChange={handleSeverityChange}
                  className="severity-slider"
                  style={{
                    background: `linear-gradient(to right, ${getSeverityColor(
                      0
                    )}, ${getSeverityColor(50)}, ${getSeverityColor(100)})`,
                  }}
                />
              </div>
              <div className="severity-display">
                <span className="severity-value">{reportData.severity}</span>
                <span
                  className={`severity-text severity-${getSeverityCategoryText(
                    reportData.severity
                  ).toLowerCase()}`}
                >
                  {getSeverityCategoryText(reportData.severity)}
                </span>
              </div>
            </div>
          </div>

          <button type="submit" className="submit-button">
            Submit Report
          </button>
        </form>
      </div>
    </div>
  );
};

export default ReportForm;
