window.onload = function () {
  let signupRole = 'patient';

  const patientBtn = document.getElementById('patientSignUp');
  const doctorBtn = document.getElementById('doctorSignUp');

  patientBtn.addEventListener('click', () => {
    signupRole = 'patient';
    updateSignUpToggle();
  });

  doctorBtn.addEventListener('click', () => {
    signupRole = 'doctor';
    updateSignUpToggle();
  });

  function updateSignUpToggle() {
    patientBtn.classList.toggle('active', signupRole === 'patient');
    doctorBtn.classList.toggle('active', signupRole === 'doctor');
  }

  window.signup = function () {
    const fullName = document.getElementById('fullName').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    const password = document.getElementById('password').value;

    if (!fullName || !email || !phone || !password) {
      alert('Please fill in all fields.');
      return;
    }

    console.log("New Account Created:", {
      role: signupRole,
      fullName,
      email,
      phone,
      password,
    });

    alert("Account created successfully! Redirecting to login...");
    window.location.href = "index.html";
  };
};
