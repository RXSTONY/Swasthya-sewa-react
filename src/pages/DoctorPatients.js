import React, { useEffect, useState } from 'react';
import DashboardLayout from './DashboardLayout';
import '../Dashboard.css';

function DoctorPatients() {
  const [patients, setPatients] = useState([]);

  useEffect(() => {
    const fetchPatients = async () => {
      const token = localStorage.getItem('token');
      const res = await fetch('http://localhost:5001/api/appointments/patients', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      const data = await res.json();
      if (res.ok) {
        setPatients(data);
      } else {
        alert(data.message || 'Failed to fetch patients');
      }
    };
    fetchPatients();
  }, []);

  return (
    <DashboardLayout role="doctor" activePage="patients">
      <div className="login-container" style={{maxWidth: 700}}>
        <a className="logo" href="/">Swasthya Sewa</a>
        <div className="card" style={{marginTop: '1.5rem', padding: '2rem 1.5rem', boxShadow:'0 4px 24px rgba(44,62,80,0.10)'}}>
          <h1 className="title" style={{marginBottom: '1.2rem', textAlign:'center'}}>Patient Records</h1>
          <div className="report-table">
            <div className="report-table-header">
              <div>Name</div>
              <div>Email</div>
              <div>Action</div>
            </div>
            {patients.length === 0 ? (
              <div style={{color:'#888', fontSize:'1rem', textAlign:'center', marginTop:'2rem'}}>No patients found.</div>
            ) : (
              patients.map(patient => (
                <div key={patient._id} className="report-row">
                  <div><span role="img" aria-label="patient">👤</span> {patient.fullName || patient.username}</div>
                  <div>{patient.email}</div>
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