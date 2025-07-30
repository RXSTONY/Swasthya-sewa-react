import React, { useEffect, useState } from "react";
import DashboardLayout from "./DashboardLayout";
import { getAppointments } from "../service/appointment";
import "../Dashboard.css";
import { useNavigate } from "react-router-dom";

function MyAppointments() {
  const navigate = useNavigate();

  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const today = new Date().toISOString().split("T")[0];

  const loadAppointments = async () => {
    try {
      const data = await getAppointments();
      setAppointments(data.data);
    } catch (err) {
      console.error("❌ Failed to fetch appointments:", err);
      setError("Unable to load appointments.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadAppointments();
  }, []);

  const upcoming = appointments.filter((a) => a.date >= today);
  const past = appointments.filter((a) => a.date < today);

  return (
    <DashboardLayout role="patient" activePage="appointments">
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "flex-start",
          width: "100%",
        }}
      >
        <button
          onClick={() => navigate("/dashboard-patient")}
          style={{
            marginBottom: "1rem",
            padding: "6px 12px",
            backgroundColor: "#eee",
            border: "1px solid #ccc",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          ← Back to Dashboard
        </button>

        <div className="login-container" style={{ maxWidth: 600 }}>
          <a className="logo" href="/">
            Swasthya Sewa
          </a>
          <div
            className="card"
            style={{
              marginTop: "1.5rem",
              padding: "2rem 1.5rem",
              boxShadow: "0 4px 24px rgba(44,62,80,0.10)",
            }}
          >
            <h1
              className="title"
              style={{ marginBottom: "1.2rem", textAlign: "center" }}
            >
              My Appointments
            </h1>

            {loading ? (
              <p>Loading...</p>
            ) : error ? (
              <p style={{ color: "red" }}>{error}</p>
            ) : (
              <>
                <section style={{ marginBottom: "2rem" }}>
                  <h3 style={{ color: "#1abc9c", marginBottom: "1rem" }}>
                    Upcoming Appointments
                  </h3>
                  {upcoming.length === 0 ? (
                    <p style={{ color: "#888" }}>No upcoming appointments.</p>
                  ) : (
                    upcoming.map((app) => (
                      <div
                        key={app._id}
                        className="card"
                        style={{ marginBottom: "1rem", background: "#f8fafd" }}
                      >
                        <div>
                          <strong>{app.doctor?.fullName}</strong>{" "}
                          <span style={{ color: "#888" }}>
                            ({app.doctor?.specialization})
                          </span>
                        </div>
                        <div>
                          📅 {app.date} ⏰ {app.time}
                        </div>
                        <div>Reason: {app.reason}</div>
                        <div style={{ color: "#1abc9c" }}>{app.status}</div>
                      </div>
                    ))
                  )}
                </section>

                <section>
                  <h3 style={{ color: "#aaa", marginBottom: "1rem" }}>
                    Past Appointments
                  </h3>
                  {past.length === 0 ? (
                    <p style={{ color: "#888" }}>No past appointments.</p>
                  ) : (
                    past.map((app) => (
                      <div
                        key={app._id}
                        className="card"
                        style={{ marginBottom: "1rem", background: "#fff" }}
                      >
                        <div>
                          <strong>{app.doctor?.fullName}</strong>{" "}
                          <span style={{ color: "#888" }}>
                            ({app.doctor?.specialization})
                          </span>
                        </div>
                        <div>
                          📅 {app.date} ⏰ {app.time}
                        </div>
                        <div>Reason: {app.reason}</div>
                        <div style={{ color: "#aaa" }}>{app.status}</div>
                      </div>
                    ))
                  )}
                </section>
              </>
            )}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

export default MyAppointments;
