const express = require('express');
const Quiz = require('../models/Quiz');
const Question = require('../models/Question');

const router = express.Router();

// Create a new quiz (teacher only)
router.post('/', async (req, res) => {
  try {
    const { lessonName, class: quizClass, startTime, endTime, timingMode, perQuestionTime, questions } = req.body;
    // Create the quiz
    const quiz = await Quiz.create({
      lessonName,
      class: quizClass,
      startTime,
      endTime,
      timingMode,
      perQuestionTime
    });
    // Create questions
    if (Array.isArray(questions)) {
      for (const q of questions) {
        await Question.create({
          quizId: quiz.id,
          text: q.text,
          type: q.type,
          marks: q.marks,
          choices: q.choices || null,
          correctAnswer: q.correctAnswer || null,
          mediaUrl: q.mediaUrl || null
        });
      }
    }
    res.status(201).json({ message: 'Quiz created successfully', quizId: quiz.id });
  } catch (err) {
    console.error('Error creating quiz:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Get all quizzes (with questions)
router.get('/', async (req, res) => {
  try {
    const quizzes = await Quiz.findAll({
      include: [Question],
      order: [['createdAt', 'DESC']]
    });
    res.json(quizzes);
  } catch (err) {
    console.error('Error fetching quizzes:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Student submits quiz answers
const QuizSubmission = require('../models/QuizSubmission');
const QuizAnswer = require('../models/QuizAnswer');

router.post('/submit', async (req, res) => {
  try {
    const { quizId, studentName, studentId, answers } = req.body;
    if (!quizId || !studentName || !Array.isArray(answers)) {
      return res.status(400).json({ message: 'Missing required fields' });
    }
    // Create submission
    const submission = await QuizSubmission.create({ quizId, studentName, studentId });
    // Save answers
    for (const ans of answers) {
      await QuizAnswer.create({
        submissionId: submission.id,
        questionId: ans.questionId,
        answer: ans.answer,
        isCorrect: ans.isCorrect // Optional, can be calculated later
      });
    }
    res.status(201).json({ message: 'Quiz submitted successfully' });
  } catch (err) {
    console.error('Error submitting quiz:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = router;
