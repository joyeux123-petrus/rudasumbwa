const express = require('express');
const router = express.Router();
const fetch = require('node-fetch');

const GEMINI_API_KEY = 'AIzaSyBvqVL8GtD2YN8rhm_qaLhOcZFUlToKjXo';
const GEMINI_ENDPOINT = `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${GEMINI_API_KEY}`;

router.post('/', async (req, res) => {
  const { message } = req.body;
  if (!message) return res.status(400).json({ error: 'Message is required' });
  try {
    const response = await fetch(GEMINI_ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ contents: [{ parts: [{ text: message }] }] })
    });
    if (!response.ok) {
      return res.status(500).json({ error: 'Gemini API error' });
    }
    const data = await response.json();
    const text = data?.candidates?.[0]?.content?.parts?.[0]?.text || '';
    res.json({ text });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
