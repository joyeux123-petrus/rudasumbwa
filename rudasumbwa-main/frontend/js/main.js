// Smooth scroll to section
window.scrollToSection = function(sectionId) {
  const el = document.getElementById(sectionId);
  if (el) {
    el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    // Close mobile menu if open
    document.getElementById('mobile-menu').style.display = 'none';
  }
};

// Mobile menu toggle
window.toggleMobileMenu = function() {
  const menu = document.getElementById('mobile-menu');
  menu.style.display = (menu.style.display === 'block') ? 'none' : 'block';
};

// Hide mobile menu on resize (desktop)
window.addEventListener('resize', function() {
  if (window.innerWidth > 1024) {
    document.getElementById('mobile-menu').style.display = 'none';
  }
});

// Fade-in animation for sections on scroll
function fadeInOnScroll() {
  const fadeEls = document.querySelectorAll('.fade-in');
  fadeEls.forEach(el => {
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight - 60) {
      el.classList.add('visible');
    }
  });
}
window.addEventListener('scroll', fadeInOnScroll);
window.addEventListener('DOMContentLoaded', fadeInOnScroll);
