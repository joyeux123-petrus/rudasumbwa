const express = require('express');
const router = express.Router();
const { Club } = require('../models/Club');
const { ClubMembership } = require('../models/ClubMembership');
const { ClubPost } = require('../models/ClubPost');
const { ClubComment } = require('../models/ClubComment');
const { ClubAchievement } = require('../models/ClubAchievement');
const { ClubEvent } = require('../models/ClubEvent');
const { ClubFile } = require('../models/ClubFile');
const { ClubLeaderboard } = require('../models/ClubLeaderboard');
const { ClubChatMessage } = require('../models/ClubChatMessage');

// Example: Get all clubs
router.get('/', async (req, res) => {
  try {
    const clubs = await Club.findAll();
    res.json(clubs);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// TODO: Add endpoints for CRUD, join/leave, approve, posts, comments, achievements, events, files, leaderboard, chat

module.exports = router;
