const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const Notification = require('../models/Notification');

const router = express.Router();

router.post('/signup', async (req, res) => {
  try {
    const { username, email, password, role, className, parish, district } = req.body;
    if (!username || !email || !password) {
      return res.status(400).json({ message: 'Missing required fields' });
    }
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: 'Email already in use' });
    }
    const passwordHash = await bcrypt.hash(password, 10);
    // Create user with isApproved false by default
    const user = new User({ username, email, passwordHash, role, className, parish, district, isApproved: false });
    await user.save();
    console.log('User created:', {
      username: user.username,
      email: user.email,
      role: user.role,
      className: user.className,
      parish: user.parish,
      district: user.district,
      isApproved: user.isApproved
    });

    // Create notification for admin with all user details except password
    const notificationMessage = `New user signup: ${username} (${role}) awaiting approval.\nClass: ${className || '-'}\nParish: ${parish || '-'}\nDistrict: ${district || '-'}`;
    const notification = new Notification({ message: notificationMessage });
    await notification.save();

    // Emit real-time notification to admin dashboard via Socket.IO
    const io = req.app.get('io');
    if (io) {
      io.emit('adminNotification', {
        message: notificationMessage,
        type: 'signup',
        user: { username, email, role, className, parish, district }
      });
    }

    res.status(201).json({ message: 'User created successfully, pending admin approval' });
  } catch (err) {
    console.error('Signup error:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
});

router.post('/signin', async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: 'Missing email or password' });
    }
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    if (!user.isApproved) {
      return res.status(403).json({ message: 'User not approved yet' });
    }
    const passwordMatch = await bcrypt.compare(password, user.passwordHash);
    if (!passwordMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    const token = jwt.sign(
      { userId: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    );
    res.json({ token, user: { username: user.username, email: user.email, role: user.role } });
  } catch (err) {
    console.error('Signin error:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
});

router.get('/pending-users', async (req, res) => {
  try {
    const pendingUsers = await User.find({ isApproved: false });
    res.json(pendingUsers);
  } catch (err) {
    console.error('Error fetching pending users:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
});

const { sendEmail } = require('../utils/email');
const fetch = require('node-fetch'); // Add this at the top if not already present

router.post('/approve-user', async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    user.isApproved = true;
    await user.save();

    // Send approval email via Nodemailer
    try {
      await sendEmail(
        email,
        'Your account has been approved!',
        `Hello ${user.username},\n\nYour account has been approved. You can now log in and use the website.`,
        `<p>Hello ${user.username},</p><p>Your account has been approved. You can now log in and use the website.</p>`
      );
    } catch (emailErr) {
      console.error('Error sending approval email:', emailErr);
      // Optionally, you can still return success but log the email error
    }

    res.json({ message: 'User approved successfully and email sent.' });
  } catch (err) {
    console.error('Error approving user:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
});

router.post('/reject-user', async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    await user.destroy();

    // Send rejection email via Nodemailer
    try {
      await sendEmail(
        email,
        'Your account signup was rejected',
        `Hello ${user.username},\n\nYour signup was rejected. Please contact administration for more information.`,
        `<p>Hello ${user.username},</p><p>Your signup was rejected. Please contact administration for more information.</p>`
      );
    } catch (emailErr) {
      console.error('Error sending rejection email:', emailErr);
      // Optionally, you can still return success but log the email error
    }

    res.json({ message: 'User rejected and deleted successfully' });
  } catch (err) {
    console.error('Error rejecting user:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Get all users or only pending users if status=Pending
router.get('/users', async (req, res) => {
  try {
    const { status } = req.query;
    let users;
    if (status && status.toLowerCase() === 'pending') {
      users = await User.findAll({ where: { isApproved: false } });
      console.log('Pending users:', users);
    } else {
      users = await User.findAll();
      console.log('All users:', users);
    }
    res.json(users);
  } catch (err) {
    console.error('Error fetching users:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// --- Password Reset Endpoints ---
const crypto = require('crypto');

// Request password reset
router.post('/forgot-password', async (req, res) => {
  const { email } = req.body;
  if (!email) return res.status(400).json({ message: 'Email is required' });
  try {
    // Find user by email
    const user = await User.findOne({ where: { email } });
    if (!user) {
      // Respond with success even if user not found (to prevent email enumeration)
      return res.json({ message: 'If this email exists, a reset code has been sent.' });
    }
    // Generate reset code
    const resetCode = crypto.randomBytes(3).toString('hex').toUpperCase(); // 6-char code
    const expires = new Date(Date.now() + 1000 * 60 * 15); // 15 minutes from now
    user.resetPasswordToken = resetCode;
    user.resetPasswordExpires = expires;
    await user.save();
    // Send email
    await sendEmail(
      user.email,
      'Password Reset Code',
      `Your password reset code is: ${resetCode}\nThis code will expire in 15 minutes.`,
      `<p>Your password reset code is: <b>${resetCode}</b></p><p>This code will expire in 15 minutes.</p>`
    );
    res.json({ message: 'If this email exists, a reset code has been sent.' });
  } catch (err) {
    console.error('Forgot password error:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Reset password
router.post('/reset-password', async (req, res) => {
  const { email, code, newPassword } = req.body;
  if (!email || !code || !newPassword) {
    return res.status(400).json({ message: 'Missing required fields' });
  }
  try {
    const user = await User.findOne({ where: { email } });
    if (!user || !user.resetPasswordToken || !user.resetPasswordExpires) {
      return res.status(400).json({ message: 'Invalid or expired reset code' });
    }
    if (
      user.resetPasswordToken !== code ||
      new Date(user.resetPasswordExpires) < new Date()
    ) {
      return res.status(400).json({ message: 'Invalid or expired reset code' });
    }
    // Update password
    const passwordHash = await bcrypt.hash(newPassword, 10);
    user.passwordHash = passwordHash;
    user.resetPasswordToken = null;
    user.resetPasswordExpires = null;
    await user.save();
    res.json({ message: 'Password has been reset successfully.' });
  } catch (err) {
    console.error('Reset password error:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = router;
