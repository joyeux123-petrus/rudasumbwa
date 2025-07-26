const express = require('express');
const router = express.Router();
const { ClubMembership } = require('../models/ClubMembership');

// Join a club (request membership)
router.post('/join', async (req, res) => {
  try {
    const { userId, clubId } = req.body;
    const membership = await ClubMembership.create({ userId, clubId, status: 'pending' });
    res.json(membership);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Leave a club
router.post('/leave', async (req, res) => {
  try {
    const { userId, clubId } = req.body;
    await ClubMembership.destroy({ where: { userId, clubId } });
    res.json({ message: 'Left club' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Approve or reject membership
router.post('/approve', async (req, res) => {
  try {
    const { userId, clubId, status } = req.body; // status: 'approved' or 'rejected'
    await ClubMembership.update({ status }, { where: { userId, clubId } });
    res.json({ message: `Membership ${status}` });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Assign or remove admin role (Head of Studies only)
router.post('/set-admin', async (req, res) => {
  try {
    // In production, check req.user.role === 'head_of_studies' (auth middleware)
    const { userId, clubId, makeAdmin } = req.body; // makeAdmin: true/false
    const role = makeAdmin ? 'admin' : 'member';
    await ClubMembership.update({ role }, { where: { userId, clubId } });
    res.json({ message: `User ${userId} is now ${role} of club ${clubId}` });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
