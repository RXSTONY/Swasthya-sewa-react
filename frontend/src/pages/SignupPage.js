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
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
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

      <div className="form-group">
        <input
          name="fullName"
          type="text"
          placeholder="Full Name"
          value={form.fullName}
          onChange={handleChange}
        />
      </div>

      <div className="form-group">
        <input
          name="email"
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
        />
        {codeError && <div className="error-text">{codeError}</div>}
      </div>

      <div className="form-group">
        <input
          name="phone"
          type="tel"
          placeholder="Phone Number"
          value={form.phone}
          onChange={handleChange}
        />
      </div>

      <div className="form-group" style={{ position: "relative" }}>
        <input
          name="password"
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
        <input
          name="dob"
          type="date"
          value={form.dob}
          onChange={handleChange}
        />
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
                value={g}
                checked={form.gender === g}
                onChange={handleChange}
              />
              {g.charAt(0).toUpperCase() + g.slice(1)}
            </label>
          ))}
        </div>
      </div>

      <div className="form-group">
        <input
          name="address"
          type="text"
          placeholder="Address "
          value={form.address}
          onChange={handleChange}
        />
      </div>

      {role === "patient" && (
        <>
          <h3 className="section-title">Emergency Info</h3>
          <div className="form-group">
            <input
              name="emergencyContact"
              type="tel"
              placeholder="Emergency Contact"
              value={form.emergencyContact}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <textarea
              name="medicalHistory"
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
          <div className="form-group">
            <input
              name="licenseNumber"
              type="text"
              placeholder="Medical License Number"
              value={form.licenseNumber}
              onChange={handleChange}
            />
            
          </div>
          
          <div className="form-group">
            <input
              name="specialization"
              type="text"
              placeholder="Specialization"
              value={form.specialization}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <input
              name="experience"
              type="number"
              placeholder="Years of Experience"
              value={form.experience}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <input
              name="clinicName"
              type="text"
              placeholder="Clinic/Hospital Name"
              value={form.clinicName}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <input
              name="clinicAddress"
              type="text"
              placeholder="Clinic/Hospital Address"
              value={form.clinicAddress}
              onChange={handleChange}
            />
          </div>
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