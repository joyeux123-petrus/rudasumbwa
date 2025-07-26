// Authentication modal logic for Apple-style landing page
window.openAuthModal = function(mode) {
  document.getElementById('auth-modal').style.display = 'block';
  switchAuthMode(mode);
};
window.closeAuthModal = function() {
  document.getElementById('auth-modal').style.display = 'none';
};
window.switchAuthMode = function(mode) {
  const signinForm = document.getElementById('signin-form');
  const signupForm = document.getElementById('signup-form');
  const signinToggle = document.getElementById('signin-toggle');
  const signupToggle = document.getElementById('signup-toggle');
  const slider = document.getElementById('auth-toggle-slider');
  if (mode === 'signin') {
    signinForm.classList.remove('hidden');
    signupForm.classList.add('hidden');
    signinToggle.classList.add('active');
    signupToggle.classList.remove('active');
    slider.style.transform = 'translateX(0)';
  } else {
    signinForm.classList.add('hidden');
    signupForm.classList.remove('hidden');
    signinToggle.classList.remove('active');
    signupToggle.classList.add('active');
    slider.style.transform = 'translateX(100%)';
  }
};
window.togglePasswordVisibility = function(inputId) {
  const input = document.getElementById(inputId);
  if (input.type === 'password') {
    input.type = 'text';
  } else {
    input.type = 'password';
  }
};
// Success modal logic
window.closeSuccessModal = function() {
  document.getElementById('success-modal').style.display = 'none';
};
// Demo form handlers (replace with real AJAX logic)
document.addEventListener('DOMContentLoaded', function() {
  const signinForm = document.getElementById('signin-form-element');
  const signupForm = document.getElementById('signup-form-element');
  if (signinForm) {
    signinForm.onsubmit = async function(e) {
      e.preventDefault();
      document.getElementById('loading-spinner').style.display = 'flex';
      const formData = new FormData(signinForm);
      const data = {};
      formData.forEach((value, key) => {
        data[key] = value;
      });
      try {
        const response = await fetch('http://localhost:3000/api/auth/signin', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(data)
        });
        document.getElementById('loading-spinner').style.display = 'none';
        if (response.ok) {
          // You can store the token or redirect as needed
          alert('Signed in successfully!');
          closeAuthModal();
        } else {
          const errorData = await response.json();
          alert(errorData.message || 'Login failed. Please try again.');
        }
      } catch (err) {
        document.getElementById('loading-spinner').style.display = 'none';
        alert('Error sending request. Please try again later.');
      }
    };
  }
  if (signupForm) {
    signupForm.onsubmit = async function(e) {
      e.preventDefault();
      document.getElementById('loading-spinner').style.display = 'flex';
      // Collect form data
      const formData = new FormData(signupForm);
      const data = {};
      formData.forEach((value, key) => {
        data[key] = value;
      });
      try {
        const response = await fetch('http://localhost:3000/api/auth/signup', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(data)
        });
        document.getElementById('loading-spinner').style.display = 'none';
        if (response.ok) {
          document.getElementById('auth-modal').style.display = 'none';
          document.getElementById('success-modal').style.display = 'block';
        } else {
          const errorData = await response.json();
          alert(errorData.message || 'Error sending request. Please try again later.');
        }
      } catch (err) {
        document.getElementById('loading-spinner').style.display = 'none';
        alert('Error sending request. Please try again later.');
      }
    };
  }
});
