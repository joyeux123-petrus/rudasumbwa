// Leaderboard modal logic

document.addEventListener('DOMContentLoaded', function() {
    const studentCards = document.querySelectorAll('.leaderboard-student');
    const modal = document.getElementById('student-modal');
    const modalOverlay = document.getElementById('student-modal-overlay');
    const modalClose = document.getElementById('student-modal-close');
    const modalName = document.getElementById('student-modal-name');
    const modalAvatar = document.getElementById('student-modal-avatar');
    const modalMedal = document.getElementById('student-modal-medal');
    const modalClass = document.getElementById('student-modal-class');
    const modalClubs = document.getElementById('student-modal-clubs');
    const modalXP = document.getElementById('student-modal-xp');

    // Example data for demo
    const students = {
        'Jean Bosco': {
            avatar: 'assets/images/profile-placeholder.png',
            medal: '🥇',
            class: 'S5 Sciences',
            clubs: ['Science Club', 'Music Club'],
            xp: '1500 XP'
        },
        'Marie Claire': {
            avatar: 'assets/images/profile-placeholder.png',
            medal: '🥈',
            class: 'S5 Arts',
            clubs: ['Music Club'],
            xp: '1400 XP'
        },
        'You': {
            avatar: 'assets/images/profile-placeholder.png',
            medal: '🥉',
            class: 'S5 Sciences',
            clubs: ['Science Club'],
            xp: '1300 XP'
        }
    };

    studentCards.forEach(card => {
        card.addEventListener('click', function() {
            const name = this.getAttribute('data-name');
            const data = students[name];
            if (data) {
                modalName.textContent = name;
                modalAvatar.src = data.avatar;
                modalMedal.textContent = data.medal;
                modalClass.textContent = data.class;
                modalClubs.innerHTML = data.clubs.map(club => `<span class='bg-blue-100 text-blue-700 px-2 py-1 rounded mr-2'>${club}</span>`).join(' ');
                modalXP.textContent = data.xp;
                modal.classList.remove('hidden');
                modalOverlay.classList.remove('hidden');
            }
        });
    });
    [modalClose, modalOverlay].forEach(el => {
        el.addEventListener('click', function() {
            modal.classList.add('hidden');
            modalOverlay.classList.add('hidden');
        });
    });
});
