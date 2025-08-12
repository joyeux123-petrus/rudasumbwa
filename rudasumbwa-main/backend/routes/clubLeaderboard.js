const express = require('express');
const router = express.Router();
const { ClubLeaderboard } = require('../models/ClubLeaderboard');

// Get leaderboard for a club
router.get('/:clubId', async (req, res) => {
  try {
    const leaderboard = await ClubLeaderboard.findAll({ where: { clubId: req.params.clubId }, order: [['points', 'DESC']] });
    res.json(leaderboard);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update points for a user in a club
router.post('/update', async (req, res) => {
  try {
    const { clubId, userId, points } = req.body;
    let entry = await ClubLeaderboard.findOne({ where: { clubId, userId } });
    if (entry) {
      entry.points = points;
      await entry.save();
    } else {
      entry = await ClubLeaderboard.create({ clubId, userId, points });
    }
    res.json(entry);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
