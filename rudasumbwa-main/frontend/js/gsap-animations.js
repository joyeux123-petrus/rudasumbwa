// GSAP Animations for smooth Apple-style transitions
document.addEventListener('DOMContentLoaded', () => {
    if (window.gsap) {
        gsap.from('section', {
            opacity: 0,
            y: 40,
            duration: 0.8,
            stagger: 0.15,
            ease: 'power2.out'
        });
        gsap.from('.glassmorphism', {
            opacity: 0.7,
            scale: 0.98,
            duration: 0.7,
            stagger: 0.1,
            ease: 'power1.out'
        });
    }
});
