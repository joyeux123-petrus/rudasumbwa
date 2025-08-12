// Animated background particles for Apple-style effect
(function() {
  const container = document.getElementById('particles-container');
  if (!container) return;
  const PARTICLE_COUNT = 60;
  const particles = [];
  for (let i = 0; i < PARTICLE_COUNT; i++) {
    const p = document.createElement('div');
    p.className = 'particle';
    p.style.top = Math.random() * 100 + 'vh';
    p.style.left = Math.random() * 100 + 'vw';
    p.style.animationDuration = (4 + Math.random() * 4) + 's';
    p.style.opacity = 0.2 + Math.random() * 0.5;
    p.style.transform = `scale(${0.7 + Math.random() * 0.6})`;
    container.appendChild(p);
    particles.push(p);
  }
  // Animate particles on resize
  window.addEventListener('resize', () => {
    particles.forEach(p => {
      p.style.top = Math.random() * 100 + 'vh';
      p.style.left = Math.random() * 100 + 'vw';
    });
  });
})();
