// Clubs Showcase Interactivity

document.addEventListener('DOMContentLoaded', function () {
  // Tag Filtering
  const tags = document.querySelectorAll('.club-tag');
  const cards = document.querySelectorAll('.club-card');

  tags.forEach(tag => {
    tag.addEventListener('click', function () {
      tags.forEach(t => t.classList.remove('active'));
      tag.classList.add('active');
      const selected = tag.getAttribute('data-tag');
      cards.forEach(card => {
        if (selected === 'all' || card.getAttribute('data-tags').includes(selected)) {
          card.style.display = '';
          setTimeout(() => card.classList.remove('fade-out'), 10);
        } else {
          card.classList.add('fade-out');
          setTimeout(() => card.style.display = 'none', 200);
        }
      });
    });
  });

  // Confetti burst on Join button
  document.querySelectorAll('.join-btn').forEach(btn => {
    btn.addEventListener('click', function (e) {
      e.preventDefault();
      btn.classList.add('confetti');
      setTimeout(() => {
        btn.classList.remove('confetti');
        window.location = '/login';
      }, 600);
    });
  });
});

// Optional: fade-out animation for filtering
const style = document.createElement('style');
style.innerHTML = `
.club-card.fade-out {
  opacity: 0;
  transform: scale(0.95);
  transition: opacity 0.2s, transform 0.2s;
}
`;
document.head.appendChild(style);
