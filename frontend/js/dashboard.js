// Dynamic greeting based on time
function setGreeting() {
    const greeting = document.getElementById('greeting');
    const now = new Date();
    const hour = now.getHours();
    let message = 'Welcome back, Student!';
    if (hour < 12) message = 'Good morning, Jean Bosco!';
    else if (hour < 18) message = 'Good afternoon, Jean Bosco!';
    else message = 'Good evening, Jean Bosco!';
    greeting.textContent = message;
}

// Theme switching
function setTheme(theme) {
    document.documentElement.className = theme;
    localStorage.setItem('theme', theme);
}

document.addEventListener('DOMContentLoaded', () => {
    setGreeting();
    // Theme preference
    const themeSelect = document.querySelector('#settings select');
    if (themeSelect) {
        themeSelect.addEventListener('change', (e) => setTheme(e.target.value.toLowerCase()));
    }
    // Load saved theme
    const savedTheme = localStorage.getItem('theme') || 'dark';
    setTheme(savedTheme);

    // Ask Peter AI Chat
    const openChat = document.getElementById('open-chat');
    const chatDrawer = document.getElementById('chat-drawer');
    if (openChat && chatDrawer) {
        openChat.addEventListener('click', () => {
            chatDrawer.classList.toggle('hidden');
        });
        document.getElementById('send-chat').addEventListener('click', () => {
            const input = document.getElementById('chat-input');
            const messages = document.getElementById('chat-messages');
            if (input.value.trim()) {
                const userMsg = document.createElement('div');
                userMsg.className = 'mb-1 text-right';
                userMsg.innerHTML = `<span class='bg-blue-500 px-2 py-1 rounded text-xs'>${input.value}</span>`;
                messages.appendChild(userMsg);
                // Simulate AI response
                setTimeout(() => {
                    const aiMsg = document.createElement('div');
                    aiMsg.className = 'mb-1 text-left';
                    aiMsg.innerHTML = `<span class='bg-gray-600 px-2 py-1 rounded text-xs'>Peter: I'm here to help with your question!</span>`;
                    messages.appendChild(aiMsg);
                    messages.scrollTop = messages.scrollHeight;
                }, 800);
                input.value = '';
                messages.scrollTop = messages.scrollHeight;
            }
        });
    }
});
