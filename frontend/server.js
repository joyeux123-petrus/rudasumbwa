const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = 3000;

app.use(express.json());

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// Serve index.html for the root route
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Path to leaderboard data file
const leaderboardFile = path.join(__dirname, 'leaderboard.json');

// Helper to read leaderboard data
function readLeaderboard() {
  if (!fs.existsSync(leaderboardFile)) {
    return [];
  }
  const data = fs.readFileSync(leaderboardFile, 'utf-8');
  try {
    return JSON.parse(data);
  } catch {
    return [];
  }
}

// Helper to write leaderboard data
function writeLeaderboard(data) {
  fs.writeFileSync(leaderboardFile, JSON.stringify(data, null, 2));
}

// GET leaderboard
app.get('/api/leaderboard', (req, res) => {
  res.json(readLeaderboard());
});

// POST new student
app.post('/api/leaderboard', (req, res) => {
  const data = readLeaderboard();
  data.push(req.body);
  writeLeaderboard(data);
  res.status(201).json({ success: true });
});

// PUT update student at index
app.put('/api/leaderboard/:index', (req, res) => {
  const data = readLeaderboard();
  const idx = parseInt(req.params.index, 10);
  if (idx < 0 || idx >= data.length) {
    return res.status(404).json({ error: 'Not found' });
  }
  data[idx] = req.body;
  writeLeaderboard(data);
  res.json({ success: true });
});

// DELETE student at index
app.delete('/api/leaderboard/:index', (req, res) => {
  const data = readLeaderboard();
  const idx = parseInt(req.params.index, 10);
  if (idx < 0 || idx >= data.length) {
    return res.status(404).json({ error: 'Not found' });
  }
  data.splice(idx, 1);
  writeLeaderboard(data);
  res.json({ success: true });
});

// Export leaderboard as JSON
app.get('/api/leaderboard/export', (req, res) => {
  res.setHeader('Content-Disposition', 'attachment; filename=leaderboard.json');
  res.setHeader('Content-Type', 'application/json');
  res.send(JSON.stringify(readLeaderboard(), null, 2));
});

// --- Announcement System ---
const announcementsFile = path.join(__dirname, 'announcements.json');

function readAnnouncements() {
  if (!fs.existsSync(announcementsFile)) return [];
  const data = fs.readFileSync(announcementsFile, 'utf-8');
  try {
    return JSON.parse(data);
  } catch {
    return [];
  }
}

function writeAnnouncements(data) {
  fs.writeFileSync(announcementsFile, JSON.stringify(data, null, 2));
}

// POST /api/announcements - create new announcement
app.post('/api/announcements', (req, res) => {
  const { message, audience } = req.body;
  if (!message || !audience) {
    return res.status(400).json({ error: 'Message and audience are required.' });
  }
  const announcement = {
    message,
    audience,
    timestamp: new Date().toISOString()
  };
  const data = readAnnouncements();
  data.push(announcement);
  writeAnnouncements(data);
  res.status(201).json({ success: true });
});

// GET /api/announcements/latest?audience=students|teachers|all
app.get('/api/announcements/latest', (req, res) => {
  const { audience } = req.query;
  const data = readAnnouncements().reverse(); // latest first
  // Find the latest announcement for the audience or for all
  const ann = data.find(a => a.audience === audience || a.audience === 'all');
  if (!ann) return res.status(404).json({ error: 'No announcement found.' });
  res.json(ann);
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
