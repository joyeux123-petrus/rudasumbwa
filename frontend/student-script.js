// student-script.js

const quizList = document.getElementById('quiz-list');
const quizSelection = document.getElementById('quiz-selection');
const quizTaking = document.getElementById('quiz-taking');
const quizTitle = document.getElementById('quiz-title');
const questionsContainer = document.getElementById('questions-container');
const submitBtn = document.getElementById('submit-quiz');
const mcqTemplate = document.getElementById('mcq-template');
const openEndedTemplate = document.getElementById('open-ended-template');

async function fetchQuizzes() {
  try {
    const response = await fetch('http://localhost:3000/api/quizzes');
    const quizzes = await response.json();
    displayQuizzes(quizzes);
  } catch (error) {
    console.error("Error fetching quizzes:", error);
    quizList.innerHTML = '<li>No quizzes available</li>';
  }
}

function displayQuizzes(quizzes) {
  quizList.innerHTML = ''; // Clear existing list
  quizzes.forEach(quiz => {
    const li = document.createElement('li');
    li.textContent = `${quiz.lessonName} - ${quiz.className}`;
    li.dataset.quizId = quiz._id || quiz.id || '';
    li.dataset.quizData = JSON.stringify(quiz);
    li.addEventListener('click', () => startQuiz(quiz));
    quizList.appendChild(li);
  });
}

// Initialize by fetching quizzes
fetchQuizzes();

function startQuiz(quiz) {
  quizSelection.style.display = 'none';
  quizTaking.style.display = 'block';
  quizTitle.textContent = `${quiz.lessonName} - ${quiz.className}`;
  questionsContainer.innerHTML = '';

  quiz.questions.forEach((question, index) => {
    let questionElement;
    
    if (question.questionType === 'mcq') {
      questionElement = mcqTemplate.content.cloneNode(true);
      questionElement.querySelector('.question-text').textContent = `${index + 1}. ${question.questionText}`;
      questionElement.querySelector('.question-marks span').textContent = question.marks;
      questionElement.querySelector('.option-a').textContent = question.choices[0];
      questionElement.querySelector('.option-b').textContent = question.choices[1];
      questionElement.querySelector('.option-c').textContent = question.choices[2];
      questionElement.querySelector('.option-d').textContent = question.choices[3];
      // Store correct answer for scoring
      questionElement.querySelector('.question-text').parentElement.dataset.correctAnswer = question.correctAnswer || '';
    } else {
      questionElement = openEndedTemplate.content.cloneNode(true);
      questionElement.querySelector('.question-text').textContent = `${index + 1}. ${question.questionText}`;
      questionElement.querySelector('.question-marks span').textContent = question.marks;
    }
    
    questionsContainer.appendChild(questionElement);
  });
}

submitBtn.addEventListener('click', async () => {
  const quizId = quizList.querySelector('li.selected')?.dataset.quizId || null;
  if (!quizId) {
    alert('Please select a quiz first.');
    return;
  }

  const questions = questionsContainer.children;
  const answers = [];
  let totalScore = 0;

  for (let i = 0; i < questions.length; i++) {
    const questionElem = questions[i];
    const questionText = questionElem.querySelector('.question-text').textContent;
    const marks = parseInt(questionElem.querySelector('.question-marks span').textContent) || 0;

    if (questionElem.querySelector('textarea.answer')) {
      // Open-ended question
      const answerText = questionElem.querySelector('textarea.answer').value.trim();
      answers.push({ questionText, answer: answerText, score: null });
    } else {
      // MCQ question
      const options = questionElem.querySelectorAll('input[type="radio"]');
      let selectedOption = null;
      options.forEach(option => {
        if (option.checked) selectedOption = option.value;
      });
      const correctAnswer = questionElem.dataset.correctAnswer || '';
      const score = selectedOption === correctAnswer ? marks : 0;
      totalScore += score;
      answers.push({ questionText, answer: selectedOption, score });
    }
  }

  const submissionData = {
    quizId,
    studentId: 'student1', // TODO: Replace with actual logged-in student ID
    answers,
    totalScore
  };

  try {
    const response = await fetch('http://localhost:3000/api/quizzes/submit-quiz', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(submissionData)
    });
    const data = await response.json();
    if (data.success) {
      alert('Quiz submitted successfully! Open-ended answers will be graded by your teacher.');
      quizTaking.style.display = 'none';
      quizSelection.style.display = 'block';
    } else {
      alert('Failed to submit quiz.');
    }
  } catch (error) {
    console.error('Error submitting quiz:', error);
    alert('Error submitting quiz.');
  }
});
