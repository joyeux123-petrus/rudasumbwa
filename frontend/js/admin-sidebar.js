document.addEventListener('DOMContentLoaded', function() {
    const menuLinks = document.querySelectorAll('.admin-menu-link');
    const sections = document.querySelectorAll('.dashboard-module');
    const sidebar = document.getElementById('sidebar');
    const sidebarToggle = document.getElementById('sidebar-toggle');
    const sidebarOverlay = document.getElementById('sidebar-overlay');

    function showSection(sectionId) {
        sections.forEach(section => {
            // Find the h2 inside the section and check its data-section or text
            const h2 = section.querySelector('h2');
            if (!h2) {
                section.style.display = 'none';
                return;
            }
            // Use data-section if present, else fallback to text
            const h2Section = h2.getAttribute('data-section') || h2.textContent.trim().toLowerCase().replace(/[^a-z0-9]+/g, '-');
            if (h2Section === sectionId) {
                section.style.display = 'block';
            } else {
                section.style.display = 'none';
            }
        });
    }

    menuLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const sectionId = this.getAttribute('data-section');
            showSection(sectionId);

            menuLinks.forEach(l => l.parentElement.classList.remove('active'));
            this.parentElement.classList.add('active');
        });
    });

    // Sidebar toggle logic
    if (sidebarToggle && sidebar && sidebarOverlay) {
        sidebarToggle.addEventListener('click', function() {
            sidebar.classList.toggle('open');
            sidebarOverlay.classList.toggle('active');
        });
        sidebarOverlay.addEventListener('click', function() {
            sidebar.classList.remove('open');
            sidebarOverlay.classList.remove('active');
        });
    }

    // Show dashboard home by default
    showSection('dashboard-home');
});
