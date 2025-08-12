// settings.js - Unified settings logic for all roles

// Tab switching
const tabBtns = document.querySelectorAll('.tab-btn');
const tabContents = document.querySelectorAll('.tab-content');
tabBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    tabBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    tabContents.forEach(tc => tc.style.display = 'none');
    document.getElementById(btn.dataset.tab + '-tab').style.display = '';
  });
});

// Show admin tab if user is admin
function getToken() { return localStorage.getItem('token'); }
function parseJwt(token) {
  if (!token) return null;
  try {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
    return JSON.parse(jsonPayload);
  } catch (e) { return null; }
}

document.addEventListener('DOMContentLoaded', () => {
  const token = getToken();
  const user = parseJwt(token);
  if (user && user.role === 'admin') {
    document.getElementById('adminTabBtn').style.display = '';
    document.getElementById('admin-tab').style.display = 'none'; // Only show when tab is clicked
  }
  // Prefill profile form (fetch from API if needed)
  // ...
});

// Profile picture preview
const profilePicInput = document.getElementById('profile-pic-upload');
const profilePicPreview = document.getElementById('profile-pic-preview');
if (profilePicInput && profilePicPreview) {
  profilePicInput.addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = function(evt) {
        profilePicPreview.src = evt.target.result;
      };
      reader.readAsDataURL(file);
    }
  });
}
// Logout logic
const logoutBtn = document.getElementById('logout-btn');
if (logoutBtn) {
  logoutBtn.addEventListener('click', () => {
    localStorage.removeItem('token');
    window.location.href = 'login.html';
  });
}
