// src/SafetyMap.jsx
import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, GeoJSON, useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import axios from "axios";
import ReportForm from "./components/ReportForm";
import FilterBar from "./components/FilterBar";
import Navbar from "./components/Navbar";
import Legend from "./components/Legend";
import AlertBanner from "./components/AlertBanner";
import SafetyTips from "./components/SafetyTips";
import SafetyResourceButton from "./components/SafetyResourceButton";
import StatisticsPanel from "./components/StatisticsPanel";
import useLeafletFix from "./hooks/useLeafletFix";
import "./styles/SafetyMap.css";

// API endpoint - replace with your actual Django API endpoint
const API_ENDPOINT = "/api/reports/";

// Severity color mapping based on score ranges
const getSeverityColor = (severityScore) => {
  if (severityScore >= 90) return "#800000"; // Dark red (most severe)
  if (severityScore >= 75) return "#a93226"; // Red
  if (severityScore >= 60) return "#d35400"; // Dark orange
  if (severityScore >= 45) return "#f39c12"; // Orange
  if (severityScore >= 30) return "#f1c40f"; // Yellow
  if (severityScore >= 15) return "#27ae60"; // Green
  return "#2980b9"; // Blue (least severe)
};

// Get marker size based on severity
const getMarkerSize = (severityScore) => {
  if (severityScore >= 80) return 12; // Largest
  if (severityScore >= 60) return 10;
  if (severityScore >= 40) return 8;
  if (severityScore >= 20) return 6;
  return 5; // Smallest
};

const MapClickHandler = ({ onMapClick }) => {
  useMapEvents({
    click: (e) => {
      onMapClick(e.latlng);
    },
  });
  return null;
};

