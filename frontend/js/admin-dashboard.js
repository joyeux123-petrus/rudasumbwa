console.log('admin-dashboard.js loaded');
document.addEventListener('DOMContentLoaded', function() {
  const tableBody = document.querySelector('.dashboard-module.glass table tbody');
  const notificationList = document.querySelector('.notification-list');
  const API_BASE = 'http://localhost:3000/api';
  const NOTIFICATION_API = 'http://localhost:3000/api/notifications';

  // Helper to get admin JWT from localStorage (assume login flow sets it)
  function getToken() {
    return localStorage.getItem('adminToken');
  }

  // Fetch pending users
  async function fetchPendingUsers() {
    tableBody.innerHTML = '<tr><td colspan="7">Loading...</td></tr>';
    try {
      const res = await fetch(`${API_BASE}/auth/users?status=Pending`, {
        headers: { 'Authorization': 'Bearer ' + getToken() }
      });
      if (!res.ok) throw new Error('Failed to fetch users');
      let data = await res.json();
      let users = data.users || [];
      console.log('Fetched users:', users);
      if (!Array.isArray(users)) users = [];
      if (users.length === 0) {
        tableBody.innerHTML = '<tr><td colspan="7">No pending users.</td></tr>';
        return;
      }
      tableBody.innerHTML = '';
      users.forEach(user => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
          <td>${user.username}</td>
          <td>${user.role ? (user.role.charAt(0).toUpperCase() + user.role.slice(1)) : 'Unknown'}</td>
          <td>${user.email}</td>
          <td>${user.className || '-'}</td>
          <td>${user.parish || '-'}</td>
          <td>${user.isApproved ? 'Approved' : 'Pending'}</td>
          <td>
            <button class="approve" title="Approve">✅</button>
            <button class="reject" title="Reject">❌</button>
            <button class="resend" title="Resend Email">🔁</button>
          </td>
        `;
        // Attach event listeners
        tr.querySelector('.approve').onclick = () => handleAction('approve', user.email, tr);
        tr.querySelector('.reject').onclick = () => handleAction('reject', user.email, tr);
        tr.querySelector('.resend').onclick = () => handleAction('resend', user.email, tr);
        tableBody.appendChild(tr);
      });
    } catch (err) {
      tableBody.innerHTML = `<tr><td colspan="7" style="color:red">${err.message}</td></tr>`;
    }
  }

  // Fetch notifications
  async function fetchNotifications() {
    notificationList.innerHTML = '<div>Loading notifications...</div>';
    try {
      const res = await fetch(NOTIFICATION_API);
      if (!res.ok) throw new Error('Failed to fetch notifications');
      const notifications = await res.json();
      if (notifications.length === 0) {
        notificationList.innerHTML = '<div>No notifications.</div>';
        return;
      }
      notificationList.innerHTML = '';
      notifications.forEach(notification => {
        const div = document.createElement('div');
        div.className = 'notification-card glass';
        div.textContent = notification.message;
        notificationList.appendChild(div);
      });
    } catch (err) {
      notificationList.innerHTML = `<div style="color:red">${err.message}</div>`;
    }
  }

  // Handle Approve/Reject/Resend
  async function handleAction(action, email, row) {
    row.style.opacity = '0.5';
    let endpoint;
    if (action === 'approve') {
      endpoint = `${API_BASE}/auth/approve-user`;
    } else if (action === 'reject') {
      endpoint = `${API_BASE}/auth/reject-user`;
    } else {
      endpoint = `${API_BASE}/${action}`;
    }
    try {
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + getToken()
        },
        body: JSON.stringify({ email })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Action failed');
      if (action === 'approve' || action === 'reject') {
        row.remove();
      } else if (action === 'resend') {
        row.style.opacity = '1';
        alert('Email resent.');
      }
    } catch (err) {
      row.style.opacity = '1';
      alert(err.message);
    }
  }

  fetchPendingUsers();
  fetchNotifications();
  setInterval(fetchNotifications, 10000); // Poll every 10 seconds
});
