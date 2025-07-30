import React, { useState } from "react";
import "../DoctorSearch.css";
import { bookAppointment } from "../service/appointment";
import { useNavigate } from "react-router-dom";

function DoctorSearch() {
  const navigate = useNavigate();

  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [form, setForm] = useState({ date: "", time: "", reason: "" });
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState("");

  const API_URL = process.env.REACT_APP_API_URL;

  const handleSearch = async () => {
    if (!query) return;
    setLoading(true);
    setError("");
    setSuccess("");
    try {
      const res = await fetch(`${API_URL}/search?q=${query}`);
      const data = await res.json();
      setResults(data);
    } catch (err) {
      console.error("❌ Error fetching doctors:", err);
      setError("Failed to search doctors. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const openBooking = (doctor) => {
    setSelectedDoctor(doctor);
    setForm({ date: "", time: "", reason: "" });
  };

  const handleFormChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleBook = async () => {
    if (!form.date || !form.time || !form.reason)
      return alert("Please fill all fields");
    setSubmitting(true);
    try {
      await bookAppointment({
        doctor: selectedDoctor._id,
        date: form.date,
        time: form.time,
        reason: form.reason,
      });
      setSuccess("Appointment booked successfully!");
      setSelectedDoctor(null);
    } catch (err) {
      console.error("❌ Booking failed:", err);
      alert("Failed to book appointment.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="search-container">
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

      <h2>🔍 Search Doctors</h2>
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search by name, specialization, clinic..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button onClick={handleSearch}>Search</button>
      </div>

      {loading && <p className="loading">Loading...</p>}
      {error && <p className="error">{error}</p>}
      {success && <p className="success">{success}</p>}

      {results.length > 0 && (
        <table className="results-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Specialization</th>
              <th>Experience</th>
              <th>Clinic</th>
              <th>Clinic Address</th>
              <th>Address</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {results.map((doc) => (
              <tr key={doc._id}>
                <td>{doc.fullName}</td>
                <td>{doc.specialization}</td>
                <td>{doc.experience} yrs</td>
                <td>{doc.clinicName}</td>
                <td>{doc.clinicAddress}</td>
                <td>{doc.address}</td>
                <td>
                  <button onClick={() => openBooking(doc)}>Book</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {!loading && results.length === 0 && query && !error && (
        <p className="no-results">No doctors found for “{query}”.</p>
      )}

      {/* ✅ Appointment Booking Modal */}
      {selectedDoctor && (
        <div className="modal-overlay">
          <div className="modal">
            <h3>📅 Book Appointment with {selectedDoctor.fullName}</h3>
            <input
              type="date"
              name="date"
              value={form.date}
              onChange={handleFormChange}
              placeholder="Date"
            />
            <input
              type="time"
              name="time"
              value={form.time}
              onChange={handleFormChange}
              placeholder="Time"
            />
            <textarea
              name="reason"
              value={form.reason}
              onChange={handleFormChange}
              placeholder="Reason for visit"
            />
            <div className="modal-actions">
              <button onClick={handleBook} disabled={submitting}>
                {submitting ? "Booking..." : "Confirm Booking"}
              </button>
              <button onClick={() => setSelectedDoctor(null)}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default DoctorSearch;
