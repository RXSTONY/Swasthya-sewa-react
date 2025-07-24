
import React from 'react';
import DashboardLayout from './DashboardLayout';
import '../Dashboard.css';

function DashboardDoctor() {
  return (
    <DashboardLayout role="doctor" activePage="dashboard">
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
      <section className="card note-card">
        <h3><span role="img" aria-label="note">📝</span> Quick Notes</h3>
        <input type="text" placeholder="Add a note..." />
      </section>
      <section className="card patient-card">
        <h3><span role="img" aria-label="patients">👥</span> Recent Patients</h3>
        <ul>
          <li>Halet ffrminute</li>
          <li>Aharjaya — Johnastmyo Test</li>
          <li>Johnson — Atorvastatin 20 mg</li>
        </ul>
      </section>
      <section className="card appointment-card">
        <h3><span role="img" aria-label="calendar">📅</span> This Week's Appointments</h3>
        <p>8 Total Patients<br/>24 Appointments This Week</p>
      </section>
    </DashboardLayout>
  );
}

export default DashboardDoctor;
