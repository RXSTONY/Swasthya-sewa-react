
import React from 'react';
import '../Dashboard.css';

function DashboardDoctor() {
  return (
    <div className="dashboard">
      <aside className="sidebar">
        <h2>Swasthya Sewa</h2>
        <ul>
          <li className="active">📊 Dashboard</li>
          <li>📅 My Schedule</li>
          <li>📁 Patient Records</li>
          <li>📝 Write Prescription</li>
          <li>⚙️ Settings</li>
        </ul>
      </aside>
      <main className="main-content">
        <h1>Welcome, Dr. A. Sharma</h1>
        <section className="card">
          <h3>Quick Notes</h3>
          <input type="text" placeholder="Add a note..." />
        </section>
        <section className="card">
          <h3>Total Patients</h3>
          <ul>
            <li>8 — Halet ffrminute</li>
            <li>Aharjaya — Johnastmyo Test</li>
            <li>Johnson — Atorvastatin 20 mg</li>
          </ul>
        </section>
        <section className="card">
          <h3>Total Appointments</h3>
          <p>8 Total Patients<br/>24 Appointments This Week</p>
        </section>
      </main>
    </div>
  );
}

export default DashboardDoctor;
