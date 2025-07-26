// Apple-style Clubs Carousel, Modal, Join, Tabs, and Chat Access

document.addEventListener('DOMContentLoaded', function () {
  // Carousel scroll (optional: can add drag/swipe logic)
  const carousel = document.getElementById('clubs-carousel');

  // Modal logic
  const modalOverlay = document.getElementById('club-modal-overlay');
  const modal = document.getElementById('club-modal');
  const modalClose = document.getElementById('club-modal-close');
  let currentClub = null;

  // Club data (for demo, can be dynamic)
  const clubs = {
    drama: {
      name: 'Drama Club', emoji: '🎭', img: 'assets/images/drama-club.jpg',
      motto: 'Express, Act, Inspire.', desc: 'Performing arts and creative theatre productions for all students.',
      meta: '12 members • 3 events', joined: false,
      posts: '<ul><li>Drama Night announced for June 20th!</li><li>Photos from last play uploaded.</li></ul>',
      events: '<ul><li>June 20: Drama Night</li><li>July 5: Improv Workshop</li></ul>',
      chat: [
        {user: 'other', avatar: '🎭', text: 'Welcome to Drama Club chat!'}
      ]
    },
    music: {
      name: 'Music Club', emoji: '🎵', img: 'assets/images/music-club.jpg',
      motto: 'Feel the rhythm, live the beat.', desc: 'Band rehearsals, music production, and live performances. All talents welcome!',
      meta: '18 members • 2 events', joined: true,
      posts: '<ul><li>Music Fest coming soon!</li><li>Practice schedule updated.</li></ul>',
      events: '<ul><li>June 25: Music Fest</li></ul>',
      chat: [
        {user: 'other', avatar: '🎵', text: 'Welcome to Music Club chat!'}
      ]
    }
  };

  // Open modal on View
  document.querySelectorAll('.club-card-apple .view-btn').forEach(btn => {
    btn.addEventListener('click', function (e) {
      e.stopPropagation();
      const card = btn.closest('.club-card-apple');
      const clubKey = card.getAttribute('data-club');
      const club = clubs[clubKey];
      if (!club) return;
      currentClub = clubKey;
      // Fill modal
      document.getElementById('modal-club-img').src = club.img;
      document.getElementById('modal-club-emoji').textContent = club.emoji;
      document.getElementById('modal-club-name').textContent = club.name;
      document.getElementById('modal-club-motto').textContent = club.motto;
      document.getElementById('modal-club-desc').textContent = club.desc;
      document.getElementById('modal-club-meta').textContent = club.meta;
      document.getElementById('modal-joined-badge').classList.toggle('hidden', !club.joined);
      document.getElementById('modal-join-btn').classList.toggle('hidden', club.joined);
      // Tabs
      document.getElementById('modal-tab-posts').innerHTML = club.posts;
      document.getElementById('modal-tab-events').innerHTML = club.events;
      // Chat
      if (club.joined) {
        document.getElementById('modal-chat-locked').classList.add('hidden');
        document.getElementById('modal-chat-box').classList.remove('hidden');
        // Fill chat messages
        const chatBox = document.querySelector('#modal-chat-box .chat-messages');
        chatBox.innerHTML = '';
        club.chat.forEach(msg => {
          const div = document.createElement('div');
          div.className = 'chat-message ' + (msg.user === 'user' ? 'chat-message-user' : 'chat-message-other');
          div.innerHTML = `<span class="chat-avatar">${msg.avatar}</span> <span class="chat-bubble">${msg.text}</span>`;
          chatBox.appendChild(div);
        });
      } else {
        document.getElementById('modal-chat-locked').classList.remove('hidden');
        document.getElementById('modal-chat-box').classList.add('hidden');
      }
      // Show modal
      modalOverlay.classList.remove('hidden');
      modal.classList.remove('hidden');
      // Default to posts tab
      setActiveTab('posts');
    });
  });

  // Join button logic
  document.getElementById('modal-join-btn').addEventListener('click', function () {
    if (!currentClub) return;
    clubs[currentClub].joined = true;
    document.getElementById('modal-joined-badge').classList.remove('hidden');
    document.getElementById('modal-join-btn').classList.add('hidden');
    document.getElementById('modal-chat-locked').classList.add('hidden');
    document.getElementById('modal-chat-box').classList.remove('hidden');
    // Update carousel card
    document.querySelectorAll('.club-card-apple').forEach(card => {
      if (card.getAttribute('data-club') === currentClub) {
        card.setAttribute('data-joined', 'true');
        card.querySelector('.join-btn').classList.add('hidden');
        card.querySelector('.joined-badge').classList.remove('hidden');
      }
    });
  });

  // Modal close
  modalOverlay.addEventListener('click', closeModal);
  modalClose.addEventListener('click', closeModal);
  function closeModal() {
    modalOverlay.classList.add('hidden');
    modal.classList.add('hidden');
  }

  // Tab switching
  document.querySelectorAll('.club-tab-btn').forEach(btn => {
    btn.addEventListener('click', function () {
      document.querySelectorAll('.club-tab-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const tab = btn.getAttribute('data-tab');
      document.querySelectorAll('.club-modal-tab-content').forEach(c => c.classList.add('hidden'));
      document.getElementById('modal-tab-' + tab).classList.remove('hidden');
    });
  });

  // Chat send (demo)
  const chatSendBtn = document.querySelector('.chat-send-btn');
  const chatInput = document.querySelector('.chat-input');
  const chatBox = document.querySelector('#modal-chat-box .chat-messages');
  if (chatSendBtn && chatInput && chatBox) {
    chatSendBtn.addEventListener('click', function () {
      const msg = chatInput.value.trim();
      if (!msg) return;
      const div = document.createElement('div');
      div.className = 'chat-message chat-message-user';
      div.innerHTML = `<span class="chat-avatar">🧑‍🏫</span> <span class="chat-bubble">${msg}</span>`;
      chatBox.appendChild(div);
      chatInput.value = '';
      chatBox.scrollTop = chatBox.scrollHeight;
    });
  }

  // Carousel scroll (optional: smooth scroll on wheel)
  if (carousel) {
    carousel.addEventListener('wheel', function(e) {
      if (e.deltaY === 0) return;
      e.preventDefault();
      carousel.scrollBy({ left: e.deltaY, behavior: 'smooth' });
    });
  }

  // Card click opens modal (same as view)
  document.querySelectorAll('.club-card-apple').forEach(card => {
    card.addEventListener('click', function (e) {
      if (e.target.classList.contains('join-btn') || e.target.classList.contains('view-btn')) return;
      card.querySelector('.view-btn').click();
    });
  });

  // Leave club (cross/X) button logic
  document.querySelectorAll('.club-card-apple .club-leave-btn').forEach(btn => {
    btn.addEventListener('click', function(e) {
      e.stopPropagation();
      const card = btn.closest('.club-card-apple');
      const clubKey = card.getAttribute('data-club');
      if (!clubKey || !clubs[clubKey]) return;
      clubs[clubKey].joined = false;
      card.setAttribute('data-joined', 'false');
      card.querySelector('.joined-badge').classList.add('hidden');
      card.querySelector('.join-btn').classList.remove('hidden');
      btn.classList.add('hidden');
    });
  });
});
