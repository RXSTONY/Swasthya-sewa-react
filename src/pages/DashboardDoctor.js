
import React, { useEffect, useState } from 'react';
import DashboardLayout from './DashboardLayout';
import '../Dashboard.css';

function DashboardDoctor() {
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    const fetchAppointments = async () => {
      const token = localStorage.getItem('token');
      const res = await fetch('http://localhost:5001/api/appointments', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      const data = await res.json();
      if (res.ok) {
        setAppointments(data);
      } else {
        alert(data.message || 'Failed to fetch appointments');
      }
    };
    fetchAppointments();
  }, []);

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
      <section className="card accent-card">
        <h3><span role="img" aria-label="appointment">🗓️</span> Booked Appointments</h3>
        {appointments.length === 0 ? (
          <p>No appointments found.</p>
        ) : (
          appointments.map((appt, idx) => (
            <p key={idx}>
              <b>{appt.doctor}</b> — {new Date(appt.date).toLocaleDateString()} — {new Date(appt.date).toLocaleTimeString()}
            </p>
          ))
        )}
      </section>
    </DashboardLayout>
  );
}

export default DashboardDoctor;
