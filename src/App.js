
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import DashboardPatient from './pages/DashboardPatient';
import DashboardDoctor from './pages/DashboardDoctor';
import IntroPage from './pages/IntroPage';
import BookAppointment from './pages/BookAppointment';
import MyAppointments from './pages/MyAppointments';
import Reports from './pages/Reports';
import DoctorSchedule from './pages/DoctorSchedule';
import DoctorPatients from './pages/DoctorPatients';
import DoctorPrescription from './pages/DoctorPrescription';
import DoctorSettings from './pages/DoctorSettings';
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<IntroPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/dashboard-patient" element={<DashboardPatient />} />
        <Route path="/dashboard-doctor" element={<DashboardDoctor />} />
        <Route path="/book-appointment" element={<BookAppointment />} />
        <Route path="/my-appointments" element={<MyAppointments />} />
        <Route path="/reports" element={<Reports />} />
        <Route path="/doctor-schedule" element={<DoctorSchedule />} />
        <Route path="/doctor-patients" element={<DoctorPatients />} />
        <Route path="/doctor-prescription" element={<DoctorPrescription />} />
        <Route path="/doctor-settings" element={<DoctorSettings />} />
      </Routes>
    </Router>
  );
}

export default App;
