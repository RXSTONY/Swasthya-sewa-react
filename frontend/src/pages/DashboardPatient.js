import React from "react";
import DashboardLayout from "./DashboardLayout";
import "../Dashboard.css";
import { useAuth } from "../hooks/auth";

function DashboardPatient() {
  const { user, loading, logout } = useAuth();

  if(loading){
    <div>Loading....</div>
  }
   if (!user) {
    return <div>User not logged in.</div>; // ✅ fallback if user is null
  }
  const getInitials = (name) => {
    if (!name) return "";
    const parts = name.trim().split(" ");
    if (parts.length === 1) return parts[0][0].toUpperCase();
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  };
  return (
    <DashboardLayout role="patient" activePage="home">
      <section className="greeting-card">
        <div className="avatar">{getInitials(user.fullName)}</div>
        <div>
          <h1>Welcome, {user.fullName}</h1>
          <div className="stats-row">
            <div className="stat">
              <span role="img" aria-label="calendar">
                📅
              </span>{" "}
              1 Upcoming
            </div>
            <div className="stat">
              <span role="img" aria-label="check">
                ✅
              </span>{" "}
              2 Completed
            </div>
          </div>
        </div>
      </section>
      <section className="card accent-card">
        <h3>
          <span role="img" aria-label="appointment">
            🗓️
          </span>{" "}
          Booked Appointment
        </h3>
        <p>
          <b>Dr. A. Sharma</b> — April 25, 2024 — 10:00 AM
        </p>
        <button className="accent-btn">View Details</button>
      </section>
      <section className="card ai-card">
        <h3>
          <span role="img" aria-label="ai">
            🤖
          </span>{" "}
          Health Assistant (AI)
        </h3>
        <input type="text" placeholder="Enter your symptoms" />
        <button className="ai-btn">Get Suggestions</button>
      </section>
      <section className="card summary-card">
        <h3>
          <span role="img" aria-label="summary">
            📊
          </span>{" "}
          Quick Health Summary
        </h3>
        <p>
          Hypertension
          <br />
          Last Visit: April 10, 2024
        </p>
        <button className="summary-btn">View Details</button>
      </section>
    </DashboardLayout>
  );
}

export default DashboardPatient;
