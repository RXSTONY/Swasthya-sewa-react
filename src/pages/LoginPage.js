// LoginPage.js
// This page handles user login for both patients and doctors.

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../Form.css';

function LoginPage() {
  // State for user role (patient or doctor)
  const [role, setRole] = useState('patient');
  const navigate = useNavigate();

  // Handle login button click
  const handleLogin = () => {
    // Store role in localStorage for later use
    localStorage.setItem('role', role);
    // Redirect to the appropriate dashboard
    if (role === 'patient') {
      navigate('/dashboard-patient');
    } else {
      navigate('/dashboard-doctor');
    }
  };

  return (
    <div className="login-container">
      <h1 className="title">Swasthya Sewa</h1>
      {/* Role toggle buttons */}
      <div className="role-toggle">
        <button onClick={() => setRole('patient')} className={role === 'patient' ? 'active' : ''}>👤 I am Patient</button>
        <button onClick={() => setRole('doctor')} className={role === 'doctor' ? 'active' : ''}>🩺 I am a Doctor</button>
      </div>
      {/* Email/phone input */}
      <div className="form-group">
        <input type="text" placeholder="Email or phone" />
      </div>
      {/* Password input */}
      <div className="form-group">
        <input type="password" placeholder="Password" />
      </div>
      <div className="forgot-password">Forgot Password?</div>
      <button className="login-btn" onClick={handleLogin}>Login</button>
      <div className="signup">Not registered? <a href="/signup">Sign Up</a></div>
    </div>
  );
}

export default LoginPage;
