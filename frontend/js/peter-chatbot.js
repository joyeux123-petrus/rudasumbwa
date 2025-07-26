// Peter AI Chatbot Modal Logic & Gemini AI Integration

const peterModal = document.getElementById('peter-modal');
const peterChatBody = document.getElementById('peter-chat-body');
const peterUserInput = document.getElementById('peter-user-input');
const peterChatForm = document.getElementById('peter-chat-form');

function openPeterModal() {
  peterModal.style.display = 'flex';
  setTimeout(() => peterUserInput.focus(), 200);
}

function closePeterModal() {
  peterModal.style.display = 'none';
}

// Close modal on outside click
window.onclick = function(event) {
  if (event.target === peterModal) {
    closePeterModal();
  }
};

// Chat logic
async function sendPeterMessage(event) {
  event.preventDefault();
  const userMsg = peterUserInput.value.trim();
  if (!userMsg) return false;

  appendPeterMessage('user', userMsg);
  peterUserInput.value = '';
  peterUserInput.disabled = true;

  // Show Peter is typing
  const typingElem = appendPeterMessage('peter', '<span class="peter-typing">Peter is thinking...</span>');

  try {
    const aiResponse = await fetchGeminiAI(userMsg);
    typingElem.innerHTML = aiResponse;
  } catch (e) {
    typingElem.innerHTML = '<span class="peter-error">Sorry, I could not get a response. Please try again.</span>';
  }
  peterUserInput.disabled = false;
  peterUserInput.focus();
  peterChatBody.scrollTop = peterChatBody.scrollHeight;
  return false;
}

function appendPeterMessage(sender, text) {
  const msgDiv = document.createElement('div');
  msgDiv.className = 'peter-msg peter-msg-' + sender;
  msgDiv.innerHTML = sender === 'user' ? `<div class="peter-msg-bubble user">${text}</div>` : `<div class="peter-msg-bubble peter">${text}</div>`;
  peterChatBody.appendChild(msgDiv);
  peterChatBody.scrollTop = peterChatBody.scrollHeight;
  return msgDiv.querySelector('.peter-msg-bubble');
}

// Gemini AI API integration
async function fetchGeminiAI(userMsg) {
  // Gemini API endpoint
  const endpoint = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=AIzaSyAHYXUUi2L-76pRN1XKiRnskd7FxvKY8kM';
  const body = {
    contents: [{ parts: [{ text: userMsg }] }]
  };
  const res = await fetch(endpoint, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body)
  });
  if (!res.ok) throw new Error('API error');
  const data = await res.json();
  if (data && data.candidates && data.candidates[0] && data.candidates[0].content && data.candidates[0].content.parts && data.candidates[0].content.parts[0].text) {
    return data.candidates[0].content.parts[0].text.replace(/\n/g, '<br>');
  }
  throw new Error('No response');
}

// Keyboard shortcut: ESC to close
window.addEventListener('keydown', function(e) {
  if (e.key === 'Escape') closePeterModal();
});