const SafetyMap = () => {
  // Use the Leaflet fix hook
  useLeafletFix();

  const [reports, setReports] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [filters, setFilters] = useState({
    categories: [],
    timeframe: "all",
    severityRange: [0, 100], // Min and max severity
  });
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showAlert, setShowAlert] = useState(true);
  const [showSafetyTips, setShowSafetyTips] = useState(false);
  const [showStatistics, setShowStatistics] = useState(true);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch reports from Django API
  useEffect(() => {
    const fetchReports = async () => {
      try {
        setLoading(true);
        const response = await axios.get(API_ENDPOINT);
        setReports(response.data);
        setError(null);
      } catch (err) {
        console.error("Error fetching reports:", err);
        setError("Failed to load reports. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchReports();
  }, []);

  // Function for handling map clicks
  const handleMapClick = (latlng) => {
    setSelectedLocation(latlng);
    setIsFormOpen(true);
  };

  // Function for handling report submission to API
  const handleSubmitReport = async (reportData) => {
    try {
      const newReport = {
        ...reportData,
        geometry: {
          type: "Point",
          coordinates: [selectedLocation.lng, selectedLocation.lat],
        },
        properties: {
          ...reportData,
          timestamp: new Date().toISOString(),
          reporter: isLoggedIn ? "username" : "anonymous",
        },
      };

      const response = await axios.post(API_ENDPOINT, newReport);

      // Update reports with the new one from API
      setReports((prevReports) => [...prevReports, response.data]);
      setIsFormOpen(false);
      setSelectedLocation(null);
    } catch (err) {
      console.error("Error submitting report:", err);
      alert("Failed to submit report. Please try again.");
    }
  };

  // Function to handle voting on reports
  const handleVote = async (id, action) => {
    try {
      const response = await axios.post(`${API_ENDPOINT}${id}/vote/`, {
        action: action,
      });

      // Update the specific report with updated data from API
      setReports((prevReports) =>
        prevReports.map((report) => (report.id === id ? response.data : report))
      );
    } catch (err) {
      console.error("Error voting on report:", err);
      alert("Failed to register vote. Please try again.");
    }
  };

  // Filter reports based on selection
  const filteredReports = reports.filter((report) => {
    // Filter by category
    if (
      filters.categories.length > 0 &&
      !filters.categories.includes(report.properties.category)
    ) {
      return false;
    }

    // Filter by severity range
    const severity = report.properties.severity || 0;
    if (
      severity < filters.severityRange[0] ||
      severity > filters.severityRange[1]
    ) {
      return false;
    }

    // Filter by timeframe
    if (filters.timeframe !== "all") {
      const reportDate = new Date(report.properties.timestamp);
      const now = new Date();

      switch (filters.timeframe) {
        case "day":
          if (now - reportDate > 24 * 60 * 60 * 1000) return false;
          break;
        case "week":
          if (now - reportDate > 7 * 24 * 60 * 60 * 1000) return false;
          break;
        case "month":
          if (now - reportDate > 30 * 24 * 60 * 60 * 1000) return false;
          break;
        default:
          break;
      }
    }

    return true;
  });

  // Custom function to style the GeoJSON features
  const geoJSONStyle = (feature) => {
    const severity = feature.properties.severity || 0;
    return {
      radius: getMarkerSize(severity),
      fillColor: getSeverityColor(severity),
      color: "#000",
      weight: 1,
      opacity: 1,
      fillOpacity: 0.8,
    };
  };

  // Function to create markers for each GeoJSON point
  const pointToLayer = (feature, latlng) => {
    return L.circleMarker(latlng, geoJSONStyle(feature));
  };

  // Function to add popups to each feature
  const onEachFeature = (feature, layer) => {
    if (feature.properties) {
      const severity = feature.properties.severity || 0;
      const severityText = getSeverityCategoryText(severity);

      layer.bindPopup(`
        <div class="report-popup">
          <h3>${feature.properties.category}</h3>
          <p>${feature.properties.description}</p>
          <p class="severity-indicator">Severity: <span class="severity-${severityText.toLowerCase()}">${severityText}</span></p>
          <p class="timestamp">
            ${new Date(feature.properties.timestamp).toLocaleString()}
          </p>
          <div class="vote-controls">
            <button onclick="window.handleVote(${feature.id}, 'upvote')">
              👍 Verify (${feature.properties.votes || 0})
            </button>
            <button onclick="window.handleVote(${feature.id}, 'downvote')">
              👎 Dispute
            </button>
          </div>
        </div>
      `);
    }
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

  // Make vote handler globally available for popup buttons
  window.handleVote = handleVote;

  // GeoJSON data structure
  const geoJSONData = {
    type: "FeatureCollection",
    features: filteredReports,
  };

  return (
    <div className="safety-map-container">
      <Navbar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />

      {showAlert && (
        <AlertBanner
          message="Stay aware of your surroundings. This map shows community reports but is not a replacement for emergency services."
          onClose={() => setShowAlert(false)}
        />
      )}

      <div className="content-wrapper">
        <FilterBar
          filters={filters}
          setFilters={setFilters}
          // Add common crime categories based on your severity keywords
          categories={[
            "Assault",
            "Theft",
            "Robbery",
            "Harassment",
            "Drug",
            "Burglary",
            "Weapon",
            "Fraud",
            "DUI",
            "Other",
          ]}
        />

        {showStatistics && <StatisticsPanel reportData={reports} />}

        <div className="map-container">
          {loading && (
            <div className="loading-overlay">Loading crime data...</div>
          )}

          {error && <div className="error-message">{error}</div>}

          <MapContainer
            center={[40.7128, -74.006]} // Default to NYC, adjust as needed
            zoom={13}
            style={{ height: "100%", width: "100%" }}
          >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />

            {reports.length > 0 && (
              <GeoJSON
                data={geoJSONData}
                pointToLayer={pointToLayer}
                onEachFeature={onEachFeature}
              />
            )}

            <MapClickHandler onMapClick={handleMapClick} />
          </MapContainer>

          <Legend severityBased={true} />

          <SafetyResourceButton onClick={() => setShowSafetyTips(true)} />

          {isFormOpen && (
            <ReportForm
              selectedLocation={selectedLocation}
              onSubmit={handleSubmitReport}
              onClose={() => setIsFormOpen(false)}
            />
          )}
        </div>
      </div>

      <SafetyTips
        isVisible={showSafetyTips}
        onClose={() => setShowSafetyTips(false)}
      />
    </div>
  );
};

export default SafetyMap;
