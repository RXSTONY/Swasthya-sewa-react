// DashboardLayout.js
// Reusable layout for all dashboard pages. Renders the sidebar and main content area.
// Sidebar links and active state are determined by the user role and current page.

import React from 'react';
import '../Dashboard.css';

function DashboardLayout({ role, activePage, children }) {
  // Handles logout by redirecting to the home page
  const handleLogout = () => {
    window.location.href = '/';
  };

  // Sidebar links for patients and doctors
  const patientLinks = [
    { label: 'Home', href: '/dashboard-patient', key: 'home' },
    { label: 'Book Appointment', href: '/book-appointment', key: 'book' },
    { label: 'My Appointments', href: '/my-appointments', key: 'appointments' },
    { label: 'Reports', href: '/reports', key: 'reports' },
  ];
  const doctorLinks = [
    { label: 'Dashboard', href: '/dashboard-doctor', key: 'dashboard' },
    { label: 'My Schedule', href: '/doctor-schedule', key: 'schedule' },
    { label: 'Patient Records', href: '/doctor-patients', key: 'patients' },
    { label: 'Write Prescription', href: '/doctor-prescription', key: 'prescription' },
    { label: 'Settings', href: '/doctor-settings', key: 'settings' },
  ];
  const links = role === 'doctor' ? doctorLinks : patientLinks;

  return (
    <div className="dashboard">
      {/* Sidebar navigation with logo and links */}
      <aside className="sidebar">
        <a className="logo" href="/"><h2>Swasthya Sewa</h2></a>
        <ul>
          {links.map(link => (
            <li key={link.key} className={activePage === link.key ? 'active' : ''}>
              <a href={link.href}>{link.label}</a>
            </li>
          ))}
          <li>
            <button onClick={handleLogout}>Logout</button>
          </li>
        </ul>
      </aside>
      {/* Main content area for dashboard pages */}
      <main className="main-content dashboard-grid">
        {children}
      </main>
    </div>
  );
}

export default DashboardLayout; 