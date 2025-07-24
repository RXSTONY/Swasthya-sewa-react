// DashboardPatient.js
// Main dashboard page for patients. Shows greeting, quick stats, and shortcuts to key features.

import React from 'react';
import DashboardLayout from './DashboardLayout';
import '../Dashboard.css';

function DashboardPatient() {
  // TODO: Replace hardcoded user info and stats with real data from backend
  return (
    <DashboardLayout role="patient" activePage="home">
      {/* Greeting and quick stats */}
      <section className="greeting-card">
        <div className="avatar">JD</div>
        <div>
          <h1>Welcome, John Doe</h1>
          <div className="stats-row">
            <div className="stat">Upcoming: 1</div>
            <div className="stat">Completed: 2</div>
          </div>
        </div>
      </section>
      {/* Booked appointment shortcut */}
      <section className="card accent-card">
        <h3>Booked Appointment</h3>
        <p><b>Dr. A. Sharma</b> — April 25, 2024 — 10:00 AM</p>
        <button className="accent-btn">View Details</button>
      </section>
      {/* AI health assistant shortcut */}
      <section className="card ai-card">
        <h3>Health Assistant (AI)</h3>
        <input type="text" placeholder="Describe your symptoms..." />
        <button className="ai-btn">Get Suggestions</button>
      </section>
      {/* Quick health summary shortcut */}
      <section className="card summary-card">
        <h3>Quick Health Summary</h3>
        <p>Condition: Hypertension<br/>Last Visit: April 10, 2024</p>
        <button className="summary-btn">View Details</button>
      </section>
    </DashboardLayout>
  );
}

export default DashboardPatient;
