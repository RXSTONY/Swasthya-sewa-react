import React, { useState } from 'react';
import '../Form.css';

function SignupPage() {
  const [role, setRole] = useState('patient');
  const [form, setForm] = useState({
    fullName: '',
    email: '',
    phone: '',
    password: '',
    dob: '',
    gender: '',
    address: '',
    emergencyContact: '',
    medicalHistory: '',
    licenseNumber: '',
    specialization: '',
    experience: '',
    clinicName: '',
    clinicAddress: '',
  });
  const [codeError, setCodeError] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.id]: e.target.value });
  };

  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleSignup = async () => {
    if (!validateEmail(form.email)) {
      setCodeError('Please enter a valid email.');
      return;
    }
    setCodeError('');

    const payload = {
      role,
      fullName: form.fullName,
      username: form.email,
      phone: form.phone,
      password: form.password,
      dob: form.dob,
      gender: form.gender,
      address: form.address,
      ...(role === 'patient' && {
        emergencyContact: form.emergencyContact,
        medicalHistory: form.medicalHistory,
      }),
      ...(role === 'doctor' && {
        licenseNumber: form.licenseNumber,
        specialization: form.specialization,
        experience: Number(form.experience) || 0,
        clinicName: form.clinicName,
        clinicAddress: form.clinicAddress,
      }),
    };

    try {
      const res = await fetch('http://localhost:5001/api/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (res.ok) {
        alert('Account created successfully! Redirecting to login...');
        window.location.href = '/login';
      } else {
        alert(data.message || 'Signup failed');
        console.error('Signup failed:', data);
      }
    } catch (err) {
      console.error('Signup error:', err);
      alert('Signup failed. Please try again.');
    }
  };

  return (
    <div className="login-container">
      <a className="logo" href="/">Swasthya Sewa</a>
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
        {codeError && <div style={{ color: '#e74c3c', marginTop: '0.5rem' }}>{codeError}</div>}
      </div>

      <div className="form-group">
        <input type="tel" placeholder="Phone Number" id="phone" value={form.phone} onChange={handleChange} />
      </div>

      <div className="form-group">
        <input type="password" placeholder="Password" id="password" value={form.password} onChange={handleChange} />
      </div>

      <div className="form-group">
        <label style={{ fontWeight: 600, fontSize: '1rem', marginBottom: '0.3rem', display: 'block' }}>Date of Birth (DOB)</label>
        <input type="date" id="dob" value={form.dob} onChange={handleChange} />
      </div>

      <div className="form-group">
        <select id="gender" value={form.gender} onChange={handleChange}>
          <option value="">Select Gender</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="other">Other</option>
        </select>
      </div>

      <div className="form-group">
        <input type="text" placeholder="Address" id="address" value={form.address} onChange={handleChange} />
      </div>

      {/* Patient fields */}
      {role === 'patient' && (
        <>
          <div className="form-group">
            <input type="text" placeholder="Emergency Contact" id="emergencyContact" value={form.emergencyContact} onChange={handleChange} />
          </div>
          <div className="form-group">
            <textarea placeholder="Medical History (optional)" id="medicalHistory" value={form.medicalHistory} onChange={handleChange} rows={3} />
          </div>
        </>
      )}

      {/* Doctor fields */}
      {role === 'doctor' && (
        <>
          <div className="form-group">
            <input type="text" placeholder="Medical License Number" id="licenseNumber" value={form.licenseNumber} onChange={handleChange} />
          </div>
          <div className="form-group">
            <input type="text" placeholder="Specialization" id="specialization" value={form.specialization} onChange={handleChange} />
          </div>
          <div className="form-group">
            <input type="number" placeholder="Years of Experience" id="experience" value={form.experience} onChange={handleChange} min="0" />
          </div>
          <div className="form-group">
            <input type="text" placeholder="Clinic/Hospital Name" id="clinicName" value={form.clinicName} onChange={handleChange} />
          </div>
          <div className="form-group">
            <input type="text" placeholder="Clinic/Hospital Address" id="clinicAddress" value={form.clinicAddress} onChange={handleChange} />
          </div>
        </>
      )}

      <button className="login-btn" onClick={handleSignup}>Create Account</button>
      <div className="signup">Already registered? <a href="/login">Login</a></div>
    </div>
  );
}

export default SignupPage;
