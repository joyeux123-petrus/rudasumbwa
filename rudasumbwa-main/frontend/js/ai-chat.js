// Floating AI button and chat drawer logic with Gemini API integration and fallback

document.addEventListener('DOMContentLoaded', function() {
    const aiBtn = document.getElementById('ai-float-btn');
    const aiDrawer = document.getElementById('ai-chat-drawer');
    const aiClose = document.getElementById('ai-chat-close');
    const aiInput = document.getElementById('ai-chat-input');
    const aiSend = document.getElementById('ai-chat-send');
    const aiMessages = document.getElementById('ai-chat-messages');
    const expandIcon = document.getElementById('ai-float-expand');

    if (aiBtn && aiDrawer && aiClose) {
        aiBtn.addEventListener('click', () => {
            aiDrawer.classList.remove('hidden');
        });
        aiClose.addEventListener('click', () => {
            aiDrawer.classList.add('hidden');
        });
    }
    if (expandIcon) {
        expandIcon.addEventListener('click', () => {
            aiDrawer.classList.remove('hidden');
        });
    }
    if (aiSend && aiInput && aiMessages) {
        aiSend.addEventListener('click', async () => {
            const question = aiInput.value.trim();
            if (!question) return;
            // Show user message
            const userMsg = document.createElement('div');
            userMsg.className = 'mb-2 text-right';
            userMsg.innerHTML = `<span class='bg-blue-100 text-blue-800 px-2 py-1 rounded'>${question}</span>`;
            aiMessages.appendChild(userMsg);
            aiInput.value = '';
            aiMessages.scrollTop = aiMessages.scrollHeight;
            // Show loading
            const loadingMsg = document.createElement('div');
            loadingMsg.className = 'mb-2 text-left';
            loadingMsg.innerHTML = `<span class='bg-gray-200 text-gray-600 px-2 py-1 rounded animate-pulse'>Thinking...</span>`;
            aiMessages.appendChild(loadingMsg);
            aiMessages.scrollTop = aiMessages.scrollHeight;
            // Call Gemini API
            let answer = '';
            try {
                const response = await fetch('http://localhost:3000/api/ask-peter', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ message: question })
                });
                const data = await response.json();
                if (data && data.text) {
                    answer = data.text;
                } else {
                    answer = 'Sorry, I could not get an answer from Gemini AI.';
                }
            } catch (e) {
                answer = 'AI is currently unavailable. (This may be due to server or network issues.)';
            }
            loadingMsg.remove();
            const aiMsg = document.createElement('div');
            aiMsg.className = 'mb-2 text-left';
            aiMsg.innerHTML = `<span class='bg-purple-100 text-purple-800 px-2 py-1 rounded'>${answer}</span>`;
            aiMessages.appendChild(aiMsg);
            aiMessages.scrollTop = aiMessages.scrollHeight;
        });
    }
});
