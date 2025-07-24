// MyAppointments.js
// This page displays a patient's upcoming and past appointments in a clean, readable format.

import React, { useState } from 'react';
import DashboardLayout from './DashboardLayout';
import '../Dashboard.css';

// Mock appointment data for demonstration
const mockAppointments = [
  {
    id: 1,
    doctor: 'Dr. A. Sharma',
    specialization: 'Cardiologist',
    date: '2024-05-10',
    time: '10:00',
    status: 'Upcoming',
    reason: 'Routine checkup',
  },
  {
    id: 2,
    doctor: 'Dr. B. Verma',
    specialization: 'Dermatologist',
    date: '2024-04-20',
    time: '15:30',
    status: 'Completed',
    reason: 'Skin rash',
  },
  {
    id: 3,
    doctor: 'Dr. C. Singh',
    specialization: 'General Physician',
    date: '2024-03-15',
    time: '09:00',
    status: 'Completed',
    reason: 'Fever and cough',
  },
];

function MyAppointments() {
  const [appointments] = useState(mockAppointments);
  const today = new Date().toISOString().split('T')[0];

  // Separate upcoming and past appointments
  const upcoming = appointments.filter(app => app.date >= today);
  const past = appointments.filter(app => app.date < today);

  return (
    <DashboardLayout role="patient" activePage="appointments">
      <div style={{display:'flex', justifyContent:'center', alignItems:'flex-start', width:'100%'}}>
        <div className="login-container" style={{maxWidth: 600}}>
          <a className="logo" href="/">Swasthya Sewa</a>
          <div className="card" style={{marginTop: '1.5rem', padding: '2rem 1.5rem', boxShadow:'0 4px 24px rgba(44,62,80,0.10)'}}>
            <h1 className="title" style={{marginBottom: '1.2rem', textAlign:'center'}}>My Appointments</h1>
            {/* Upcoming Appointments Section */}
            <section style={{marginBottom: '2rem'}}>
              <h3 style={{color:'#1abc9c', marginBottom:'1rem', fontWeight:600, fontSize:'1.1rem'}}>Upcoming Appointments</h3>
              {upcoming.length === 0 ? (
                <div style={{color:'#888', fontSize:'1rem'}}>No upcoming appointments.</div>
              ) : (
                upcoming.map(app => (
                  <div key={app.id} className="card" style={{marginBottom:'1rem', background:'#f8fafd', boxShadow:'0 1px 6px rgba(44,62,80,0.06)'}}>
                    <div style={{fontWeight:600, fontSize:'1.08rem'}}>{app.doctor} <span style={{color:'#888', fontWeight:400}}>({app.specialization})</span></div>
                    <div style={{margin:'0.5rem 0'}}><span role="img" aria-label="calendar">📅</span> {app.date} &nbsp; <span role="img" aria-label="clock">⏰</span> {app.time}</div>
                    <div style={{fontSize:'0.97rem', color:'#555'}}>Reason: {app.reason}</div>
                    <div style={{marginTop:'0.5rem', color:'#1abc9c', fontWeight:600}}>{app.status}</div>
                  </div>
                ))
              )}
            </section>
            {/* Past Appointments Section */}
            <section>
              <h3 style={{color:'#aaa', marginBottom:'1rem', fontWeight:600, fontSize:'1.1rem'}}>Past Appointments</h3>
              {past.length === 0 ? (
                <div style={{color:'#888', fontSize:'1rem'}}>No past appointments.</div>
              ) : (
                past.map(app => (
                  <div key={app.id} className="card" style={{marginBottom:'1rem', background:'#fff', boxShadow:'0 1px 6px rgba(44,62,80,0.04)'}}>
                    <div style={{fontWeight:600, fontSize:'1.08rem'}}>{app.doctor} <span style={{color:'#888', fontWeight:400}}>({app.specialization})</span></div>
                    <div style={{margin:'0.5rem 0'}}><span role="img" aria-label="calendar">📅</span> {app.date} &nbsp; <span role="img" aria-label="clock">⏰</span> {app.time}</div>
                    <div style={{fontSize:'0.97rem', color:'#555'}}>Reason: {app.reason}</div>
                    <div style={{marginTop:'0.5rem', color:'#aaa', fontWeight:600}}>{app.status}</div>
                  </div>
                ))
              )}
            </section>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

export default MyAppointments; 