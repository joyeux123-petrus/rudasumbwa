const express = require('express');
const router = express.Router();
const { ClubEvent } = require('../models/ClubEvent');

// Create an event
router.post('/', async (req, res) => {
  try {
    const { clubId, title, description, startDate, endDate, location } = req.body;
    const event = await ClubEvent.create({ clubId, title, description, startDate, endDate, location });
    res.json(event);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get all events for a club
router.get('/:clubId', async (req, res) => {
  try {
    const events = await ClubEvent.findAll({ where: { clubId: req.params.clubId } });
    res.json(events);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete an event
router.delete('/:id', async (req, res) => {
  try {
    await ClubEvent.destroy({ where: { id: req.params.id } });
    res.json({ message: 'Event deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
