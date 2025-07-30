import React, { useEffect, useState } from "react";
import DashboardLayout from "./DashboardLayout";
import "../Dashboard.css";
import { useAuth } from "../hooks/auth";
import { getAppointments } from "../service/appointment";

function DashboardDoctor() {
  const { user, loading } = useAuth();
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const data = await getAppointments();
        setAppointments(data.data);
      } catch (error) {
        console.error("Error fetching appointments:", error);
        alert("Something went wrong while fetching appointments.");
      }
    };

    fetchAppointments();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (!user) return <div>User not logged in.</div>;

  const getInitials = (name) => {
    if (!name) return "";
    const parts = name.trim().split(" ");
    return (parts[0][0] + (parts[1]?.[0] || "")).toUpperCase();
  };

  return (
    <DashboardLayout role="doctor" activePage="dashboard">
      <section className="greeting-card doctor-greeting">
        <div className="avatar">{getInitials(user.fullName)}</div>
        <div>
          <h1>Welcome, Dr. {user.fullName}</h1>
          <div className="stats-row">
            <div className="stat">👥 8 Patients</div>
            <div className="stat">📅 24 Appointments</div>
          </div>
        </div>
      </section>

      <section className="card note-card">
        <h3>📝 Quick Notes</h3>
        <input type="text" placeholder="Add a note..." />
      </section>

      <section className="card patient-card">
        <h3>👥 Recent Patients</h3>
        <ul>
          <li>Halet ffrminute</li>
          <li>Aharjaya — Johnastmyo Test</li>
          <li>Johnson — Atorvastatin 20 mg</li>
        </ul>
      </section>

      <section className="card accent-card">
        <h3>🗓️ Booked Appointments</h3>
        {appointments.length === 0 ? (
          <p>No appointments found.</p>
        ) : (
          appointments.map((appt, idx) => (
            <p key={idx}>
              <b>{appt.patient.fullName || "Unknown Patient"}</b> —{" "}
              {new Date(appt.date).toLocaleDateString()} —{" "}
              {new Date(appt.date).toLocaleTimeString()}
            </p>
          ))
        )}
      </section>
    </DashboardLayout>
  );
}

export default DashboardDoctor;
