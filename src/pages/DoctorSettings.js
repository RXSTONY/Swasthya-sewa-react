import React, { useState } from 'react';
import DashboardLayout from './DashboardLayout';
import '../Dashboard.css';

function DoctorSettings() {
  const [form, setForm] = useState({
    name: 'Dr. A. Sharma',
    email: 'dr.sharma@example.com',
    specialization: 'Cardiologist',
    password: '',
  });
  const [saved, setSaved] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <DashboardLayout role="doctor" activePage="settings">
      <div className="login-container" style={{maxWidth: 480}}>
        <a className="logo" href="/">Swasthya Sewa</a>
        <div className="card" style={{width:'100%', margin:'1.5rem 0 0 0', padding:'2rem 1.5rem', boxShadow:'0 4px 24px rgba(44,62,80,0.10)'}}>
          <h1 className="title" style={{marginBottom: '1.2rem', textAlign:'center'}}>Settings</h1>
          <form onSubmit={handleSubmit} style={{width:'100%'}}>
            <div className="form-group">
              <label style={{fontWeight:600, fontSize:'1rem', marginBottom:'0.3rem', display:'block'}}>Name</label>
              <input type="text" name="name" value={form.name} onChange={handleChange} />
            </div>
            <div className="form-group">
              <label style={{fontWeight:600, fontSize:'1rem', marginBottom:'0.3rem', display:'block'}}>Email</label>
              <input type="email" name="email" value={form.email} onChange={handleChange} />
            </div>
            <div className="form-group">
              <label style={{fontWeight:600, fontSize:'1rem', marginBottom:'0.3rem', display:'block'}}>Specialization</label>
              <input type="text" name="specialization" value={form.specialization} onChange={handleChange} />
            </div>
            <div className="form-group">
              <label style={{fontWeight:600, fontSize:'1rem', marginBottom:'0.3rem', display:'block'}}>Password</label>
              <input type="password" name="password" value={form.password} onChange={handleChange} />
            </div>
            <button className="login-btn" type="submit" style={{marginTop:'0.7rem'}}>Save Changes</button>
            {saved && <div style={{color:'#1abc9c', marginTop:'0.7rem', fontWeight:600}}>Saved!</div>}
          </form>
        </div>
      </div>
    </DashboardLayout>
  );
}

export default DoctorSettings; 