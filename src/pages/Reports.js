// Reports.js
// This page displays a patient's medical reports in a table with download/view actions.

import React, { useState } from 'react';
import DashboardLayout from './DashboardLayout';
import '../Dashboard.css';

// Mock report data for demonstration
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
      {/* Center the main content horizontally */}
      <div style={{display:'flex', justifyContent:'center', alignItems:'flex-start', width:'100%'}}>
        <div className="login-container" style={{maxWidth: 700, width:'100%'}}>
          <a className="logo" href="/">Swasthya Sewa</a>
          <div className="card" style={{marginTop: '1.5rem', padding: '2rem 1.5rem', boxShadow:'0 4px 24px rgba(44,62,80,0.10)'}}>
            <h1 className="title" style={{marginBottom: '1.2rem', textAlign:'center'}}>My Medical Reports</h1>
            {/* Modern, humanized table for reports */}
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
                    <th style={{padding: '0.9rem 0.5rem', textAlign: 'center', fontWeight: 700, fontSize: '1.05rem'}}>Type</th>
                    <th style={{padding: '0.9rem 0.5rem', textAlign: 'center', fontWeight: 700, fontSize: '1.05rem'}}>Doctor</th>
                    <th style={{padding: '0.9rem 0.5rem', textAlign: 'center', fontWeight: 700, fontSize: '1.05rem', borderTopRightRadius: 8}}>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {reports.length === 0 ? (
                    <tr>
                      <td colSpan={4} style={{color:'#888', fontSize:'1rem', textAlign:'center', padding: '2rem'}}>No reports found.</td>
                    </tr>
                  ) : (
                    reports.map((report, idx) => (
                      <tr key={report.id} style={{background: idx % 2 === 0 ? '#fff' : '#f8fafd'}}>
                        <td style={{padding: '0.8rem 0.5rem', borderBottom: '1px solid #e0e0e0', textAlign: 'center', whiteSpace: 'nowrap'}}>{report.date}</td>
                        <td style={{padding: '0.8rem 0.5rem', borderBottom: '1px solid #e0e0e0', textAlign: 'center', whiteSpace: 'nowrap'}}>{report.type}</td>
                        <td style={{padding: '0.8rem 0.5rem', borderBottom: '1px solid #e0e0e0', textAlign: 'center', whiteSpace: 'nowrap'}}>{report.doctor}</td>
                        <td style={{padding: '0.8rem 0.5rem', borderBottom: '1px solid #e0e0e0', textAlign: 'center'}}>
                          <a href={report.file} className="report-btn" download style={{marginRight: '0.5rem'}}>Download</a>
                          <a href={report.file} className="report-btn view-btn" target="_blank" rel="noopener noreferrer">View</a>
                        </td>
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

export default Reports; 