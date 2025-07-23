import React, { useState } from 'react';
import DashboardLayout from './DashboardLayout';
import '../Dashboard.css';

const mockReports = [
  {
    id: 1,
    date: '2024-04-15',
    type: 'Blood Test',
    doctor: 'Dr. A. Sharma',
    file: '#',
  },
  {
    id: 2,
    date: '2024-03-10',
    type: 'X-Ray',
    doctor: 'Dr. B. Verma',
    file: '#',
  },
  {
    id: 3,
    date: '2024-02-05',
    type: 'Prescription',
    doctor: 'Dr. C. Singh',
    file: '#',
  },
];

function Reports() {
  const [reports] = useState(mockReports);

  return (
    <DashboardLayout role="patient" activePage="reports">
      <div style={{display:'flex', justifyContent:'center', alignItems:'flex-start', width:'100%'}}>
        <div className="login-container" style={{maxWidth: 700, width:'100%'}}>
          <a className="logo" href="/">Swasthya Sewa</a>
          <div className="card" style={{marginTop: '1.5rem', padding: '2rem 1.5rem', boxShadow:'0 4px 24px rgba(44,62,80,0.10)'}}>
            <h1 className="title" style={{marginBottom: '1.2rem', textAlign:'center'}}>My Medical Reports</h1>
            <div className="report-table">
              <div className="report-table-header">
                <div>Date</div>
                <div>Type</div>
                <div>Doctor</div>
                <div>Action</div>
              </div>
              {reports.length === 0 ? (
                <div style={{color:'#888', fontSize:'1rem', textAlign:'center', marginTop:'2rem'}}>No reports found.</div>
              ) : (
                reports.map(report => (
                  <div key={report.id} className="report-row">
                    <div><span role="img" aria-label="calendar">📅</span> {report.date}</div>
                    <div><span role="img" aria-label="type">📄</span> {report.type}</div>
                    <div><span role="img" aria-label="doctor">🩺</span> {report.doctor}</div>
                    <div>
                      <a href={report.file} className="report-btn" download>
                        <span role="img" aria-label="download">⬇️</span> Download
                      </a>
                      <a href={report.file} className="report-btn view-btn" style={{marginLeft:'0.5rem'}} target="_blank" rel="noopener noreferrer">
                        <span role="img" aria-label="view">👁️</span> View
                      </a>
                    </div>
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

export default Reports; 