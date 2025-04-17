import React from "react";
import "../styles/FilterBar.css";

const FilterBar = ({ filters, setFilters, categories }) => {
  const handleCategoryChange = (category) => {
    const updatedCategories = [...filters.categories];

    if (updatedCategories.includes(category)) {
      // Remove category if already selected
      const index = updatedCategories.indexOf(category);
      updatedCategories.splice(index, 1);
    } else {
      // Add category if not selected
      updatedCategories.push(category);
    }

    setFilters({
      ...filters,
      categories: updatedCategories,
    });
  };

  const handleTimeframeChange = (e) => {
    setFilters({
      ...filters,
      timeframe: e.target.value,
    });
  };

  const handleSeverityChange = (e, index) => {
    const value = parseInt(e.target.value);
    const newRange = [...filters.severityRange];
    newRange[index] = value;

    // Ensure min doesn't exceed max and vice versa
    if (index === 0 && value > newRange[1]) newRange[1] = value;
    if (index === 1 && value < newRange[0]) newRange[0] = value;

    setFilters({
      ...filters,
      severityRange: newRange,
    });
  };

  return (
    <div className="filter-bar">
      <div className="filter-section">
        <h3>Categories</h3>
        <div className="category-filters">
          {categories.map((category) => (
            <label key={category} className="category-checkbox">
              <input
                type="checkbox"
                checked={filters.categories.includes(category)}
                onChange={() => handleCategoryChange(category)}
              />
              <span className="category-label">{category}</span>
            </label>
          ))}
        </div>
      </div>

      <div className="filter-section">
        <h3>Timeframe</h3>
        <select
          value={filters.timeframe}
          onChange={handleTimeframeChange}
          className="timeframe-select"
        >
          <option value="all">All Time</option>
          <option value="day">Last 24 Hours</option>
          <option value="week">Last 7 Days</option>
          <option value="month">Last 30 Days</option>
        </select>
      </div>

      <div className="filter-section severity-filter">
        <h3>Severity Range</h3>
        <div className="severity-sliders">
          <div className="slider-container">
            <span className="slider-label">Min:</span>
            <input
              type="range"
              min="0"
              max="100"
              value={filters.severityRange[0]}
              onChange={(e) => handleSeverityChange(e, 0)}
              className="severity-slider"
            />
            <span className="slider-value">{filters.severityRange[0]}</span>
          </div>
          <div className="slider-container">
            <span className="slider-label">Max:</span>
            <input
              type="range"
              min="0"
              max="100"
              value={filters.severityRange[1]}
              onChange={(e) => handleSeverityChange(e, 1)}
              className="severity-slider"
            />
            <span className="slider-value">{filters.severityRange[1]}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilterBar;
