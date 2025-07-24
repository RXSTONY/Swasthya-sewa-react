// DoctorPatients.js
// This page displays a list of the doctor's patients in a table format.

import React, { useState } from 'react';
import DashboardLayout from './DashboardLayout';
import '../Dashboard.css';

// Mock patient data for demonstration
const mockPatients = [
  { id: 1, name: 'John Doe', age: 34, lastVisit: '2024-04-10' },
  { id: 2, name: 'Jane Smith', age: 28, lastVisit: '2024-03-22' },
  { id: 3, name: 'Alex Brown', age: 41, lastVisit: '2024-02-15' },
];

function DoctorPatients() {
  const [patients] = useState(mockPatients);
  const [selectedPatient, setSelectedPatient] = useState(null);

  const handleViewDetails = (patient) => {
    setSelectedPatient(patient);
  };

  const handleCloseModal = () => {
    setSelectedPatient(null);
  };

  return (
    <DashboardLayout role="doctor" activePage="patients">
      {/* Center the main content horizontally */}
      <div style={{display:'flex', justifyContent:'center', alignItems:'flex-start', width:'100%'}}>
        <div className="login-container" style={{maxWidth: 900, width:'100%'}}>
          <a className="logo" href="/">Swasthya Sewa</a>
          <div className="card" style={{marginTop: '1.5rem', padding: '2rem 1.5rem', boxShadow:'0 4px 24px rgba(44,62,80,0.10)'}}>
            <h1 className="title" style={{marginBottom: '1.2rem', textAlign:'center'}}>Patient Records</h1>
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
                    <th style={{padding: '0.9rem 0.5rem', textAlign: 'center', fontWeight: 700, fontSize: '1.05rem', borderTopLeftRadius: 8}}>Name</th>
                    <th style={{padding: '0.9rem 0.5rem', textAlign: 'center', fontWeight: 700, fontSize: '1.05rem'}}>Age</th>
                    <th style={{padding: '0.9rem 0.5rem', textAlign: 'center', fontWeight: 700, fontSize: '1.05rem'}}>Gender</th>
                    <th style={{padding: '0.9rem 0.5rem', textAlign: 'center', fontWeight: 700, fontSize: '1.05rem'}}>Contact</th>
                    <th style={{padding: '0.9rem 0.5rem', textAlign: 'center', fontWeight: 700, fontSize: '1.05rem'}}>Condition</th>
                    <th style={{padding: '0.9rem 0.5rem', textAlign: 'center', fontWeight: 700, fontSize: '1.05rem', borderTopRightRadius: 8}}>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {patients.length === 0 ? (
                    <tr>
                      <td colSpan={6} style={{color:'#888', fontSize:'1rem', textAlign:'center', padding: '2rem'}}>No patient records found.</td>
                    </tr>
                  ) : (
                    patients.map((patient, idx) => (
                      <tr key={patient.id} style={{background: idx % 2 === 0 ? '#fff' : '#f8fafd'}}>
                        <td style={{padding: '0.8rem 0.5rem', borderBottom: '1px solid #e0e0e0', textAlign: 'center', whiteSpace: 'nowrap'}}>{patient.name}</td>
                        <td style={{padding: '0.8rem 0.5rem', borderBottom: '1px solid #e0e0e0', textAlign: 'center', whiteSpace: 'nowrap'}}>{patient.age}</td>
                        <td style={{padding: '0.8rem 0.5rem', borderBottom: '1px solid #e0e0e0', textAlign: 'center', whiteSpace: 'nowrap'}}>{patient.gender}</td>
                        <td style={{padding: '0.8rem 0.5rem', borderBottom: '1px solid #e0e0e0', textAlign: 'center', whiteSpace: 'nowrap'}}>{patient.contact}</td>
                        <td style={{padding: '0.8rem 0.5rem', borderBottom: '1px solid #e0e0e0', textAlign: 'center'}}>{patient.condition}</td>
                        <td style={{padding: '0.8rem 0.5rem', borderBottom: '1px solid #e0e0e0', textAlign: 'center'}}>
                          <button className="accent-btn" onClick={() => handleViewDetails(patient)} style={{minWidth:90}}>View Details</button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
            {/* Modal for patient details */}
            {selectedPatient && (
              <div style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100vw',
                height: '100vh',
                background: 'rgba(44,62,80,0.18)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                zIndex: 1000,
              }}>
                <div style={{
                  background: '#fff',
                  borderRadius: 12,
                  boxShadow: '0 8px 32px rgba(44,62,80,0.18)',
                  padding: '2rem 2.5rem',
                  minWidth: 320,
                  maxWidth: 400,
                  textAlign: 'left',
                  position: 'relative',
                }}>
                  <h2 style={{marginTop:0, marginBottom:'1.2rem', textAlign:'center'}}>Patient Details</h2>
                  <div style={{marginBottom:'0.7rem'}}><strong>Name:</strong> {selectedPatient.name}</div>
                  <div style={{marginBottom:'0.7rem'}}><strong>Age:</strong> {selectedPatient.age}</div>
                  <div style={{marginBottom:'0.7rem'}}><strong>Gender:</strong> {selectedPatient.gender}</div>
                  <div style={{marginBottom:'0.7rem'}}><strong>Contact:</strong> {selectedPatient.contact}</div>
                  <div style={{marginBottom:'0.7rem'}}><strong>Condition:</strong> {selectedPatient.condition}</div>
                  {/* Add more details here if available */}
                  <button className="accent-btn" style={{marginTop:'1.2rem', width:'100%'}} onClick={handleCloseModal}>Close</button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

export default DoctorPatients; 