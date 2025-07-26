const express = require('express');
const router = express.Router();
const { ClubAchievement } = require('../models/ClubAchievement');

// Create an achievement
router.post('/', async (req, res) => {
  try {
    const { clubId, title, description, date } = req.body;
    const achievement = await ClubAchievement.create({ clubId, title, description, date });
    res.json(achievement);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get all achievements for a club
router.get('/:clubId', async (req, res) => {
  try {
    const achievements = await ClubAchievement.findAll({ where: { clubId: req.params.clubId } });
    res.json(achievements);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete an achievement
router.delete('/:id', async (req, res) => {
  try {
    await ClubAchievement.destroy({ where: { id: req.params.id } });
    res.json({ message: 'Achievement deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
