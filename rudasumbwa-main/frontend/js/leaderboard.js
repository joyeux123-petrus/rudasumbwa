// leaderboard.js
// Fetch leaderboard data from backend and render in all relevant pages

document.addEventListener('DOMContentLoaded', function() {
  // For index.html
  const leaderboardGrid = document.getElementById('leaderboard-grid');
  if (leaderboardGrid) {
    fetch('/api/leaderboard')
      .then(res => res.json())
      .then(data => {
        leaderboardGrid.innerHTML = '';
        data.forEach((student, i) => {
          const card = document.createElement('div');
          card.className = 'student-card ' + (i === 0 ? 'gold' : i === 1 ? 'silver' : i === 2 ? 'bronze' : '');
          card.innerHTML = `
            <div class="medal">${i === 0 ? '🥇' : i === 1 ? '🥈' : i === 2 ? '🥉' : ''}</div>
            <h3>${student.name || student.username || 'Unknown'}</h3>
            <p>Class: ${student.class || student.className || '-'}</p>
            <p>Score: ${student.score || student.points || '-'}</p>
          `;
          leaderboardGrid.appendChild(card);
        });
      });
  }

  // For teacher-dashboard.html
  const teacherLeaderboardList = document.querySelector('.leaderboard-list');
  if (teacherLeaderboardList) {
    fetch('/api/leaderboard')
      .then(res => res.json())
      .then(data => {
        teacherLeaderboardList.innerHTML = '';
        data.forEach((student, i) => {
          const row = document.createElement('div');
          row.className = 'leaderboard-row ' + (i === 0 ? 'gold' : i === 1 ? 'silver' : i === 2 ? 'bronze' : '');
          row.innerHTML = `
            <span>${student.name || student.username || 'Unknown'} (${student.class || student.className || '-'})</span>
            <span>${student.score || student.points || '-'}</span>
          `;
          teacherLeaderboardList.appendChild(row);
        });
      });
  }

  // For student.html (if exists)
  const studentLeaderboardList = document.getElementById('student-leaderboard-list');
  if (studentLeaderboardList) {
    fetch('/api/leaderboard')
      .then(res => res.json())
      .then(data => {
        studentLeaderboardList.innerHTML = '';
        data.forEach((student, i) => {
          const row = document.createElement('div');
          row.className = 'leaderboard-row ' + (i === 0 ? 'gold' : i === 1 ? 'silver' : i === 2 ? 'bronze' : '');
          row.innerHTML = `
            <span>${student.name || student.username || 'Unknown'} (${student.class || student.className || '-'})</span>
            <span>${student.score || student.points || '-'}</span>
          `;
          studentLeaderboardList.appendChild(row);
        });
      });
  }
});
