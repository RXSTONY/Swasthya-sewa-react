// DoctorPrescription.js
// This page allows doctors to write and send prescriptions for their patients.

import React, { useState } from 'react';
import DashboardLayout from './DashboardLayout';
import '../Dashboard.css';

// Mock patient data for demonstration
const mockPatients = [
  { id: 1, name: 'John Doe' },
  { id: 2, name: 'Jane Smith' },
  { id: 3, name: 'Alex Brown' },
];

function DoctorPrescription() {
  const [form, setForm] = useState({
    patient: '',
    medicines: '',
    notes: '',
  });
  const [submitted, setSubmitted] = useState(false);

  // Handle changes in form fields
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.patient || !form.medicines) {
      alert('Please select a patient and add medicines.');
      return;
    }
    setSubmitted(true);
  };

  // Show confirmation after sending prescription
  if (submitted) {
    return (
      <DashboardLayout role="doctor" activePage="prescription">
        <div className="login-container" style={{maxWidth: 480}}>
          <a className="logo" href="/">Swasthya Sewa</a>
          <div className="card" style={{marginTop: '1.5rem', textAlign: 'center'}}>
            <h1 className="title" style={{marginBottom: '0.5rem'}}>Prescription Sent!</h1>
            <div style={{fontSize: '1.1rem', marginBottom: '1.2rem'}}>
              <p style={{margin: '1rem 0 0 0'}}>Prescription for <b>{form.patient}</b> has been sent.</p>
            </div>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  // Main prescription form
  return (
    <DashboardLayout role="doctor" activePage="prescription">
      <div className="login-container" style={{maxWidth: 480}}>
        <a className="logo" href="/">Swasthya Sewa</a>
        <div className="card" style={{width:'100%', margin:'1.5rem 0 0 0', padding:'2rem 1.5rem', boxShadow:'0 4px 24px rgba(44,62,80,0.10)'}}>
          <h1 className="title" style={{marginBottom: '1.2rem', textAlign:'center'}}>Write Prescription</h1>
          <form onSubmit={handleSubmit} style={{width:'100%'}}>
            {/* Patient selection */}
            <div className="form-group">
              <label style={{fontWeight:600, fontSize:'1rem', marginBottom:'0.3rem', display:'block'}}>Select Patient</label>
              <select name="patient" value={form.patient} onChange={handleChange} style={{width:'100%'}}>
                <option value="">Select Patient</option>
                {mockPatients.map((p, i) => (
                  <option key={i} value={p.name}>{p.name}</option>
                ))}
              </select>
            </div>
            {/* Medicines input */}
            <div className="form-group">
              <label style={{fontWeight:600, fontSize:'1rem', marginBottom:'0.3rem', display:'block'}}>Medicines</label>
              <textarea name="medicines" placeholder="Enter medicines, dosage, etc." value={form.medicines} onChange={handleChange} rows={3} />
            </div>
            {/* Optional notes */}
            <div className="form-group">
              <label style={{fontWeight:600, fontSize:'1rem', marginBottom:'0.3rem', display:'block'}}>Notes (optional)</label>
              <textarea name="notes" placeholder="Additional notes..." value={form.notes} onChange={handleChange} rows={2} />
            </div>
            <button className="login-btn" type="submit" style={{marginTop:'0.7rem'}}>Send Prescription</button>
          </form>
        </div>
      </div>
    </DashboardLayout>
  );
}

export default DoctorPrescription; 