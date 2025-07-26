// Fetch clubs for dropdown
async function loadClubs() {
  try {
    const res = await fetch('/api/clubs', {
      headers: {
        'Authorization': 'Bearer ' + (localStorage.getItem('adminToken') || '')
      }
    });
    const clubs = await res.json();
    const select = document.getElementById('clubSelect');
    clubs.forEach(club => {
      const opt = document.createElement('option');
      opt.value = club.id;
      opt.textContent = club.name;
      select.appendChild(opt);
    });
  } catch (err) {
    document.getElementById('assignAdminResult').textContent = 'Failed to load clubs.';
  }
}

// Autocomplete for user names
const userNameInput = document.getElementById('userNameInput');
const userSuggestions = document.getElementById('userSuggestions');
const userIdInput = document.getElementById('userIdInput');

userNameInput.addEventListener('input', async function() {
  const query = userNameInput.value.trim();
  userSuggestions.innerHTML = '';
  userIdInput.value = '';
  if (query.length < 2) return;
  try {
    const res = await fetch(`/api/users?search=${encodeURIComponent(query)}`, {
      headers: {
        'Authorization': 'Bearer ' + (localStorage.getItem('adminToken') || '')
      }
    });
    const users = await res.json();
    if (users.length === 0) {
      userSuggestions.innerHTML = '<div style="background:#fff; padding:0.5rem; border-radius:0.5rem;">No users found</div>';
      return;
    }
    users.forEach(user => {
      const div = document.createElement('div');
      div.textContent = `${user.name} (${user.email || 'no email'})`;
      div.style.cssText = 'background:#fff; padding:0.5rem; border-radius:0.5rem; cursor:pointer; margin-bottom:2px;';
      div.onclick = () => {
        userNameInput.value = user.name;
        userIdInput.value = user.id;
        userSuggestions.innerHTML = '';
      };
      userSuggestions.appendChild(div);
    });
  } catch (err) {
    userSuggestions.innerHTML = '<div style="background:#fff; padding:0.5rem; border-radius:0.5rem;">Error searching users</div>';
  }
});

document.addEventListener('click', (e) => {
  if (!userSuggestions.contains(e.target) && e.target !== userNameInput) {
    userSuggestions.innerHTML = '';
  }
});

// Handle form submit
const form = document.getElementById('assignAdminForm');
form.addEventListener('submit', async (e) => {
  e.preventDefault();
  const clubId = document.getElementById('clubSelect').value;
  const userId = userIdInput.value;
  const makeAdmin = document.getElementById('makeAdmin').value === 'true';
  if (!userId) {
    document.getElementById('assignAdminResult').textContent = 'Please select a user from suggestions.';
    return;
  }
  try {
    const res = await fetch('/api/club-membership/set-admin', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + (localStorage.getItem('adminToken') || '')
      },
      body: JSON.stringify({ clubId, userId, makeAdmin })
    });
    const data = await res.json();
    document.getElementById('assignAdminResult').textContent = data.message || 'Success!';
  } catch (err) {
    document.getElementById('assignAdminResult').textContent = 'Error assigning admin.';
  }
});

loadClubs();
