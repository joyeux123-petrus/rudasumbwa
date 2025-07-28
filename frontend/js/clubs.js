// Fetch clubs from backend and render cards
async function fetchClubs() {
  try {
    const res = await fetch('http://localhost:3000/api/clubs');
    const clubs = await res.json();
    renderClubs(clubs);
  } catch (err) {
    // Use mock data for preview/demo
    const mockClubs = [
      {
        id: 1,
        name: 'Science Club',
        logo: 'https://img.icons8.com/color/96/000000/physics.png',
        description: 'Explore experiments, science fairs, and STEM fun!'
      },
      {
        id: 2,
        name: 'Volleyball Club',
        logo: 'https://img.icons8.com/color/96/000000/volleyball.png',
        description: 'Join our volleyball team for training, matches, and tournaments.'
      },
      {
        id: 3,
        name: 'Music Club',
        logo: 'https://img.icons8.com/color/96/000000/musical-notes.png',
        description: 'Perform, compose, and enjoy music with fellow students.'
      }
    ];
    renderClubs(mockClubs);
  }
}

function renderClubs(clubs) {
  const container = document.getElementById('clubsContainer');
  container.innerHTML = '';
  clubs.forEach(club => {
    const card = document.createElement('div');
    card.className = 'club-card';
    card.innerHTML = `
      <img class="club-logo" src="${club.logo || 'https://via.placeholder.com/90'}" alt="${club.name} logo">
      <div class="club-title">${club.name}</div>
      <div class="club-desc">${club.description || 'No description yet.'}</div>
      <button class="club-enter-btn" onclick="enterClub(${club.id})">Enter Club</button>
    `;
    container.appendChild(card);
  });
}

window.enterClub = function(clubId) {
  // Redirect to club page (to be implemented)
  window.location.href = `club.html?clubId=${clubId}`;
};

// On page load
fetchClubs();
