let selectedRole = 'patient';

document.getElementById('patientBtn').addEventListener('click', () => {
  selectedRole = 'patient';
  toggleActive();
});

document.getElementById('doctorBtn').addEventListener('click', () => {
  selectedRole = 'doctor';
  toggleActive();
});

function toggleActive() {
  document.getElementById('patientBtn').classList.toggle('active', selectedRole === 'patient');
  document.getElementById('doctorBtn').classList.toggle('active', selectedRole === 'doctor');
}

function login() {
  localStorage.setItem('role', selectedRole);
  if (selectedRole === 'patient') {
    window.location.href = 'dashboard-patient.html';
  } else {
    window.location.href = 'dashboard-doctor.html';
  }
}
