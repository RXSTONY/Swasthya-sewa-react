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
        <div className="login-container" style={{maxWidth: 900, width:'100%'}}>
          <a className="logo" href="/">Swasthya Sewa</a>
          <div className="card" style={{marginTop: '1.5rem', padding: '2rem 1.5rem', boxShadow:'0 4px 24px rgba(44,62,80,0.10)'}}>
            <h1 className="title" style={{marginBottom: '1.2rem', textAlign:'center'}}>My Schedule</h1>
            <div style={{overflowX: 'auto', display: 'flex', justifyContent: 'center'}}>
              <table style={{
                width: '100%',
                maxWidth: 800,
                margin: '0 auto',
                borderCollapse: 'separate',
                borderSpacing: 0,
                background: 'transparent',
                textAlign: 'center',
              }}>
                <thead>
                  <tr style={{background: '#e0f7fa'}}>
                    <th style={{padding: '0.9rem 0.5rem', textAlign: 'center', fontWeight: 700, fontSize: '1.05rem', borderTopLeftRadius: 8}}>Date</th>
                    <th style={{padding: '0.9rem 0.5rem', textAlign: 'center', fontWeight: 700, fontSize: '1.05rem'}}>Time</th>
                    <th style={{padding: '0.9rem 0.5rem', textAlign: 'center', fontWeight: 700, fontSize: '1.05rem'}}>Patient</th>
                    <th style={{padding: '0.9rem 0.5rem', textAlign: 'center', fontWeight: 700, fontSize: '1.05rem', borderTopRightRadius: 8}}>Reason</th>
                  </tr>
                </thead>
                <tbody>
                  {schedule.length === 0 ? (
                    <tr>
                      <td colSpan={4} style={{color:'#888', fontSize:'1rem', textAlign:'center', padding: '2rem'}}>No schedule found.</td>
                    </tr>
                  ) : (
                    schedule.map((item, idx) => (
                      <tr key={item.id} style={{background: idx % 2 === 0 ? '#fff' : '#f8fafd'}}>
                        <td style={{padding: '0.8rem 0.5rem', borderBottom: '1px solid #e0e0e0', textAlign: 'center', whiteSpace: 'nowrap'}}>{item.date}</td>
                        <td style={{padding: '0.8rem 0.5rem', borderBottom: '1px solid #e0e0e0', textAlign: 'center', whiteSpace: 'nowrap'}}>{item.time}</td>
                        <td style={{padding: '0.8rem 0.5rem', borderBottom: '1px solid #e0e0e0', textAlign: 'center', whiteSpace: 'nowrap'}}>{item.patient}</td>
                        <td style={{padding: '0.8rem 0.5rem', borderBottom: '1px solid #e0e0e0', textAlign: 'center'}}>{item.reason}</td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

export default DoctorSchedule; 