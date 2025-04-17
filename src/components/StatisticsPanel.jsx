// src/components/StatisticsPanel.jsx
import React, { useMemo } from "react";
import "../styles/StatisticsPanel.css";

const StatisticsPanel = ({ reportData }) => {
  // Calculate statistics based on report data
  const statistics = useMemo(() => {
    if (!reportData || !reportData.length) {
      return {
        totalReports: 0,
        categories: {},
        avgSeverity: 0,
        recent24h: 0,
        recent7d: 0,
      };
    }

    // Get current date for time-based calculations
    const now = new Date();
    const oneDayAgo = new Date(now - 24 * 60 * 60 * 1000);
    const sevenDaysAgo = new Date(now - 7 * 24 * 60 * 60 * 1000);

    // Initialize stats
    let total = reportData.length;
    let categories = {};
    let severitySum = 0;
    let recent24h = 0;
    let recent7d = 0;

    // Process each report
    reportData.forEach((report) => {
      // Get category and increment count
      const category = report.properties?.category || "Unknown";
      categories[category] = (categories[category] || 0) + 1;

      // Add to severity sum
      severitySum += report.properties?.severity || 0;

      // Check if report is recent
      const reportDate = new Date(report.properties?.timestamp);
      if (reportDate >= oneDayAgo) recent24h++;
      if (reportDate >= sevenDaysAgo) recent7d++;
    });

    // Calculate average severity
    const avgSeverity = total > 0 ? Math.round(severitySum / total) : 0;

    return {
      totalReports: total,
      categories,
      avgSeverity,
      recent24h,
      recent7d,
    };
  }, [reportData]);

  // Get top 3 categories
  const topCategories = useMemo(() => {
    return Object.entries(statistics.categories)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 3)
      .map(([name, count]) => ({ name, count }));
  }, [statistics]);

  // Get severity text
  const severityText = useMemo(() => {
    const score = statistics.avgSeverity;
    if (score >= 90) return "Critical";
    if (score >= 75) return "Severe";
    if (score >= 60) return "High";
    if (score >= 45) return "Moderate";
    if (score >= 30) return "Low";
    if (score >= 15) return "Minor";
    return "Negligible";
  }, [statistics.avgSeverity]);

  return (
    <div className="statistics-panel">
      <h2>Area Statistics</h2>

      <div className="stat-row">
        <div className="stat-card">
          <h3>Total Reports</h3>
          <div className="stat-value">{statistics.totalReports}</div>
        </div>

        <div className="stat-card">
          <h3>Recent Activity</h3>
          <div className="recent-stats">
            <div className="recent-stat">
              <span className="recent-value">{statistics.recent24h}</span>
              <span className="recent-label">Last 24h</span>
            </div>
            <div className="recent-stat">
              <span className="recent-value">{statistics.recent7d}</span>
              <span className="recent-label">Last 7d</span>
            </div>
          </div>
        </div>

        <div className="stat-card">
          <h3>Average Severity</h3>
          <div className={`stat-value severity-${severityText.toLowerCase()}`}>
            {statistics.avgSeverity} - {severityText}
          </div>
        </div>
      </div>

      <div className="top-categories">
        <h3>Top Incident Types</h3>
        <div className="category-list">
          {topCategories.length > 0 ? (
            topCategories.map((cat, index) => (
              <div key={cat.name} className="category-item">
                <span className="category-rank">{index + 1}.</span>
                <span className="category-name">{cat.name}</span>
                <span className="category-count">{cat.count}</span>
              </div>
            ))
          ) : (
            <div className="no-data">No data available</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default StatisticsPanel;
