const express = require('express');
const router = express.Router();
const { ClubFile } = require('../models/ClubFile');

// Upload a file (metadata only, actual upload handled elsewhere)
router.post('/', async (req, res) => {
  try {
    const { clubId, userId, fileUrl, fileType, description } = req.body;
    const file = await ClubFile.create({ clubId, userId, fileUrl, fileType, description });
    res.json(file);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get all files for a club
router.get('/:clubId', async (req, res) => {
  try {
    const files = await ClubFile.findAll({ where: { clubId: req.params.clubId } });
    res.json(files);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete a file
router.delete('/:id', async (req, res) => {
  try {
    await ClubFile.destroy({ where: { id: req.params.id } });
    res.json({ message: 'File deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
