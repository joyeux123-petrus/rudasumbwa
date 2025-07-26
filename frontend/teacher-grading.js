// teacher-grading.js

const quizzesListDiv = document.getElementById('quizzes-list');
const gradingInterface = document.getElementById('grading-interface');
const quizTitle = document.getElementById('quiz-title');
const questionsContainer = document.getElementById('questions-container');
const submitGradingBtn = document.getElementById('submit-grading');
const gradingTemplate = document.getElementById('grading-template');

let submissions = [];
let currentSubmission = null;

async function fetchSubmissions() {
  try {
    const response = await fetch('/quizRoutes/submissions');
    const data = await response.json();
    submissions = data;
    displayQuizzesNeedingGrading();
  } catch (error) {
    console.error('Error fetching submissions:', error);
    quizzesListDiv.innerHTML = '<p>Error loading submissions.</p>';
  }
}

function displayQuizzesNeedingGrading() {
  quizzesListDiv.innerHTML = '';
  // Group submissions by quiz
  const quizzesMap = new Map();
  submissions.forEach(sub => {
    if (!quizzesMap.has(sub.quizId._id)) {
      quizzesMap.set(sub.quizId._id, { quiz: sub.quizId, submissions: [] });
    }
    quizzesMap.get(sub.quizId._id).submissions.push(sub);
  });

  quizzesMap.forEach(({ quiz, submissions }) => {
    const div = document.createElement('div');
    div.classList.add('quiz-item');
    div.textContent = `${quiz.lessonName} - ${quiz.className} (${submissions.length} submissions)`;
    div.addEventListener('click', () => showGradingInterface(submissions[0]));
    quizzesListDiv.appendChild(div);
  });
}

function showGradingInterface(submission) {
  currentSubmission = submission;
  gradingInterface.style.display = 'block';
  quizTitle.textContent = `${submission.quizId.lessonName} - ${submission.quizId.className}`;
  questionsContainer.innerHTML = '';

  submission.answers.forEach((answerObj, index) => {
    // Only show open-ended questions for grading (score null)
    if (answerObj.score === null) {
      const questionElem = gradingTemplate.content.cloneNode(true);
      questionElem.querySelector('.question-text').textContent = `Q${index + 1}: ${answerObj.questionText}`;
      questionElem.querySelector('.question-marks span').textContent = submission.quizId.questions[index].marks || 0;
      questionElem.querySelector('.answer-text').textContent = answerObj.answer || '';
      questionElem.querySelector('.marks-awarded').value = 0;
      questionsContainer.appendChild(questionElem);
    }
  });
}

submitGradingBtn.addEventListener('click', async () => {
  if (!currentSubmission) {
    alert('No submission selected for grading.');
    return;
  }

  const gradingDivs = questionsContainer.querySelectorAll('.question');
  const grades = [];

  gradingDivs.forEach((div, index) => {
    const marksAwarded = parseInt(div.querySelector('.marks-awarded').value) || 0;
    const feedback = div.querySelector('.teacher-feedback').value.trim();
    const questionText = div.querySelector('.question-text').textContent;

    grades.push({
      questionText,
      marksAwarded,
      feedback
    });
  });

  try {
    const response = await fetch('/quizRoutes/submit-grades', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        quizId: currentSubmission.quizId._id,
        studentId: currentSubmission.studentId._id,
        grades
      })
    });
    const data = await response.json();
    if (data.success) {
      alert('Grades submitted successfully!');
      gradingInterface.style.display = 'none';
      fetchSubmissions(); // Refresh list
    } else {
      alert('Failed to submit grades.');
    }
  } catch (error) {
    console.error('Error submitting grades:', error);
    alert('Error submitting grades.');
  }
});

// Initialize
fetchSubmissions();
