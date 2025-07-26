// Sidebar toggle and section navigation logic

document.addEventListener('DOMContentLoaded', function() {
    const sidebar = document.getElementById('sidebar');
    const overlay = document.getElementById('sidebar-overlay');
    const openBtn = document.getElementById('sidebar-open-btn');
    const closeBtn = document.getElementById('sidebar-close-btn');
    const navLinks = document.querySelectorAll('.sidebar-link');
    const sections = document.querySelectorAll('.dashboard-section');

    function openSidebar() {
        sidebar.classList.remove('-translate-x-full');
        overlay.classList.remove('hidden');
    }
    function closeSidebar() {
        sidebar.classList.add('-translate-x-full');
        overlay.classList.add('hidden');
    }

    openBtn.addEventListener('click', openSidebar);
    closeBtn.addEventListener('click', closeSidebar);
    overlay.addEventListener('click', closeSidebar);

    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // Allow navigation for clubs link
            if (this.getAttribute('href') && this.getAttribute('href') !== '#') {
                // Let the link navigate normally
                return;
            }
            e.preventDefault();
            const target = this.getAttribute('data-section');
            sections.forEach(sec => {
                if (sec.id === target) {
                    sec.classList.remove('hidden');
                } else {
                    sec.classList.add('hidden');
                }
            });
            closeSidebar();
        });
    });

    // Show only the first section by default
    sections.forEach((sec, i) => {
        if (i === 0) sec.classList.remove('hidden');
        else sec.classList.add('hidden');
    });
});
