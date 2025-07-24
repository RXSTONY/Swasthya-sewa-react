// DoctorSchedule.js
// This page displays the doctor's upcoming schedule in a table format.

import React, { useState } from 'react';
import DashboardLayout from './DashboardLayout';
import '../Dashboard.css';

// Mock schedule data for demonstration
const mockSchedule = [
  {
    id: 1,
    patient: 'John Doe',
    date: '2024-05-10',
    time: '10:00',
    status: 'Confirmed',
  },
  {
    id: 2,
    patient: 'Jane Smith',
    date: '2024-05-11',
    time: '11:30',
    status: 'Pending',
  },
  {
    id: 3,
    patient: 'Alex Brown',
    date: '2024-05-12',
    time: '09:00',
    status: 'Confirmed',
  },
];

function DoctorSchedule() {
  const [schedule] = useState(mockSchedule);

  return (
    <DashboardLayout role="doctor" activePage="schedule">
      {/* Center the main content horizontally */}
      <div style={{display:'flex', justifyContent:'center', alignItems:'flex-start', width:'100%'}}>
        <div className="login-container" style={{maxWidth: 700}}>
          <a className="logo" href="/">Swasthya Sewa</a>
          <div className="card" style={{marginTop: '1.5rem', padding: '2rem 1.5rem', boxShadow:'0 4px 24px rgba(44,62,80,0.10)'}}>
            <h1 className="title" style={{marginBottom: '1.2rem', textAlign:'center'}}>My Schedule</h1>
            <div className="report-table">
              <div className="report-table-header">
                <div>Patient</div>
                <div>Date</div>
                <div>Time</div>
                <div>Status</div>
              </div>
              {/* Render each schedule row */}
              {schedule.length === 0 ? (
                <div style={{color:'#888', fontSize:'1rem', textAlign:'center', marginTop:'2rem'}}>No appointments scheduled.</div>
              ) : (
                schedule.map(item => (
                  <div key={item.id} className="report-row">
                    <div><span role="img" aria-label="patient">👤</span> {item.patient}</div>
                    <div><span role="img" aria-label="calendar">📅</span> {item.date}</div>
                    <div><span role="img" aria-label="clock">⏰</span> {item.time}</div>
                    <div style={{color: item.status === 'Confirmed' ? '#1abc9c' : '#f39c12', fontWeight:600}}>{item.status}</div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

export default DoctorSchedule; 