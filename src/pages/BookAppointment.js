// BookAppointment.js
// This page allows patients to book an appointment with a doctor. Includes smart search and form validation.

import React, { useState } from 'react';
import DashboardLayout from './DashboardLayout';
import '../Form.css';

// Mock doctor data for demonstration
const doctors = [
  { id: 'D001', name: 'Dr. A. Sharma', specialization: 'Cardiologist', conditions: ['Heart Disease', 'Hypertension'] },
  { id: 'D002', name: 'Dr. B. Verma', specialization: 'Dermatologist', conditions: ['Skin Rash', 'Acne'] },
  { id: 'D003', name: 'Dr. C. Singh', specialization: 'General Physician', conditions: ['Fever', 'Cough', 'Cold'] },
];

const allSpecializations = Array.from(new Set(doctors.map(d => d.specialization)));
const allConditions = Array.from(new Set(doctors.flatMap(d => d.conditions)));

function BookAppointment() {
  // State for form fields
  const [form, setForm] = useState({
    doctor: '',
    date: '',
    time: '',
    reason: '',
  });
  // State for search/filter
  const [searchType, setSearchType] = useState('nameOrId');
  const [searchValue, setSearchValue] = useState('');
  const [filteredDoctors, setFilteredDoctors] = useState(doctors);
  const [submitted, setSubmitted] = useState(false);

  // Handle changes in form fields
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Handle doctor search/filter
  const handleSmartSearch = (type, value) => {
    setSearchType(type);
    setSearchValue(value);
    let filtered = doctors;
    if (type === 'condition' && value) {
      filtered = doctors.filter(doc => doc.conditions.some(c => c.toLowerCase().includes(value.toLowerCase())));
    } else if (type === 'specialist' && value) {
      filtered = doctors.filter(doc => doc.specialization.toLowerCase().includes(value.toLowerCase()));
    } else if (type === 'nameOrId' && value) {
      filtered = doctors.filter(doc =>
        doc.name.toLowerCase().includes(value.toLowerCase()) ||
        doc.id.toLowerCase().includes(value.toLowerCase())
      );
    }
    setFilteredDoctors(filtered);
    setForm(f => ({ ...f, doctor: '' }));
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // Validate fields
    if (!form.doctor || !form.date || !form.time || !form.reason) {
      alert('Please fill in all fields.');
      return;
    }
    setSubmitted(true);
  };

  // Show confirmation after booking
  if (submitted) {
    return (
      <DashboardLayout role="patient" activePage="book">
        <div style={{display:'flex', justifyContent:'center', alignItems:'flex-start', width:'100%'}}>
          <div className="login-container" style={{maxWidth: 480}}>
            <a className="logo" href="/">Swasthya Sewa</a>
            <div className="card" style={{marginTop: '1.5rem', textAlign: 'center'}}>
              <h1 className="title" style={{marginBottom: '0.5rem'}}>Appointment Booked!</h1>
              <div style={{fontSize: '1.1rem', marginBottom: '1.2rem'}}>
                <span role="img" aria-label="success" style={{fontSize: '2.2rem', color: '#1abc9c'}}>✅</span>
                <p style={{margin: '1rem 0 0 0'}}>Your appointment with <b>{form.doctor}</b> is scheduled for <b>{form.date}</b> at <b>{form.time}</b>.</p>
              </div>
              <a href="/dashboard-patient" className="login-btn" style={{textAlign:'center'}}>Go to Dashboard</a>
            </div>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  // Main booking form
  return (
    <DashboardLayout role="patient" activePage="book">
      <div style={{display:'flex', justifyContent:'center', alignItems:'flex-start', width:'100%'}}>
        <div className="login-container" style={{maxWidth: 480}}>
          <a className="logo" href="/">Swasthya Sewa</a>
          <div className="card" style={{width:'100%', margin:'1.5rem 0 0 0', padding:'2rem 1.5rem', boxShadow:'0 4px 24px rgba(44,62,80,0.10)'}}>
            <h1 className="title" style={{marginBottom: '1.2rem', textAlign:'center'}}>Book Appointment</h1>
            <form onSubmit={handleSubmit} style={{width:'100%'}}>
              {/* Doctor search and selection */}
              <div style={{marginBottom:'1.2rem'}}>
                <div style={{fontWeight:600, fontSize:'1.08rem', marginBottom:'0.5rem', display:'flex', alignItems:'center', gap:'0.5rem'}}>
                  <span role="img" aria-label="doctor">🩺</span> Find a Doctor
                </div>
                <input
                  type="text"
                  placeholder="Search by doctor name or ID..."
                  value={searchType === 'nameOrId' ? searchValue : ''}
                  onChange={e => {
                    setSearchType('nameOrId');
                    handleSmartSearch('nameOrId', e.target.value);
                  }}
                  className="mb-1"
                  style={{width:'100%'}}
                />
                <div style={{display:'flex', gap:'0.5rem', marginTop:'0.5rem'}}>
                  <select
                    value={searchType === 'condition' ? searchValue : ''}
                    onChange={e => {
                      setSearchType('condition');
                      handleSmartSearch('condition', e.target.value);
                    }}
                    style={{flex:1}}
                  >
                    <option value="">Search by Condition</option>
                    {allConditions.map((cond, i) => (
                      <option key={i} value={cond}>{cond}</option>
                    ))}
                  </select>
                  <select
                    value={searchType === 'specialist' ? searchValue : ''}
                    onChange={e => {
                      setSearchType('specialist');
                      handleSmartSearch('specialist', e.target.value);
                    }}
                    style={{flex:1}}
                  >
                    <option value="">Search by Specialist</option>
                    {allSpecializations.map((spec, i) => (
                      <option key={i} value={spec}>{spec}</option>
                    ))}
                  </select>
                </div>
              </div>
              {/* Doctor dropdown */}
              <div style={{marginBottom:'1.2rem'}}>
                <label style={{fontWeight:600, fontSize:'1rem', marginBottom:'0.3rem', display:'block'}}>Select Doctor</label>
                <select name="doctor" value={form.doctor} onChange={handleChange} style={{width:'100%'}}>
                  <option value="">Select Doctor</option>
                  {filteredDoctors.map((doc, i) => (
                    <option key={i} value={doc.name}>{doc.name} ({doc.id}, {doc.specialization})</option>
                  ))}
                </select>
                <div style={{fontSize:'0.92rem', color:'#888', marginTop:'0.2rem'}}>
                  Can’t find your doctor? Try searching by condition or specialist.
                </div>
              </div>
              {/* Date, time, reason fields */}
              <div className="form-group">
                <label style={{fontWeight:600, fontSize:'1rem', marginBottom:'0.3rem', display:'block'}}><span role="img" aria-label="calendar">📅</span> Date</label>
                <input type="date" name="date" value={form.date} onChange={handleChange} />
              </div>
              <div className="form-group">
                <label style={{fontWeight:600, fontSize:'1rem', marginBottom:'0.3rem', display:'block'}}><span role="img" aria-label="clock">⏰</span> Time</label>
                <input type="time" name="time" value={form.time} onChange={handleChange} />
              </div>
              <div className="form-group">
                <label style={{fontWeight:600, fontSize:'1rem', marginBottom:'0.3rem', display:'block'}}><span role="img" aria-label="note">📝</span> Reason for Visit</label>
                <textarea name="reason" placeholder="Describe your symptoms or reason for visit..." value={form.reason} onChange={handleChange} rows={3} />
              </div>
              <button className="login-btn" type="submit" style={{marginTop:'0.7rem'}}>Book Appointment</button>
            </form>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

export default BookAppointment; 