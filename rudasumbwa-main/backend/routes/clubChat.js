const express = require('express');
const router = express.Router();
const { ClubChatMessage } = require('../models/ClubChatMessage');

// Get chat history for a club
router.get('/:clubId', async (req, res) => {
  try {
    const messages = await ClubChatMessage.findAll({ where: { clubId: req.params.clubId }, order: [['sentAt', 'ASC']] });
    res.json(messages);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Save a chat message (for fallback, not real-time)
router.post('/', async (req, res) => {
  try {
    const { clubId, userId, content, fileUrl, fileType, seen } = req.body;
    const message = await ClubChatMessage.create({ clubId, userId, content, fileUrl, fileType, seen });
    res.json(message);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
