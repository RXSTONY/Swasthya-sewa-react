import React, { useEffect, useState } from 'react';
import DashboardLayout from './DashboardLayout';
import '../Dashboard.css';
import { getAppointments } from '../service/appointment';

function DoctorSchedule() {
  const [schedule, setSchedule] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSchedule = async () => {
      try {
        const data = await getAppointments();
        setSchedule(data.data);
      } catch (err) {
        console.error("❌ Error fetching schedule:", err);
        alert("Failed to fetch schedule.");
      } finally {
        setLoading(false);
      }
    };

    fetchSchedule();
  }, []);

  return (
    <DashboardLayout role="doctor" activePage="schedule">
      <div className="login-container" style={{ maxWidth: 700 }}>
        <a className="logo" href="/">Swasthya Sewa</a>
        <div className="card" style={{ marginTop: '1.5rem', padding: '2rem 1.5rem', boxShadow: '0 4px 24px rgba(44,62,80,0.10)' }}>
          <h1 className="title" style={{ marginBottom: '1.2rem', textAlign: 'center' }}>My Schedule</h1>
          <div className="report-table">
            <div className="report-table-header">
              <div>Patient</div>
              <div>Date</div>
              <div>Time</div>
              <div>Status</div>
            </div>

            {loading ? (
              <div style={{ color: '#888', fontSize: '1rem', textAlign: 'center', marginTop: '2rem' }}>
                Loading schedule...
              </div>
            ) : schedule.length === 0 ? (
              <div style={{ color: '#888', fontSize: '1rem', textAlign: 'center', marginTop: '2rem' }}>
                No appointments scheduled.
              </div>
            ) : (
              schedule.map((item, index) => (
                <div key={item._id || index} className="report-row">
                  <div><span role="img" aria-label="patient">👤</span> {item.patient.fullName || "Unknown"}</div>
                  <div><span role="img" aria-label="calendar">📅</span> {new Date(item.date).toLocaleDateString()}</div>
                  <div><span role="img" aria-label="clock">⏰</span> {new Date(item.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</div>
                  <div style={{ color: '#1abc9c', fontWeight: 600 }}>Confirmed</div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

export default DoctorSchedule;
