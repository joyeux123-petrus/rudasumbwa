/**
 * Minimal JWT Authentication Example with Node.js + Express
 * 
 * Requirements:
 * - Uses jsonwebtoken and dotenv packages
 * - In-memory user store for simplicity
 * - Signup and login routes generating JWT tokens
 * - Authentication middleware verifying JWT tokens from Authorization header
 * - Protected sample route
 * - JWT secret key loaded from .env
 */

const express = require('express');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const cors = require('cors');
const fetch = require('node-fetch'); // Gemini API integration

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Enable CORS for all origins (for development)
app.use(cors());
// Middleware to parse JSON bodies
app.use(express.json());

// In-memory user store (username -> user object)
// Example: users[username] = { username, password, createdAt, status }
const users = {};

/**
 * Generate JWT token for a given username
 * @param {string} username 
 * @returns {string} JWT token
 */
function generateToken(username) {
  return jwt.sign({ username }, process.env.JWT_SECRET, { expiresIn: '1h' });
}

/**
 * Authentication middleware to verify JWT token from Authorization header
 */
function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  // Authorization header format: "Bearer <token>"
  const token = authHeader && authHeader.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'Missing token' });

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ message: 'Invalid or expired token' });
    req.user = user; // Attach decoded user info to request
    next();
  });
}

/**
 * Signup route
 * Expects JSON body: { username, password }
 * Stores user in-memory and returns JWT token
 */
app.post('/signup', (req, res) => {
  let { username, password, email, className, parish, district, subject, role } = req.body;
  className = className || req.body.class || '';
  district = district || '';
  subject = subject || '';
  role = role || 'pending';
  if (!username || !password) {
    return res.status(400).json({ message: 'Username and password required' });
  }
  if (users[username]) {
    return res.status(409).json({ message: 'User already exists' });
  }
  users[username] = {
    username,
    password, // In production, hash this!
    email: email || '',
    className: className || '',
    parish: parish || '',
    createdAt: new Date().toISOString(),
    status: 'Pending',
    isApproved: false,
    role,
    district,
    subject
  };
  const token = generateToken(username);
  res.status(201).json({ message: 'User created', token });
});

/**
 * API Auth Signup route (for frontend compatibility)
 * Expects JSON body: { username, password }
 * Stores user in-memory and returns JWT token
 */
app.post('/api/auth/signup', (req, res) => {
  let { username, password, email, className, parish, district, subject, role } = req.body;
  className = className || req.body.class || '';
  district = district || '';
  subject = subject || '';
  role = role || 'pending';
  if (!username || !password) {
    return res.status(400).json({ message: 'Username and password required' });
  }
  if (users[username]) {
    return res.status(409).json({ message: 'User already exists' });
  }
  users[username] = {
    username,
    password, // In production, hash this!
    email: email || '',
    className: className || '',
    parish: parish || '',
    createdAt: new Date().toISOString(),
    status: 'Pending',
    isApproved: false,
    role,
    district,
    subject
  };
  const token = generateToken(username);
  res.status(201).json({ message: 'User created', token });
});

/**
 * Login route
 * Expects JSON body: { username, password }
 * Verifies user and returns JWT token
 */
app.post('/login', (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({ message: 'Username and password required' });
  }
  const user = users[username];
  if (!user || user.password !== password) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }
  const token = generateToken(username);
  res.json({ message: 'Login successful', token });
});

/**
 * Get all users (for admin dashboard)
 * Optionally filter by status query param (not implemented, returns all users)
 */
app.get('/api/auth/users', (req, res) => {
  // Accept and ignore status query param for compatibility
  const { status } = req.query;
  // Return all user details except password
  let userList = Object.values(users).map(({ password, ...user }) => user);
  // Optionally filter by status if provided
  if (status === 'Pending') {
    userList = userList.filter(user => user.isApproved === false);
  } else if (status) {
    userList = userList.filter(user => user.status === status);
  }
  res.json({ users: userList });
});

/**
 * Placeholder notifications endpoint
 */
app.get('/api/notifications', (req, res) => {
  // Return an empty notifications array for now
  res.json({ notifications: [] });
});

/**
 * Protected sample route
 * Requires valid JWT token
 */
app.get('/protected', authenticateToken, (req, res) => {
  res.json({ message: `Hello, ${req.user.username}! This is a protected route.` });
});

// Gemini-powered Ask Peter endpoint
const GEMINI_API_KEY = "AIzaSyAFqGaY6OlHznn4s_YSIfToqBo8uHpRBeA";
const GEMINI_API_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=" + GEMINI_API_KEY;

app.post('/api/ask-peter', async (req, res) => {
  const { message } = req.body;
  if (!message) {
    return res.status(400).json({ text: "Please provide a message." });
  }
  try {
    const geminiRes = await fetch(GEMINI_API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [{ parts: [{ text: message }] }]
      })
    });
    const geminiData = await geminiRes.json();
    const aiText = geminiData?.candidates?.[0]?.content?.parts?.[0]?.text || "Sorry, I couldn't get a response from Gemini AI.";
    res.json({ text: aiText });
  } catch (err) {
    res.json({ text: "Error connecting to Gemini AI." });
  }
});

console.log("=== RUNNING UPDATED BACKEND WITH NOTIFICATIONS ENDPOINT ===");
// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
