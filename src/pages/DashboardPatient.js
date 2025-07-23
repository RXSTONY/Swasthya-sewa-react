
import React from 'react';
import DashboardLayout from './DashboardLayout';
import '../Dashboard.css';

function DashboardPatient() {
  return (
    <DashboardLayout role="patient" activePage="home">
      <section className="greeting-card">
        <div className="avatar">JD</div>
        <div>
          <h1>Welcome, John Doe</h1>
          <div className="stats-row">
            <div className="stat"><span role="img" aria-label="calendar">📅</span> 1 Upcoming</div>
            <div className="stat"><span role="img" aria-label="check">✅</span> 2 Completed</div>
          </div>
        </div>
      </section>
      <section className="card accent-card">
        <h3><span role="img" aria-label="appointment">🗓️</span> Booked Appointment</h3>
        <p><b>Dr. A. Sharma</b> — April 25, 2024 — 10:00 AM</p>
        <button className="accent-btn">View Details</button>
      </section>
      <section className="card ai-card">
        <h3><span role="img" aria-label="ai">🤖</span> Health Assistant (AI)</h3>
        <input type="text" placeholder="Enter your symptoms" />
        <button className="ai-btn">Get Suggestions</button>
      </section>
      <section className="card summary-card">
        <h3><span role="img" aria-label="summary">📊</span> Quick Health Summary</h3>
        <p>Hypertension<br/>Last Visit: April 10, 2024</p>
        <button className="summary-btn">View Details</button>
      </section>
    </DashboardLayout>
  );
}

export default DashboardPatient;
