const express = require('express');
const router = express.Router();
const { ClubPost } = require('../models/ClubPost');

// Create a post
router.post('/', async (req, res) => {
  try {
    const { clubId, userId, content, type } = req.body;
    const post = await ClubPost.create({ clubId, userId, content, type });
    res.json(post);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get all posts for a club
router.get('/:clubId', async (req, res) => {
  try {
    const posts = await ClubPost.findAll({ where: { clubId: req.params.clubId } });
    res.json(posts);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete a post
router.delete('/:id', async (req, res) => {
  try {
    await ClubPost.destroy({ where: { id: req.params.id } });
    res.json({ message: 'Post deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
