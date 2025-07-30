// /services/AppointmentService.js

import axios from "axios";

// Axios instance
const apiClient = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  withCredentials: true,
  timeout: 120000,
});

// ✅ Use token from localStorage instead of cookies
apiClient.interceptors.request.use(
  function (config) {
    const token = localStorage.getItem("token"); // ✅ from localStorage
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    } else {
      console.warn("No token found in localStorage");
    }
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

// ✅ Book a new appointment (only for patients)
const bookAppointment = (appointmentData) => {
  // appointmentData should include: doctor, date, time, reason
  return apiClient.post("/appointments", appointmentData);
};

// ✅ Get all appointments for current user (patient or doctor)
const getAppointments = () => {
  return apiClient.get("/appointments");
};

export { bookAppointment, getAppointments };
