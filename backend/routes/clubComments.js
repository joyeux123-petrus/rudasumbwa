const express = require('express');
const router = express.Router();
const { ClubComment } = require('../models/ClubComment');

// Create a comment
router.post('/', async (req, res) => {
  try {
    const { postId, userId, content } = req.body;
    const comment = await ClubComment.create({ postId, userId, content });
    res.json(comment);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get all comments for a post
router.get('/:postId', async (req, res) => {
  try {
    const comments = await ClubComment.findAll({ where: { postId: req.params.postId } });
    res.json(comments);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete a comment
router.delete('/:id', async (req, res) => {
  try {
    await ClubComment.destroy({ where: { id: req.params.id } });
    res.json({ message: 'Comment deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
