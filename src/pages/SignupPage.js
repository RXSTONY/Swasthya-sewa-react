
import React, { useState } from 'react';
import '../Form.css';

function SignupPage() {
  const [role, setRole] = useState('patient');
  const [form, setForm] = useState({ fullName: '', email: '', phone: '', password: '' });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.id]: e.target.value });
  };

  const handleSignup = () => {
    if (!form.fullName || !form.email || !form.phone || !form.password) {
      alert('Please fill in all fields.');
      return;
    }
    console.log('Account Created:', { role, ...form });
    alert('Account created successfully! Redirecting to login...');
    window.location.href = '/login';
  };

  return (
    <div className="login-container">
      <h1 className="title">Sign Up</h1>
      <div className="role-toggle">
        <button onClick={() => setRole('patient')} className={role === 'patient' ? 'active' : ''}>👤 I am Patient</button>
        <button onClick={() => setRole('doctor')} className={role === 'doctor' ? 'active' : ''}>🩺 I am a Doctor</button>
      </div>
      <div className="form-group">
        <input type="text" placeholder="Full Name" id="fullName" value={form.fullName} onChange={handleChange} />
      </div>
      <div className="form-group">
        <input type="email" placeholder="Email" id="email" value={form.email} onChange={handleChange} />
      </div>
      <div className="form-group">
        <input type="tel" placeholder="Phone Number" id="phone" value={form.phone} onChange={handleChange} />
      </div>
      <div className="form-group">
        <input type="password" placeholder="Password" id="password" value={form.password} onChange={handleChange} />
      </div>
      <button className="login-btn" onClick={handleSignup}>Create Account</button>
      <div className="signup">Already registered? <a href="/login">Login</a></div>
    </div>
  );
}

export default SignupPage;
