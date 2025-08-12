// Student Quiz Frontend
// Assumes there is a <div id="quiz-app"></div> in student.html

const QUIZ_API_BASE = 'http://localhost:3000/api/quizzes';

// Utility to format date/time
function formatDateTime(dt) {
  return new Date(dt).toLocaleString();
}

// Render quiz list
async function renderQuizList() {
  const app = document.getElementById('quiz-app');
  app.innerHTML = '<div class="quiz-list-loading">Loading quizzes...</div>';
  try {
    const res = await fetch(QUIZ_API_BASE);
    const quizzes = await res.json();
    if (!quizzes.length) {
      app.innerHTML = '<div class="no-quizzes">No quizzes available.</div>';
      return;
    }
    app.innerHTML = `<h2>Available Quizzes</h2><div class="quiz-list"></div>`;
    const list = app.querySelector('.quiz-list');
    quizzes.forEach(quiz => {
      const div = document.createElement('div');
      div.className = 'quiz-card';
      div.innerHTML = `
        <div class="quiz-title">${quiz.lessonName} <span class="quiz-class">(${quiz.class})</span></div>
        <div class="quiz-meta">Start: ${formatDateTime(quiz.startTime)} | End: ${formatDateTime(quiz.endTime)}</div>
        <button class="start-quiz-btn">Start Quiz</button>
      `;
      div.querySelector('.start-quiz-btn').onclick = () => renderQuizTake(quiz);
      list.appendChild(div);
    });
  } catch (err) {
    app.innerHTML = '<div class="quiz-list-error">Failed to load quizzes.</div>';
  }
}

// Render quiz taking interface
function renderQuizTake(quiz) {
  const app = document.getElementById('quiz-app');
  let current = 0;
  const answers = [];
  function showQuestion(idx) {
    const q = quiz.Questions[idx];
    app.innerHTML = `
      <div class="quiz-header">
        <h2>${quiz.lessonName} <span class="quiz-class">(${quiz.class})</span></h2>
        <div class="quiz-meta">Question ${idx + 1} of ${quiz.Questions.length}</div>
      </div>
      <div class="quiz-question">
        <div class="question-text">${q.text}</div>
        <div class="question-type">Type: ${q.type}</div>
        <div class="question-marks">Marks: ${q.marks}</div>
        <div class="question-input"></div>
        <div class="quiz-controls"></div>
      </div>
    `;
    const inputDiv = app.querySelector('.question-input');
    if (q.type === 'mcq' && q.choices) {
      ['A', 'B', 'C', 'D'].forEach((opt, i) => {
        if (q.choices[opt]) {
          const label = document.createElement('label');
          label.innerHTML = `<input type="radio" name="answer" value="${opt}"> ${q.choices[opt]}`;
          inputDiv.appendChild(label);
        }
      });
    } else if (q.type === 'open-ended' || q.type === 'fill-in-the-blanks') {
      inputDiv.innerHTML = '<textarea name="answer" rows="3" placeholder="Your answer..."></textarea>';
    } else {
      inputDiv.innerHTML = '<input name="answer" placeholder="Your answer...">';
    }
    if (q.mediaUrl) {
      inputDiv.innerHTML += `<div class="media"><a href="${q.mediaUrl}" target="_blank">View Media</a></div>`;
    }
    // Controls
    const controls = app.querySelector('.quiz-controls');
    if (idx > 0) {
      const prevBtn = document.createElement('button');
      prevBtn.textContent = 'Previous';
      prevBtn.onclick = () => showQuestion(idx - 1);
      controls.appendChild(prevBtn);
    }
    if (idx < quiz.Questions.length - 1) {
      const nextBtn = document.createElement('button');
      nextBtn.textContent = 'Next';
      nextBtn.onclick = () => {
        saveAnswer(idx);
        showQuestion(idx + 1);
      };
      controls.appendChild(nextBtn);
    } else {
      const submitBtn = document.createElement('button');
      submitBtn.textContent = 'Submit Quiz';
      submitBtn.className = 'btn-primary';
      submitBtn.onclick = () => {
        saveAnswer(idx);
        submitQuiz();
      };
      controls.appendChild(submitBtn);
    }
  }
  function saveAnswer(idx) {
    const q = quiz.Questions[idx];
    let answer = '';
    const input = app.querySelector('[name="answer"]');
    if (input) {
      if (input.type === 'radio') {
        const checked = app.querySelector('[name="answer"]:checked');
        answer = checked ? checked.value : '';
      } else {
        answer = input.value;
      }
    }
    answers[idx] = { questionId: q.id, answer };
  }
  async function submitQuiz() {
    // Optionally, ask for student name/id
    const studentName = prompt('Enter your name:');
    if (!studentName) return alert('Name required.');
    try {
      const res = await fetch(QUIZ_API_BASE + '/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          quizId: quiz.id,
          studentName,
          answers
        })
      });
      const data = await res.json();
      if (res.ok) {
        app.innerHTML = `<div class="quiz-success">Quiz submitted successfully! Thank you, ${studentName}.</div>`;
      } else {
        app.innerHTML = `<div class="quiz-error">${data.message || 'Submission failed.'}</div>`;
      }
    } catch (err) {
      app.innerHTML = `<div class="quiz-error">Error submitting quiz.</div>`;
    }
  }
  showQuestion(current);
}

// Attach to Start Quiz button
window.addEventListener('DOMContentLoaded', function() {
  const startBtn = document.getElementById('start-quiz-btn');
  if (startBtn) {
    startBtn.onclick = renderQuizList;
  }
});
