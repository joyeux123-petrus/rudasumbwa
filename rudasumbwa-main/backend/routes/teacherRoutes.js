const express = require('express');
const router = express.Router();
const teacherController = require('../controllers/teacherController');
const multer = require('multer');
const path = require('path');

// Multer setup for profile picture uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, '../uploads'));
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  }
});
const upload = multer({ storage });

// Public routes
router.post('/register', teacherController.register);
router.post('/login', teacherController.login);

// Authenticated routes
router.get('/', teacherController.auth(), teacherController.getAll);
router.get('/:id', teacherController.auth(), teacherController.getById);
router.put('/:id', teacherController.auth(['teacher', 'admin']), teacherController.update);
router.delete('/:id', teacherController.auth(['admin']), teacherController.delete);
router.post('/upload', teacherController.auth(), upload.single('profile_picture'), teacherController.uploadProfilePicture);

module.exports = router;
