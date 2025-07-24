// DashboardDoctor.js
// Main dashboard page for doctors. Shows greeting, quick stats, and shortcuts to key features.

import React from 'react';
import DashboardLayout from './DashboardLayout';
import '../Dashboard.css';

function DashboardDoctor() {
  // TODO: Replace hardcoded doctor info and stats with real data from backend
  return (
    <DashboardLayout role="doctor" activePage="dashboard">
      {/* Greeting and quick stats */}
      <section className="greeting-card doctor-greeting">
        <div className="avatar">AS</div>
        <div>
          <h1>Welcome, Dr. A. Sharma</h1>
          <div className="stats-row">
            <div className="stat"><span role="img" aria-label="patients">👥</span> 8 Patients</div>
            <div className="stat"><span role="img" aria-label="calendar">📅</span> 24 Appointments</div>
          </div>
        </div>
      </section>
      {/* Quick notes shortcut */}
      <section className="card note-card">
        <h3><span role="img" aria-label="note">📝</span> Quick Notes</h3>
        <input type="text" placeholder="Add a note..." />
      </section>
      {/* Recent patients shortcut */}
      <section className="card patient-card">
        <h3><span role="img" aria-label="patients">👥</span> Recent Patients</h3>
        <ul>
          <li>Halet ffrminute</li>
          <li>Aharjaya — Johnastmyo Test</li>
          <li>Johnson — Atorvastatin 20 mg</li>
        </ul>
      </section>
      {/* This week's appointments shortcut */}
      <section className="card appointment-card">
        <h3><span role="img" aria-label="calendar">📅</span> This Week's Appointments</h3>
        <p>8 Total Patients<br/>24 Appointments This Week</p>
      </section>
    </DashboardLayout>
  );
}

export default DashboardDoctor;
