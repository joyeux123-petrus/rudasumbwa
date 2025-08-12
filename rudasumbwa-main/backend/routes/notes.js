const express = require('express');
const Note = require('../models/Note');

const router = express.Router();

// Teacher creates a note
router.post('/', async (req, res) => {
  try {
    const { title, content, class: noteClass, subject, teacherName } = req.body;
    if (!title || !content || !noteClass || !subject || !teacherName) {
      return res.status(400).json({ message: 'Missing required fields' });
    }
    const note = await Note.create({ title, content, class: noteClass, subject, teacherName });
    res.status(201).json({ message: 'Note created successfully', note });
  } catch (err) {
    console.error('Error creating note:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Student fetches notes (with optional filters)
router.get('/', async (req, res) => {
  try {
    const { class: noteClass, subject, status } = req.query;
    const where = {};
    if (noteClass) where.class = noteClass;
    if (subject) where.subject = subject;
    if (status) where.status = status;
    else where.status = 'published'; // Only show published by default
    const notes = await Note.findAll({ where, order: [['createdAt', 'DESC']] });
    res.json(notes);
  } catch (err) {
    console.error('Error fetching notes:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = router;
