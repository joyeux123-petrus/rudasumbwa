// Sidebar navigation, section switching, and mobile/collapsible sidebar

document.addEventListener('DOMContentLoaded', function () {
  const sidebar = document.getElementById('sidebar');
  const sidebarToggle = document.getElementById('sidebar-toggle');
  const sidebarOverlay = document.getElementById('sidebar-overlay');
  const sidebarLinks = document.querySelectorAll('.sidebar-link');
  const sections = document.querySelectorAll('.dashboard-section');

  // Sidebar toggle for mobile
  if (sidebarToggle && sidebar && sidebarOverlay) {
    sidebarToggle.addEventListener('click', function () {
      sidebar.classList.add('open');
      sidebarOverlay.classList.add('active');
    });
    sidebarOverlay.addEventListener('click', function () {
      sidebar.classList.remove('open');
      sidebarOverlay.classList.remove('active');
    });
  }

  // Sidebar navigation
  sidebarLinks.forEach(link => {
    link.addEventListener('click', function (e) {
      if (link.classList.contains('logout-link')) {
        // Handle logout (redirect or show modal)
        window.location.href = '/';
        return;
      }
      e.preventDefault();
      sidebarLinks.forEach(l => l.classList.remove('active'));
      link.classList.add('active');
      sections.forEach(section => section.classList.add('hidden'));
      const sectionId = link.getAttribute('data-section');
      const target = document.getElementById(sectionId);
      if (target) {
        target.classList.remove('hidden');
        if (window.gsap) {
          gsap.fromTo(target, {opacity: 0, y: 30}, {opacity: 1, y: 0, duration: 0.5, ease: 'power2.out'});
        }
      }
      // Auto-hide sidebar on mobile after click
      if (window.innerWidth <= 900 && sidebar && sidebarOverlay) {
        sidebar.classList.remove('open');
        sidebarOverlay.classList.remove('active');
      }
    });
  });

  // AI Chat send button (demo only)
  const aiSendBtn = document.querySelector('.ai-send-btn');
  const aiInput = document.querySelector('.ai-input');
  const aiMessages = document.querySelector('.ai-messages');
  if (aiSendBtn && aiInput && aiMessages) {
    aiSendBtn.addEventListener('click', function () {
      const msg = aiInput.value.trim();
      if (!msg) return;
      const userMsg = document.createElement('div');
      userMsg.className = 'ai-message user';
      userMsg.textContent = msg;
      aiMessages.appendChild(userMsg);
      aiInput.value = '';
      // Simulate AI response
      setTimeout(() => {
        const aiMsg = document.createElement('div');
        aiMsg.className = 'ai-message ai';
        aiMsg.textContent = 'Peter says: ' + (msg.includes('quiz') ? 'To create a quiz, click "Create New Quiz" above.' : 'Here to help!');
        aiMessages.appendChild(aiMsg);
        aiMessages.scrollTop = aiMessages.scrollHeight;
      }, 900);
    });
  }
});

// Settings tabs and password toggle logic
document.addEventListener('DOMContentLoaded', function () {
  const tabButtons = document.querySelectorAll('.tab-btn');
  const tabContents = document.querySelectorAll('.tab-content');

  tabButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      tabButtons.forEach(b => {
        b.classList.remove('active');
        b.style.borderBottomColor = 'transparent';
        b.style.color = 'var(--text-main)';
      });
      btn.classList.add('active');
      btn.style.borderBottomColor = 'var(--primary)';
      btn.style.color = 'var(--primary)';

      const target = btn.getAttribute('data-tab');
      tabContents.forEach(content => {
        if (content.id === target) {
          content.classList.remove('hidden');
        } else {
          content.classList.add('hidden');
        }
      });
    });
  });

  // Show/hide password toggle
  const togglePasswordBtn = document.getElementById('toggle-password');
  const newPasswordInput = document.getElementById('new-password');

  if (togglePasswordBtn && newPasswordInput) {
    togglePasswordBtn.addEventListener('click', () => {
      if (newPasswordInput.type === 'password') {
        newPasswordInput.type = 'text';
        togglePasswordBtn.textContent = 'Hide';
      } else {
        newPasswordInput.type = 'password';
        togglePasswordBtn.textContent = 'Show';
      }
    });
  }

  // Password strength meter
  const passwordStrengthBar = document.getElementById('password-strength-bar');

  if (newPasswordInput && passwordStrengthBar) {
    newPasswordInput.addEventListener('input', () => {
      const val = newPasswordInput.value;
      let strength = 0;
      if (val.length > 5) strength += 1;
      if (val.match(/[A-Z]/)) strength += 1;
      if (val.match(/[0-9]/)) strength += 1;
      if (val.match(/[^A-Za-z0-9]/)) strength += 1;
      const width = (strength / 4) * 100;
      passwordStrengthBar.style.width = width + '%';
      if (width < 50) {
        passwordStrengthBar.style.background = 'var(--danger)';
      } else if (width < 75) {
        passwordStrengthBar.style.background = 'orange';
      } else {
        passwordStrengthBar.style.background = 'var(--success)';
      }
    });
  }
});
