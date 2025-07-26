// Demo data and dynamic population for Apple-style landing page

document.addEventListener('DOMContentLoaded', function() {
  // Leaderboard
  const leaderboard = [
    { name: 'Jean Bosco', grade: 'Senior 6', rank: 1, medal: '🥇', info: '98%' },
    { name: 'Marie Claire', grade: 'Senior 5', rank: 2, medal: '🥈', info: '95%' },
    { name: 'Eric Niyonsaba', grade: 'Senior 4', rank: 3, medal: '🥉', info: '93%' },
  ];
  const leaderboardGrid = document.getElementById('leaderboard-grid');
  if (leaderboardGrid) {
    leaderboard.forEach((s, i) => {
      const card = document.createElement('div');
      card.className = 'student-card fade-in ' + (i === 0 ? 'gold' : i === 1 ? 'silver' : 'bronze');
      card.innerHTML = `
        <div class="medal">${s.medal}</div>
        <h3>${s.name}</h3>
        <div class="student-grade">${s.grade}</div>
        <div class="student-info">
          <span class="student-rank">Rank #${s.rank}</span>
          <span>${s.info}</span>
        </div>
      `;
      leaderboardGrid.appendChild(card);
    });
  }

  // Events
  const events = [
    { date: '14 Jun', title: 'School Mass', details: '8:00 AM, Main Chapel' },
    { date: '22 Jun', title: 'Retreat: "Faith in Action"', details: '9:00 AM, Retreat Center' },
    { date: '28 Jun', title: 'Gospel Choir Night', details: '6:00 PM, Auditorium' },
  ];
  const eventsGrid = document.getElementById('events-grid');
  if (eventsGrid) {
    events.forEach(ev => {
      const card = document.createElement('div');
      card.className = 'event-card fade-in';
      card.innerHTML = `
        <div class="event-date"><h3>${ev.date}</h3></div>
        <div class="event-info">
          <h4>${ev.title}</h4>
          <p>${ev.details}</p>
        </div>
      `;
      eventsGrid.appendChild(card);
    });
  }

  // Clubs
  const clubs = [
    { name: 'Tech Innovators', desc: 'Creating futuristic apps, websites, and AI tools.', img: 'https://cdn-icons-png.flaticon.com/512/2721/2721297.png', badge: '20 members' },
    { name: 'Choir Voices', desc: 'Lifting souls through hymns and harmonies.', img: 'https://cdn-icons-png.flaticon.com/512/2917/2917995.png', badge: '15 members' },
    { name: 'Young Scientists', desc: 'Experimenting with ideas to transform the world.', img: 'https://cdn-icons-png.flaticon.com/512/2721/2721297.png', badge: '18 members' },
  ];
  const clubsGrid = document.getElementById('clubs-grid');
  if (clubsGrid) {
    clubs.forEach(club => {
      const card = document.createElement('div');
      card.className = 'club-card fade-in';
      card.innerHTML = `
        <img src="${club.img}" alt="${club.name} Logo" />
        <h4>${club.name}</h4>
        <p>${club.desc}</p>
        <div class="club-info"><span class="club-badge">${club.badge}</span></div>
      `;
      clubsGrid.appendChild(card);
    });
  }

  // News
  const news = [
    { title: 'Inter-School Debate Win', date: 'June 2025', desc: 'Our debate team won the regional championship!', img: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=600&h=400&fit=crop' },
    { title: 'New Science Lab Opened', date: 'May 2025', desc: 'State-of-the-art science lab inaugurated for all students.', img: 'https://images.unsplash.com/photo-1513258496099-48168024aec0?w=600&h=400&fit=crop' },
  ];
  const newsGrid = document.getElementById('news-grid');
  if (newsGrid) {
    news.forEach(n => {
      const card = document.createElement('div');
      card.className = 'news-card fade-in';
      card.innerHTML = `
        <img src="${n.img}" alt="${n.title}" />
        <div class="news-content">
          <div class="news-date">${n.date}</div>
          <h3>${n.title}</h3>
          <p>${n.desc}</p>
          <button class="read-more-btn">Read More</button>
        </div>
      `;
      newsGrid.appendChild(card);
    });
  }

  // Gospel (demo)
  const gospelText = document.getElementById('gospel-text');
  if (gospelText) {
    gospelText.innerHTML =
      '“Come to me, all you who labor and are burdened, and I will give you rest.”<footer>- Matthew 11:28</footer>';
  }
});
