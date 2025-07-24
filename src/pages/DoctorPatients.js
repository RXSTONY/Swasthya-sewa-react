import React, { useState } from 'react';
import DashboardLayout from './DashboardLayout';
import '../Dashboard.css';

const mockPatients = [
  { id: 1, name: 'John Doe', age: 34, lastVisit: '2024-04-10' },
  { id: 2, name: 'Jane Smith', age: 28, lastVisit: '2024-03-22' },
  { id: 3, name: 'Alex Brown', age: 41, lastVisit: '2024-02-15' },
];

function DoctorPatients() {
  const [patients] = useState(mockPatients);

  return (
    <DashboardLayout role="doctor" activePage="patients">
      <div className="login-container" style={{maxWidth: 700}}>
        <a className="logo" href="/">Swasthya Sewa</a>
        <div className="card" style={{marginTop: '1.5rem', padding: '2rem 1.5rem', boxShadow:'0 4px 24px rgba(44,62,80,0.10)'}}>
          <h1 className="title" style={{marginBottom: '1.2rem', textAlign:'center'}}>Patient Records</h1>
          <div className="report-table">
            <div className="report-table-header">
              <div>Name</div>
              <div>Age</div>
              <div>Last Visit</div>
              <div>Action</div>
            </div>
            {patients.length === 0 ? (
              <div style={{color:'#888', fontSize:'1rem', textAlign:'center', marginTop:'2rem'}}>No patients found.</div>
            ) : (
              patients.map(patient => (
                <div key={patient.id} className="report-row">
                  <div><span role="img" aria-label="patient">👤</span> {patient.name}</div>
                  <div>{patient.age}</div>
                  <div><span role="img" aria-label="calendar">📅</span> {patient.lastVisit}</div>
                  <div>
                    <button className="accent-btn">View Details</button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

export default DoctorPatients; 