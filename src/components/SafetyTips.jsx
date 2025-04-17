// src/components/SafetyTips.jsx
import React from "react";
import "../styles/SafetyTips.css";

const SafetyTips = ({ isVisible, onClose }) => {
  if (!isVisible) return null;

  return (
    <div className="safety-tips-overlay">
      <div className="safety-tips-panel">
        <button className="close-button" onClick={onClose}>
          ×
        </button>
        <h2>Safety Resources & Tips</h2>

        <div className="emergency-contacts">
          <h3>Emergency Contacts</h3>
          <div className="contact-item">
            <span className="contact-label">Emergency:</span>
            <span className="contact-value">911</span>
          </div>
          <div className="contact-item">
            <span className="contact-label">Non-Emergency Police:</span>
            <span className="contact-value">311</span>
          </div>
          <div className="contact-item">
            <span className="contact-label">Crisis Text Line:</span>
            <span className="contact-value">Text HOME to 741741</span>
          </div>
        </div>

        <div className="tips-section">
          <h3>General Safety Tips</h3>
          <ul>
            <li>Stay aware of your surroundings at all times</li>
            <li>Avoid walking alone in isolated areas, especially at night</li>
            <li>Keep valuables concealed and secure</li>
            <li>Share your location with trusted contacts when traveling</li>
            <li>
              Trust your instincts - if something feels wrong, remove yourself
              from the situation
            </li>
          </ul>
        </div>

        <div className="tips-section">
          <h3>Neighborhood Safety</h3>
          <ul>
            <li>Get to know your neighbors and local community resources</li>
            <li>Consider joining or starting a neighborhood watch program</li>
            <li>Keep emergency contact numbers easily accessible</li>
            <li>Report suspicious activity to local authorities</li>
            <li>Use this map to stay informed about incidents in your area</li>
          </ul>
        </div>

        <div className="tips-section">
          <h3>Online Safety</h3>
          <ul>
            <li>Be cautious about sharing personal information online</li>
            <li>Use strong, unique passwords for all accounts</li>
            <li>Be wary of suspicious emails, messages, or phone calls</li>
            <li>Check privacy settings on social media accounts</li>
            <li>
              Be careful about what you share on social media about your
              location
            </li>
          </ul>
        </div>

        <div className="additional-resources">
          <h3>Additional Resources</h3>
          <div className="resource-links">
            <a href="#" className="resource-link">
              Safety Education Programs
            </a>
            <a href="#" className="resource-link">
              Community Support Groups
            </a>
            <a href="#" className="resource-link">
              Safety Apps & Tools
            </a>
            <a href="#" className="resource-link">
              Mental Health Resources
            </a>
          </div>
        </div>

        <div className="disclaimer">
          <p>
            <strong>Disclaimer:</strong> This map and these resources are
            provided for informational purposes only. Always contact emergency
            services in case of immediate danger.
          </p>
        </div>
      </div>
    </div>
  );
};

export default SafetyTips;
