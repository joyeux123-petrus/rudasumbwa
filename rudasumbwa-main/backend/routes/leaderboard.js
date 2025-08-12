const express = require('express');
const Leaderboard = require('../models/Leaderboard');

const router = express.Router();

// Get all leaderboard entries
router.get('/', async (req, res) => {
  try {
    const leaderboard = await Leaderboard.find().sort({ rank: 1 });
    res.json(leaderboard);
  } catch (err) {
    console.error('Error fetching leaderboard:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Add a new leaderboard entry
router.post('/', async (req, res) => {
  try {
    const { name, grade, rank, medal, info } = req.body;
    const entry = new Leaderboard({ name, grade, rank, medal, info });
    await entry.save();
    res.status(201).json(entry);
  } catch (err) {
    console.error('Error adding leaderboard entry:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = router;
