// Demo/mock data for clubs
const demoClubs = [
  {
    id: 1,
    name: 'Science Club',
    logo: 'https://img.icons8.com/color/96/000000/physics.png',
    banner: '',
    description: 'Explore experiments, science fairs, and STEM fun!',
    president: 'Alice Uwimana',
    advisor: 'Mr. Jean Bosco',
    wall: [
      { user: 'Alice Uwimana', type: 'post', content: 'Welcome to Science Club! Our next experiment is on Friday.' },
      { user: 'Mr. Jean Bosco', type: 'announcement', content: 'Science Fair registration is open.' }
    ],
    gallery: [
      { type: 'image', url: 'https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=400&q=80', caption: 'Last year science fair' },
      { type: 'video', url: 'https://www.w3schools.com/html/mov_bbb.mp4', caption: 'Experiment demo' }
    ],
    files: [
      { name: 'Experiment Guide.pdf', url: '#' },
      { name: 'Science Fair Rules.docx', url: '#' }
    ],
    achievements: [
      { title: 'Won District Science Fair', date: '2023-07-10' },
      { title: 'Best STEM Club 2022', date: '2022-11-20' }
    ],
    events: [
      { title: 'Science Fair', date: '2024-06-15', location: 'Main Hall' },
      { title: 'Weekly Experiment', date: '2024-06-07', location: 'Lab 2' }
    ],
    leaderboard: [
      { name: 'Alice Uwimana', points: 120 },
      { name: 'Eric Nshimiyimana', points: 95 }
    ],
    chat: [
      { user: 'Alice Uwimana', content: 'Hi team! Ready for the experiment?', time: '09:00' },
      { user: 'Eric Nshimiyimana', content: 'Yes, can’t wait!', time: '09:01' }
    ]
  },
  {
    id: 2,
    name: 'Volleyball Club',
    logo: 'https://img.icons8.com/color/96/000000/volleyball.png',
    banner: '',
    description: 'Join our volleyball team for training, matches, and tournaments.',
    president: 'Jeanette Mukamana',
    advisor: 'Coach Patrick',
    wall: [
      { user: 'Jeanette Mukamana', type: 'post', content: 'Training every Wednesday at 4pm.' },
      { user: 'Coach Patrick', type: 'announcement', content: 'Tournament next month!' }
    ],
    gallery: [
      { type: 'image', url: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80', caption: 'Team photo' }
    ],
    files: [
      { name: 'Training Schedule.pdf', url: '#' }
    ],
    achievements: [
      { title: 'Regional Champions', date: '2023-09-01' }
    ],
    events: [
      { title: 'Friendly Match', date: '2024-06-20', location: 'School Field' }
    ],
    leaderboard: [
      { name: 'Jeanette Mukamana', points: 80 },
      { name: 'Patrick Uwizeye', points: 70 }
    ],
    chat: [
      { user: 'Jeanette Mukamana', content: 'Who is coming to practice?', time: '10:00' },
      { user: 'Patrick Uwizeye', content: 'I will be there!', time: '10:01' }
    ]
  },
  {
    id: 3,
    name: 'Music Club',
    logo: 'https://img.icons8.com/color/96/000000/musical-notes.png',
    banner: '',
    description: 'Perform, compose, and enjoy music with fellow students.',
    president: 'Samuel Habimana',
    advisor: 'Ms. Grace',
    wall: [
      { user: 'Samuel Habimana', type: 'post', content: 'Choir practice on Saturday.' },
      { user: 'Ms. Grace', type: 'announcement', content: 'Concert next week!' }
    ],
    gallery: [
      { type: 'image', url: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=400&q=80', caption: 'Concert' }
    ],
    files: [
      { name: 'Song List.pdf', url: '#' }
    ],
    achievements: [
      { title: 'Best Choir 2023', date: '2023-12-10' }
    ],
    events: [
      { title: 'Music Concert', date: '2024-06-25', location: 'Auditorium' }
    ],
    leaderboard: [
      { name: 'Samuel Habimana', points: 110 },
      { name: 'Alice Uwimana', points: 90 }
    ],
    chat: [
      { user: 'Samuel Habimana', content: 'Let’s practice the new song!', time: '11:00' },
      { user: 'Alice Uwimana', content: 'Sure, I love it!', time: '11:01' }
    ]
  }
];

function getClubId() {
  const params = new URLSearchParams(window.location.search);
  return params.get('clubId');
}

function getDemoClub(clubId) {
  return demoClubs.find(c => c.id == clubId);
}

function renderClubHeader(club) {
  document.getElementById('clubHeader').innerHTML = `
    <div class="club-banner" style="background: linear-gradient(90deg, #4f8cff 0%, #38e7b0 100%); padding: 2rem; text-align:center; color: #fff;">
      <img src="${club.logo}" alt="${club.name} logo" style="width:100px; height:100px; border-radius:50%; background:#fff; box-shadow:0 2px 12px rgba(0,0,0,0.08);">
      <h1 style="margin:1rem 0 0.5rem 0;">${club.name}</h1>
      <p style="font-size:1.2rem;">${club.description}</p>
      <div style="margin-top:1rem;">
        <span style="font-weight:600;">President:</span> ${club.president} &nbsp; | &nbsp;
        <span style="font-weight:600;">Advisor:</span> ${club.advisor}
      </div>
    </div>
  `;
}

function renderTab(tab, club) {
  const content = document.getElementById('clubTabContent');
  if (tab === 'wall') {
    content.innerHTML = `<div class="club-wall">
      <h2>Activity Wall</h2>
      <div class="wall-posts">
        ${club.wall.map(post => `<div class="wall-post ${post.type}"><b>${post.user}:</b> ${post.content}</div>`).join('')}
      </div>
      <div class="wall-new-post"><input type="text" placeholder="Write a post..." disabled style="width:70%;"> <button disabled>Post</button></div>
    </div>`;
  } else if (tab === 'gallery') {
    content.innerHTML = `<div class="club-gallery">
      <h2>Gallery</h2>
      <div class="gallery-items">
        ${club.gallery.map(item => item.type === 'image' ? `<div class="gallery-img"><img src="${item.url}" alt="" style="width:180px; border-radius:1rem;"><div>${item.caption}</div></div>` : `<div class="gallery-video"><video src="${item.url}" controls style="width:180px; border-radius:1rem;"></video><div>${item.caption}</div></div>`).join('')}
      </div>
      <div class="gallery-upload"><input type="file" disabled> <button disabled>Upload</button></div>
    </div>`;
  } else if (tab === 'files') {
    content.innerHTML = `<div class="club-files">
      <h2>Files & Projects</h2>
      <ul>${club.files.map(f => `<li><a href="${f.url}">${f.name}</a></li>`).join('')}</ul>
      <div class="file-upload"><input type="file" disabled> <button disabled>Upload</button></div>
    </div>`;
  } else if (tab === 'achievements') {
    content.innerHTML = `<div class="club-achievements">
      <h2>Achievements</h2>
      <ul>${club.achievements.map(a => `<li><b>${a.title}</b> <span style="color:#888;">(${a.date})</span></li>`).join('')}</ul>
    </div>`;
  } else if (tab === 'events') {
    content.innerHTML = `<div class="club-events">
      <h2>Events Timeline</h2>
      <ul>${club.events.map(e => `<li><b>${e.title}</b> - ${e.date} <span style="color:#888;">@${e.location}</span></li>`).join('')}</ul>
    </div>`;
  } else if (tab === 'chat') {
    content.innerHTML = `<div class="club-chat">
      <h2>Club Chat</h2>
      <div class="chat-area" style="background:#f4f8fb; border-radius:1rem; padding:1rem; max-width:500px; margin:auto; min-height:180px;">
        ${club.chat.map(msg => `<div class="chat-msg"><b>${msg.user}:</b> ${msg.content} <span style="color:#aaa; font-size:0.9em;">${msg.time}</span></div>`).join('')}
      </div>
      <div class="chat-input"><input type="text" placeholder="Type a message..." disabled style="width:70%;"> <button disabled>Send</button></div>
    </div>`;
  } else if (tab === 'leaderboard') {
    content.innerHTML = `<div class="club-leaderboard">
      <h2>Leaderboard</h2>
      <ol>${club.leaderboard.map(l => `<li><b>${l.name}</b> - ${l.points} pts</li>`).join('')}</ol>
    </div>`;
  }
}

function setupTabs(club) {
  const tabs = document.querySelectorAll('.club-tab');
  tabs.forEach(tab => {
    tab.onclick = function() {
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      renderTab(tab.dataset.tab, club);
    };
  });
}

const clubId = getClubId();
const club = getDemoClub(clubId);
if (club) {
  renderClubHeader(club);
  renderTab('wall', club);
  setupTabs(club);
} else {
  document.getElementById('clubMain').innerHTML = '<p style="color:red">Club not found.</p>';
}
