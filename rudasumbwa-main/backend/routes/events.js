const express = require('express');
const Event = require('../models/Event');

const router = express.Router();

// Get all events
router.get('/', async (req, res) => {
  try {
    const events = await Event.find().sort({ date: 1 });
    res.json(events);
  } catch (err) {
    console.error('Error fetching events:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Add a new event
router.post('/', async (req, res) => {
  try {
    const { date, title, details } = req.body;
    const event = new Event({ date, title, details });
    await event.save();
    res.status(201).json(event);
  } catch (err) {
    console.error('Error adding event:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = router;
