const Teacher = require('../models/Teacher');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
require('dotenv').config();

const JWT_SECRET = process.env.JWT_SECRET || 'changeme';

exports.register = async (req, res) => {
  try {
    const { full_name, email, subject, phone, bio, password, profile_picture, role, classes_assigned } = req.body;
    if (!full_name || !email || !subject || !phone || !bio || !password) {
      return res.status(400).json({ message: 'All fields are required' });
    }
    const existing = await Teacher.findByEmail(email);
    if (existing) {
      return res.status(409).json({ message: 'Email already exists' });
    }
    const id = await Teacher.create({ full_name, email, subject, phone, bio, password, profile_picture, role, classes_assigned });
    res.status(201).json({ id });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const teacher = await Teacher.findByEmail(email);
    if (!teacher) return res.status(401).json({ message: 'Invalid credentials' });
    const match = await bcrypt.compare(password, teacher.password);
    if (!match) return res.status(401).json({ message: 'Invalid credentials' });
    const token = jwt.sign({ id: teacher.id, role: teacher.role }, JWT_SECRET, { expiresIn: '1d' });
    res.json({ token, teacher: { id: teacher.id, full_name: teacher.full_name, email: teacher.email, role: teacher.role } });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

exports.getAll = async (req, res) => {
  try {
    const teachers = await Teacher.getAll();
    res.json(teachers);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

exports.getById = async (req, res) => {
  try {
    const teacher = await Teacher.findById(req.params.id);
    if (!teacher) return res.status(404).json({ message: 'Teacher not found' });
    res.json(teacher);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

exports.update = async (req, res) => {
  try {
    const updated = await Teacher.update(req.params.id, req.body);
    if (!updated) return res.status(404).json({ message: 'Teacher not found or no changes' });
    res.json({ message: 'Teacher updated' });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

exports.delete = async (req, res) => {
  try {
    const deleted = await Teacher.delete(req.params.id);
    if (!deleted) return res.status(404).json({ message: 'Teacher not found' });
    res.json({ message: 'Teacher deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// Profile picture upload handled in route with multer
exports.uploadProfilePicture = (req, res) => {
  if (!req.file) return res.status(400).json({ message: 'No file uploaded' });
  res.json({ url: `/uploads/${req.file.filename}` });
};

// Auth middleware
exports.auth = (roles = []) => {
  return (req, res, next) => {
    const authHeader = req.headers['authorization'];
    if (!authHeader) return res.status(401).json({ message: 'No token provided' });
    const token = authHeader.split(' ')[1];
    if (!token) return res.status(401).json({ message: 'No token provided' });
    jwt.verify(token, JWT_SECRET, (err, user) => {
      if (err) return res.status(403).json({ message: 'Invalid token' });
      if (roles.length && !roles.includes(user.role)) return res.status(403).json({ message: 'Forbidden' });
      req.user = user;
      next();
    });
  };
};
