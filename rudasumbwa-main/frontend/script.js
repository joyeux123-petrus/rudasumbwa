// Leaderboard Editor - Backend Connected Version

let leaderboardData = [];
let currentEditIndex = null;
let isNewEntry = false;

// Fetch leaderboard from backend
async function fetchLeaderboard() {
  const res = await fetch('/api/leaderboard');
  leaderboardData = await res.json();
  renderTable();
}

function renderTable() {
  const tbody = document.getElementById("leaderboard-body");
  tbody.innerHTML = "";
  leaderboardData.forEach((student, index) => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${student.name}</td>
      <td>${student.class}</td>
      <td>${student.parish}</td>
      <td>${student.marks}</td>
      <td>${styleMedal(student.medal)}</td>
      <td><button class="btn edit-btn" onclick="openModal(${index})">Edit</button></td>
      <td><button class="btn delete-btn" onclick="deleteEntry(${index})">X</button></td>
    `;
    tbody.appendChild(tr);
  });
}

function styleMedal(medal) {
  switch (medal) {
    case "Gold": return "🥇 Gold";
    case "Silver": return "🥈 Silver";
    case "Bronze": return "🥉 Bronze";
    default: return "—";
  }
}

function openModal(index) {
  currentEditIndex = index;
  isNewEntry = false;
  const student = leaderboardData[index];
  document.getElementById("editName").value = student.name;
  document.getElementById("editClass").value = student.class;
  document.getElementById("editParish").value = student.parish;
  document.getElementById("editMarks").value = student.marks;
  document.getElementById("editMedal").value = student.medal;
  document.getElementById("editModal").style.display = "flex";
}

function openModalForNew() {
  isNewEntry = true;
  currentEditIndex = leaderboardData.length;
  document.getElementById("editName").value = "";
  document.getElementById("editClass").value = "";
  document.getElementById("editParish").value = "";
  document.getElementById("editMarks").value = "";
  document.getElementById("editMedal").value = "None";
  document.getElementById("editModal").style.display = "flex";
}

function closeModal() {
  document.getElementById("editModal").style.display = "none";
}

async function saveEdit() {
  const updated = {
    name: document.getElementById("editName").value,
    class: document.getElementById("editClass").value,
    parish: document.getElementById("editParish").value,
    marks: parseFloat(document.getElementById("editMarks").value),
    medal: document.getElementById("editMedal").value
  };
  if (isNewEntry) {
    await fetch('/api/leaderboard', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updated)
    });
    isNewEntry = false;
  } else {
    await fetch(`/api/leaderboard/${currentEditIndex}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updated)
    });
  }
  await fetchLeaderboard();
  closeModal();
}

async function deleteEntry(index) {
  if (confirm("Are you sure you want to delete this entry?")) {
    await fetch(`/api/leaderboard/${index}`, { method: 'DELETE' });
    await fetchLeaderboard();
  }
}

function exportJSON() {
  window.location.href = '/api/leaderboard/export';
}

// Initial render
fetchLeaderboard();
