
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../Form.css';

function LoginPage() {
  const [role, setRole] = useState('patient');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await fetch('http://localhost:5001/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: email, password })
      });
      const data = await res.json();
      if (res.ok) {
        localStorage.setItem('role', role);
        localStorage.setItem('token', data.token);
        if (role === 'patient') {
          navigate('/dashboard-patient');
        } else {
          navigate('/dashboard-doctor');
        }
      } else {
        alert(data.message || 'Login failed');
      }
    } catch (err) {
      alert('Login failed. Please try again.');
    }
  };
  return (
    <div className="login-container">
      <h1 className="title">Swasthya Sewa</h1>
      <div className="role-toggle">
        <button onClick={() => setRole('patient')} className={role === 'patient' ? 'active' : ''}>👤 I am Patient</button>
        <button onClick={() => setRole('doctor')} className={role === 'doctor' ? 'active' : ''}>🩺 I am a Doctor</button>
      </div>
      <div className="form-group">
      <input type="text" placeholder="Email or phone" value={email} onChange={e => setEmail(e.target.value)} />
     
      </div>
      <div className="form-group">
      <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />
      </div>
      <div className="forgot-password">Forgot Password?</div>
      <button className="login-btn" onClick={handleLogin}>Login</button>
      <div className="signup">Not registered? <a href="/signup">Sign Up</a></div>
    </div>
  );

}

export default LoginPage;
