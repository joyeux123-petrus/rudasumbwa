const apiEndpoints = {
  'math-geeks': 'https://opentdb.com/api.php?amount=50&category=19&difficulty=medium&type=multiple&encode=base64',
  'grade-10-12': 'https://opentdb.com/api.php?amount=50&category=17&difficulty=hard&type=multiple&encode=base64',
  'grade-8-9': 'https://opentdb.com/api.php?amount=50&category=17&difficulty=medium&type=multiple&encode=base64',
  'grade-7': 'https://opentdb.com/api.php?amount=50&category=17&difficulty=easy&type=multiple&encode=base64',
  'wakanda': 'https://opentdb.com/api.php?amount=50&category=19&difficulty=hard&type=multiple&encode=base64'
};

// Wakanda technology questions
const wakandaQuestions = [
  {
    question: "V2hhdCBpcyB0aGUgcHJpbWFyeSBtYXRlcmlhbCB1c2VkIGluIFdha2FuZGEgdGVjaG5vbG9neT8=", // What is the primary material used in Wakanda technology?
    correct_answer: "VmlicmFuaXVt", // Vibranium
    incorrect_answers: ["VGl0YW5pdW0=", "U3RlZWw=", "QWx1bWludW0="] // Titanium, Steel, Aluminum
  },
  {
    question: "V2hvIGlzIHRoZSBraW5nIG9mIFdha2FuZGE/", // Who is the king of Wakanda?
    correct_answer: "VCdDaGFsbGE=", // T'Challa
    incorrect_answers: ["S2lsbG9uZ2Vy", "U2h1cmk=", "TXJhIEJvZ2dz"] // Killmonger, Shuri, Mr. Boggs
  }
];

const difficulties = {
  'grade-10-12': 'hard',
  'grade-8-9': 'medium',
  'grade-7': 'easy',
  'math-geeks': 'medium'
};

let currentQuestion = {};
let score = 0;
let correctAnswers = 0;
let incorrectAnswers = 0;
let timeElapsed = 1;
let timerInterval;
let testStarted = false;
let currentCategory = '';

// Initialize game when Begin button is clicked
document.getElementById('begin-btn').addEventListener('click', () => {
  console.log('Begin button clicked');
  document.getElementById('intro-screen').style.transition = 'opacity 1s ease';
  document.getElementById('intro-screen').style.opacity = '0';
  
  setTimeout(() => {
    document.getElementById('intro-screen').style.display = 'none';
    const gradeSelection = document.getElementById('grade-selection');
    gradeSelection.style.display = 'flex';
  }, 1000);
});

// Grade selection handlers
function setupGradeButtons() {  
  document.getElementById('grade-10-12-btn').addEventListener('click', () => {
    currentCategory = 'grade-10-12';
    document.getElementById('grade-selection').style.display = 'none';
    startGame();
  });

  document.getElementById('grade-8-9-btn').addEventListener('click', () => {
    currentCategory = 'grade-8-9';
    document.getElementById('grade-selection').style.display = 'none';
    startGame();
  });

  document.getElementById('grade-7-btn').addEventListener('click', () => {
    currentCategory = 'grade-7';
    document.getElementById('grade-selection').style.display = 'none';
    startGame();
  });

  document.getElementById('math-geeks-btn').addEventListener('click', () => {
    currentCategory = 'math-geeks';
    document.getElementById('grade-selection').style.display = 'none';
    startGame();
  });

  document.getElementById('wakanda-btn').addEventListener('click', () => {
    currentCategory = 'wakanda';
    document.getElementById('grade-selection').style.display = 'none';
    // Add Wakanda styling
    document.body.classList.add('wakanda-mode');
    startGame();
  });

  // Wakanda Forever button shows results
  document.getElementById('wakanda').addEventListener('click', () => {
    if (!testStarted) return;
    
    // Stop the timer
    clearInterval(timerInterval);
    
    // Show Wakanda results modal
    const modal = document.getElementById('wakanda-modal');
    document.getElementById('wakanda-score').textContent = score;
    document.getElementById('wakanda-correct').textContent = correctAnswers;
    document.getElementById('wakanda-time').textContent = timeElapsed + 's';
    
    // Add vibranium particles
    for (let i = 0; i < 50; i++) {
      createVibraniumParticle(modal);
    }
    
    modal.style.display = 'flex';
  });

  // Close modal handler
  document.getElementById('close-wakanda').addEventListener('click', () => {
    document.getElementById('wakanda-modal').style.display = 'none';
    document.body.classList.remove('wakanda-mode');
    resetGame();
  });

  function createVibraniumParticle(container) {
    const particle = document.createElement('div');
    particle.className = 'vibranium-particle';
    particle.style.left = Math.random() * 100 + '%';
    particle.style.top = Math.random() * 100 + '%';
    container.appendChild(particle);
    
    // Remove particle after animation
    setTimeout(() => {
      particle.remove();
    }, 3000);
  }

  function resetGame() {
    clearInterval(timerInterval);
    score = 0;
    correctAnswers = 0;
    incorrectAnswers = 0;
    timeElapsed = 1;
    testStarted = false;
    document.getElementById('score').textContent = '0';
    document.getElementById('correct').textContent = '0';
    document.getElementById('incorrect').textContent = '0';
    document.getElementById('timer').textContent = '0';
    document.getElementById('question-text').textContent = '';
    document.getElementById('answer-buttons').innerHTML = '';
  }
}

