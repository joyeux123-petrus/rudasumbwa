const express = require('express');
const Notification = require('../models/Notification');

const router = express.Router();

// Get all notifications (most recent first)
router.get('/', async (req, res) => {
  try {
    const notifications = await Notification.findAll({
      order: [['createdAt', 'DESC']]
    });
    res.json(notifications);
  } catch (err) {
    console.error('Error fetching notifications:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Mark notification as read
router.post('/read', async (req, res) => {
  try {
    const { id } = req.body;
    const [updatedRows] = await Notification.update(
      { isRead: true },
      { where: { id } }
    );
    if (updatedRows === 0) {
      return res.status(404).json({ message: 'Notification not found' });
    }
    res.json({ message: 'Notification marked as read' });
  } catch (err) {
    console.error('Error updating notification:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = router;
