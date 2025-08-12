// Teacher Quiz Creation Frontend
const QUIZ_API = 'http://localhost:3000/api/quizzes';

function collectQuizData() {
  const lessonName = document.getElementById('lesson-name').value;
  const quizClass = document.getElementById('class-select').value;
  const startTime = document.getElementById('start-time').value;
  const endTime = document.getElementById('end-time').value;
  const perQuestionTime = parseInt(document.getElementById('per-question-time').value, 10) || 0;
  const timingMode = document.getElementById('timing-mode').value;
  const questions = [];
  document.querySelectorAll('#questions-section .question').forEach(qDiv => {
    const text = qDiv.querySelector('.question-text').value;
    const type = qDiv.querySelector('.question-type').value;
    const marks = parseInt(qDiv.querySelector('.question-marks').value, 10) || 1;
    let choices = null, correctAnswer = null, mediaUrl = null;
    if (type === 'mcq') {
      choices = {
        A: qDiv.querySelector('.mcq-options .choice:nth-child(1)').value,
        B: qDiv.querySelector('.mcq-options .choice:nth-child(2)').value,
        C: qDiv.querySelector('.mcq-options .choice:nth-child(3)').value,
        D: qDiv.querySelector('.mcq-options .choice:nth-child(4)').value
      };
      correctAnswer = qDiv.querySelector('.mcq-options .correct-answer').value;
    }
    if (qDiv.querySelector('.media-url-input')) {
      mediaUrl = qDiv.querySelector('.media-url-input').value;
    }
    questions.push({ text, type, marks, choices, correctAnswer, mediaUrl });
  });
  return { lessonName, class: quizClass, startTime, endTime, perQuestionTime, timingMode, questions };
}

function setupQuizForm() {
  const form = document.getElementById('quiz-form');
  if (!form) return;
  form.onsubmit = async function(e) {
    e.preventDefault();
    // Add required to visible fields only
    document.querySelectorAll('#questions-section .question').forEach(qDiv => {
      // Always require question text and marks
      qDiv.querySelector('.question-text').required = true;
      qDiv.querySelector('.question-marks').required = true;
      // For MCQ, require choices and correct answer
      if (qDiv.querySelector('.question-type').value === 'mcq') {
        qDiv.querySelectorAll('.mcq-options .choice').forEach(input => input.required = true);
        qDiv.querySelector('.mcq-options .correct-answer').required = true;
      } else {
        qDiv.querySelectorAll('.mcq-options .choice').forEach(input => input.required = false);
        qDiv.querySelector('.mcq-options .correct-answer').required = false;
      }
    });
    const quiz = collectQuizData();
    if (!quiz.lessonName || !quiz.class || !quiz.startTime || !quiz.endTime || !quiz.questions.length) {
      alert('Please fill in all required fields and add at least one question.');
      return;
    }
    try {
      const res = await fetch(QUIZ_API, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(quiz)
      });
      const data = await res.json();
      if (res.ok) {
        alert('Quiz created successfully!');
        form.reset();
        document.getElementById('questions-section').innerHTML = '';
      } else {
        alert(data.message || 'Failed to create quiz.');
      }
    } catch (err) {
      alert('Error creating quiz.');
    }
  };
}

window.addEventListener('DOMContentLoaded', setupQuizForm);
