const express = require('express');
const News = require('../models/News');

const router = express.Router();

// Get all news
router.get('/', async (req, res) => {
  try {
    const news = await News.find().sort({ date: -1 });
    res.json(news);
  } catch (err) {
    console.error('Error fetching news:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Add a new news item
router.post('/', async (req, res) => {
  try {
    const { title, date, desc, img } = req.body;
    const newsItem = new News({ title, date, desc, img });
    await newsItem.save();
    res.status(201).json(newsItem);
  } catch (err) {
    console.error('Error adding news:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = router;
