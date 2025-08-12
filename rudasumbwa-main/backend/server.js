const express = require('express');
const bodyParser = require('body-parser');
const fetch = require('node-fetch'); // Install with: npm install node-fetch
const cors = require('cors');
const path = require('path');
const app = express();

app.use(cors());
app.use(bodyParser.json());

// --- Spiritual Events API ---
const fs = require('fs');
const eventsFile = path.join(__dirname, 'spiritual-events.json');

function readEvents() {
  if (!fs.existsSync(eventsFile)) return [];
  const data = fs.readFileSync(eventsFile, 'utf-8');
  try {
    return JSON.parse(data);
  } catch {
    return [];
  }
}

function writeEvents(events) {
  fs.writeFileSync(eventsFile, JSON.stringify(events, null, 2), 'utf-8');
}

// Get all spiritual events
app.get('/api/events', (req, res) => {
  const events = readEvents();
  res.json(events);
});

// Update all spiritual events (replace all)
app.post('/api/events', (req, res) => {
  const events = req.body;
  if (!Array.isArray(events)) {
    return res.status(400).json({ error: 'Events should be an array.' });
  }
  writeEvents(events);
  res.json({ success: true });
});

// Serve uploaded profile pictures
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Teacher routes
const teacherRoutes = require('./routes/teacherRoutes');
app.use('/api/teachers', teacherRoutes);

const GEMINI_API_KEY = "AIzaSyAFqGaY6OlHznn4s_YSIfToqBo8uHpRBeA";
const GEMINI_API_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=" + GEMINI_API_KEY;

app.post('/api/ask-peter', async (req, res) => {
  const { message } = req.body;
  if (!message) {
    return res.status(400).json({ text: "Please provide a message." });
  }
  try {
    const geminiRes = await fetch(GEMINI_API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [{ parts: [{ text: message }] }]
      })
    });
    const geminiData = await geminiRes.json();
    const aiText = geminiData?.candidates?.[0]?.content?.parts?.[0]?.text || "Sorry, I couldn't get a response from Gemini AI.";
    res.json({ text: aiText });
  } catch (err) {
    res.json({ text: "Error connecting to Gemini AI." });
  }
});

// Start the server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Backend server running on port ${PORT}`);
});
