import React, { useState } from "react";
import "../Form.css";

const SignupPage = () => {
  const [role, setRole] = useState("patient");
  const [showPassword, setShowPassword] = useState(false);
  const API_URL = process.env.REACT_APP_API_URL;

  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    password: "",
    dob: "",
    gender: "",
    address: "",
    emergencyContact: "",
    medicalHistory: "",
    licenseNumber: "",
    specialization: "",
    experience: "",
    clinicName: "",
    clinicAddress: "",
  });
  const [codeError, setCodeError] = useState("");

  const handleChange = (e) => {
    const { id, value } = e.target;
    setForm((prev) => ({ ...prev, [id]: value }));
  };

  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleSignup = async () => {
    if (!validateEmail(form.email)) {
      setCodeError("Please enter a valid email.");
      return;
    }
    setCodeError("");

    const payload = {
      role,
      fullName: form.fullName,
      username: form.email,
      phone: form.phone,
      password: form.password,
      dob: form.dob,
      gender: form.gender,
      address: form.address,
      ...(role === "patient" && {
        emergencyContact: form.emergencyContact,
        medicalHistory: form.medicalHistory,
      }),
      ...(role === "doctor" && {
        licenseNumber: form.licenseNumber,
        specialization: form.specialization,
        experience: Number(form.experience) || 0,
        clinicName: form.clinicName,
        clinicAddress: form.clinicAddress,
      }),
    };

    try {
      const res = await fetch(`${API_URL}/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (res.ok) {
        alert("Account created successfully! Redirecting to login...");
        window.location.href = "/login";
      } else {
        alert(data.message || "Signup failed");
      }
    } catch (err) {
      console.error("Signup error:", err);
      alert("Signup failed. Please try again.");
    }
  };

  const InputField = ({ id, type = "text", placeholder }) => (
    <div className="form-group">
      <input
        id={id}
        type={type}
        placeholder={placeholder}
        value={form[id]}
        onChange={handleChange}
      />
    </div>
  );

  return (
    <div className="login-container">
      <a className="logo" href="/">
        Swasthya Sewa
      </a>
      <h1 className="title">Create Your Account</h1>

      <div className="role-toggle">
        <button
          onClick={() => setRole("patient")}
          className={role === "patient" ? "active" : ""}
        >
          👤 I am a Patient
        </button>
        <button
          onClick={() => setRole("doctor")}
          className={role === "doctor" ? "active" : ""}
        >
          🩺 I am a Doctor
        </button>
      </div>

      <h3 className="section-title">Basic Information</h3>
      <InputField id="fullName" placeholder="Full Name" />
      <InputField id="email" type="email" placeholder="Email" />
      {codeError && <div className="error-text">{codeError}</div>}
      <InputField id="phone" type="tel" placeholder="Phone Number" />
      <div className="form-group" style={{ position: "relative" }}>
        <input
          id="password"
          type={showPassword ? "text" : "password"}
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
        />
        <button
          type="button"
          onClick={() => setShowPassword((prev) => !prev)}
          style={{
            position: "absolute",
            right: "10px",
            top: "50%",
            transform: "translateY(-50%)",
            background: "none",
            border: "none",
            cursor: "pointer",
            color: "#555",
            fontSize: "0.85rem",
          }}
        >
          {showPassword ? "Hide" : "Show"}
        </button>
      </div>

      <div className="form-group">
        <label>Date of Birth</label>
        <input id="dob" type="date" value={form.dob} onChange={handleChange} />
      </div>
      <div className="form-group">
        <label
          style={{ fontWeight: 600, marginBottom: "0.5rem", display: "block" }}
        >
          Gender
        </label>
        <div className="gender-options">
          {["male", "female", "other"].map((g) => (
            <label
              key={g}
              className={`gender-option ${form.gender === g ? "selected" : ""}`}
            >
              <input
                type="radio"
                name="gender"
                id="gender"
                value={g}
                checked={form.gender === g}
                onChange={(e) => setForm({ ...form, gender: e.target.value })}
              />
              {g.charAt(0).toUpperCase() + g.slice(1)}
            </label>
          ))}
        </div>
      </div>

      <InputField id="address" placeholder="Address" />

      {role === "patient" && (
        <>
          <h3 className="section-title">Emergency Info</h3>
          <InputField id="emergencyContact" placeholder="Emergency Contact" />
          <div className="form-group">
            <textarea
              id="medicalHistory"
              placeholder="Medical History (optional)"
              rows={3}
              value={form.medicalHistory}
              onChange={handleChange}
            />
          </div>
        </>
      )}

      {role === "doctor" && (
        <>
          <h3 className="section-title">Doctor Information</h3>
          <InputField id="licenseNumber" placeholder="Medical License Number" />
          <InputField id="specialization" placeholder="Specialization" />
          <InputField
            id="experience"
            type="number"
            placeholder="Years of Experience"
          />
          <InputField id="clinicName" placeholder="Clinic/Hospital Name" />
          <InputField
            id="clinicAddress"
            placeholder="Clinic/Hospital Address"
          />
        </>
      )}

      <button className="login-btn" onClick={handleSignup}>
        Create Account
      </button>
      <div className="signup">
        Already have an account? <a href="/login">Login</a>
      </div>
    </div>
  );
};

export default SignupPage;

// import React, { useState } from 'react';
// import '../Form.css';

// function SignupPage() {
//   const [role, setRole] = useState('patient');
//   const [form, setForm] = useState({
//     fullName: '',
//     email: '',
//     phone: '',
//     password: '',
//     dob: '',
//     gender: '',
//     address: '',
//     emergencyContact: '',
//     medicalHistory: '',
//     licenseNumber: '',
//     specialization: '',
//     experience: '',
//     clinicName: '',
//     clinicAddress: '',
//   });
//   const [codeError, setCodeError] = useState('');

//   const handleChange = (e) => {
//     setForm({ ...form, [e.target.id]: e.target.value });
//   };

//   const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

//   const handleSignup = async () => {
//     if (!validateEmail(form.email)) {
//       setCodeError('Please enter a valid email.');
//       return;
//     }
//     setCodeError('');

//     const payload = {
//       role,
//       fullName: form.fullName,
//       username: form.email,
//       phone: form.phone,
//       password: form.password,
//       dob: form.dob,
//       gender: form.gender,
//       address: form.address,
//       ...(role === 'patient' && {
//         emergencyContact: form.emergencyContact,
//         medicalHistory: form.medicalHistory,
//       }),
//       ...(role === 'doctor' && {
//         licenseNumber: form.licenseNumber,
//         specialization: form.specialization,
//         experience: Number(form.experience) || 0,
//         clinicName: form.clinicName,
//         clinicAddress: form.clinicAddress,
//       }),
//     };

//     try {
//       const res = await fetch('http://localhost:5001/api/signup', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify(payload),
//       });

//       const data = await res.json();
//       if (res.ok) {
//         alert('Account created successfully! Redirecting to login...');
//         window.location.href = '/login';
//       } else {
//         alert(data.message || 'Signup failed');
//         console.error('Signup failed:', data);
//       }
//     } catch (err) {
//       console.error('Signup error:', err);
//       alert('Signup failed. Please try again.');
//     }
//   };

//   return (
//     <div className="login-container">
//       <a className="logo" href="/">Swasthya Sewa</a>
//       <h1 className="title">Sign Up</h1>
//       <div className="role-toggle">
//         <button onClick={() => setRole('patient')} className={role === 'patient' ? 'active' : ''}>👤 I am Patient</button>
//         <button onClick={() => setRole('doctor')} className={role === 'doctor' ? 'active' : ''}>🩺 I am a Doctor</button>
//       </div>

//       <div className="form-group">
//         <input type="text" placeholder="Full Name" id="fullName" value={form.fullName} onChange={handleChange} />
//       </div>

//       <div className="form-group">
//         <input type="email" placeholder="Email" id="email" value={form.email} onChange={handleChange} />
//         {codeError && <div style={{ color: '#e74c3c', marginTop: '0.5rem' }}>{codeError}</div>}
//       </div>

//       <div className="form-group">
//         <input type="tel" placeholder="Phone Number" id="phone" value={form.phone} onChange={handleChange} />
//       </div>

//       <div className="form-group">
//         <input type="password" placeholder="Password" id="password" value={form.password} onChange={handleChange} />
//       </div>

//       <div className="form-group">
//         <label style={{ fontWeight: 600, fontSize: '1rem', marginBottom: '0.3rem', display: 'block' }}>Date of Birth (DOB)</label>
//         <input type="date" id="dob" value={form.dob} onChange={handleChange} />
//       </div>

//       <div className="form-group">
//         <select id="gender" value={form.gender} onChange={handleChange}>
//           <option value="">Select Gender</option>
//           <option value="male">Male</option>
//           <option value="female">Female</option>
//           <option value="other">Other</option>
//         </select>
//       </div>

//       <div className="form-group">
//         <input type="text" placeholder="Address" id="address" value={form.address} onChange={handleChange} />
//       </div>

//       {/* Patient fields */}
//       {role === 'patient' && (
//         <>
//           <div className="form-group">
//             <input type="text" placeholder="Emergency Contact" id="emergencyContact" value={form.emergencyContact} onChange={handleChange} />
//           </div>
//           <div className="form-group">
//             <textarea placeholder="Medical History (optional)" id="medicalHistory" value={form.medicalHistory} onChange={handleChange} rows={3} />
//           </div>
//         </>
//       )}

//       {/* Doctor fields */}
//       {role === 'doctor' && (
//         <>
//           <div className="form-group">
//             <input type="text" placeholder="Medical License Number" id="licenseNumber" value={form.licenseNumber} onChange={handleChange} />
//           </div>
//           <div className="form-group">
//             <input type="text" placeholder="Specialization" id="specialization" value={form.specialization} onChange={handleChange} />
//           </div>
//           <div className="form-group">
//             <input type="number" placeholder="Years of Experience" id="experience" value={form.experience} onChange={handleChange} min="0" />
//           </div>
//           <div className="form-group">
//             <input type="text" placeholder="Clinic/Hospital Name" id="clinicName" value={form.clinicName} onChange={handleChange} />
//           </div>
//           <div className="form-group">
//             <input type="text" placeholder="Clinic/Hospital Address" id="clinicAddress" value={form.clinicAddress} onChange={handleChange} />
//           </div>
//         </>
//       )}

//       <button className="login-btn" onClick={handleSignup}>Create Account</button>
//       <div className="signup">Already registered? <a href="/login">Login</a></div>
//     </div>
//   );
// }

// export default SignupPage;
