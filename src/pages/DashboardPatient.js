
import React from 'react';
import '../Dashboard.css';

function DashboardPatient() {
  return (
    <div className="dashboard">
      <aside className="sidebar">
        <h2>Swasthya Sewa</h2>
        <ul>
          <li className="active">🏠 Home</li>
          <li>📅 Book Appointment</li>
          <li>📂 My Appointments</li>
          <li>📋 Reports</li>
          <li>🚪 Logout</li>
        </ul>
      </aside>
      <main className="main-content">
        <h1>Welcome, John Doe</h1>
        <section className="card">
          <h3>Booked Appointment</h3>
          <p>Dr. A. Sharma — April 25, 2024 — 10:00 AM</p>
          <button>View Details</button>
        </section>
        <section className="card">
          <h3>Health Assistant (AI)</h3>
          <input type="text" placeholder="Enter your symptoms" />
          <button>Get Suggestions</button>
        </section>
        <section className="card">
          <h3>Quick Health Summary</h3>
          <p>Hypertension<br/>Last Visit: April 10, 2024</p>
          <button>View Details</button>
        </section>
      </main>
    </div>
  );
}

export default DashboardPatient;