document.addEventListener('DOMContentLoaded', () => {
  setupGradeButtons();
});

function startGame() {
  testStarted = true;
  document.getElementById('timer').textContent = timeElapsed;
  timerInterval = setInterval(() => {
    timeElapsed++;
    document.getElementById('timer').textContent = timeElapsed;
  }, 1000);
  fetchQuestion();
}

async function fetchQuestion() {
    try {
        if (currentCategory === 'wakanda') {
            // Mix API questions with Wakanda questions
            const url = apiEndpoints[currentCategory];
            const response = await fetch(url);
            if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
            
            const data = await response.json();
            let questions = [];
            if (data.response_code === 0 && data.results && data.results.length > 0) {
                questions = data.results.map(q => ({
                    question: q.question,
                    correct_answer: q.correct_answer,
                    incorrect_answers: q.incorrect_answers
                }));
            }
            // Add Wakanda questions
            questions = [...questions, ...wakandaQuestions];
            currentQuestion = questions[Math.floor(Math.random() * questions.length)];
        } else {
            const url = apiEndpoints[currentCategory];
            const response = await fetch(url);
            if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
            
            const data = await response.json();
            if (data.response_code !== 0 || !data.results || data.results.length === 0) {
                throw new Error('No questions found');
            }
            
            const questions = data.results.map(q => ({
                question: q.question,
                correct_answer: q.correct_answer,
                incorrect_answers: q.incorrect_answers
            }));
            
            currentQuestion = questions[Math.floor(Math.random() * questions.length)];
        }
        displayQuestion(currentQuestion);
    } catch (error) {
        console.error('Error fetching question:', error);
        showErrorMessage(`Failed to load ${currentCategory} questions. Error: ${error.message}`);
    }
}

function showErrorMessage(message = 'Error loading questions. Please try again later.') {
    document.getElementById('question-text').innerText = message;
    document.getElementById('answer-buttons').innerHTML = 
        '<button class="btn" onclick="fetchQuestion()">Try Again</button>';
}

function displayQuestion(questionData) {
    const questionText = atob(questionData.question);
    const correctAnswer = atob(questionData.correct_answer);
    const incorrectAnswers = questionData.incorrect_answers.map(answer => atob(answer));
    
    document.getElementById('question-text').innerText = questionText;
    
    const answerButtons = document.getElementById('answer-buttons');
    answerButtons.innerHTML = '';
    
    const allAnswers = [correctAnswer, ...incorrectAnswers]
        .sort(() => Math.random() - 0.5);
    
    allAnswers.forEach(answer => {
        const button = document.createElement('button');
        button.innerText = answer;
        button.classList.add('btn');
        button.addEventListener('click', () => selectAnswer(answer, correctAnswer));
        answerButtons.appendChild(button);
    });
}

function selectAnswer(selectedAnswer, correctAnswer) {
    if (selectedAnswer === correctAnswer) {
        score += 10;
        correctAnswers++;
        document.getElementById('score').textContent = score;
        document.getElementById('correct').textContent = correctAnswers;
    } else {
        incorrectAnswers++;
        document.getElementById('incorrect').textContent = incorrectAnswers;
    }
    fetchQuestion();
}

// [Rest of the file remains unchanged...]
