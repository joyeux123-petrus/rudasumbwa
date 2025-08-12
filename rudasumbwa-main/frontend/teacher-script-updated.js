
document.addEventListener('DOMContentLoaded', () => {
  let quizzes = []; // Store quizzes created by teachers

  const addQuestionBtn = document.getElementById('add-question-btn');
  const quizForm = document.getElementById('quiz-form');
  const questionsSection = document.getElementById('questions-section');
  const questionTemplate = document.getElementById('question-template');

  // Event listener for adding questions dynamically
  addQuestionBtn.addEventListener('click', () => {
    const questionClone = questionTemplate.content.cloneNode(true);
    const questionElement = questionClone.querySelector('.question');
    
    // Handle question type change
    const typeSelect = questionElement.querySelector('.question-type');
    const mcqOptions = questionElement.querySelector('.mcq-options');
    const mediaUrlDiv = questionElement.querySelector('.media-url');
    const mediaUrlInput = questionElement.querySelector('.media-url-input');

    function updateQuestionTypeUI(value) {
      if (value === 'mcq') {
        mcqOptions.style.display = 'block';
        mediaUrlDiv.style.display = 'none';
        mediaUrlInput.required = false;
      } else if (value === 'image-based' || value === 'audio') {
        mcqOptions.style.display = 'none';
        mediaUrlDiv.style.display = 'block';
        mediaUrlInput.required = true;
      } else {
        mcqOptions.style.display = 'none';
        mediaUrlDiv.style.display = 'none';
        mediaUrlInput.required = false;
      }
    }

    typeSelect.addEventListener('change', (e) => {
      updateQuestionTypeUI(e.target.value);
    });

    // Initialize UI based on default value
    updateQuestionTypeUI(typeSelect.value);

    questionsSection.appendChild(questionElement);
  });

  // Event listener to remove a question
  document.addEventListener('click', (event) => {
    if (event.target && event.target.classList.contains('remove-question-btn')) {
      event.target.closest('.question').remove();
    }
  });

  // Event listener for creating quiz
  quizForm.addEventListener('submit', async (event) => {
    event.preventDefault();

    const lessonName = document.getElementById('lesson-name').value;
    const className = document.getElementById('class-select').value;
    const startTime = document.getElementById('start-time').value;
    const endTime = document.getElementById('end-time').value;
    const perQuestionTime = parseInt(document.getElementById('per-question-time').value);
    const timingMode = document.getElementById('timing-mode').value;

    let questions = [];
    document.querySelectorAll('.question').forEach(questionElement => {
      const questionText = questionElement.querySelector('.question-text').value;
      const questionType = questionElement.querySelector('.question-type').value;
      const marks = parseInt(questionElement.querySelector('.question-marks').value);
      
      let questionData = {
        question: questionText,
        question_type: questionType,
        marks: marks
      };

      if (questionType === 'mcq') {
        const choices = Array.from(questionElement.querySelectorAll('.choice')).map(input => input.value);
        const correctAnswer = questionElement.querySelector('.correct-answer').value;
        questionData.options = choices;
        questionData.correct_answer = correctAnswer;
      } else if (questionType === 'image-based' || questionType === 'audio') {
        const mediaUrl = questionElement.querySelector('.media-url-input').value;
        questionData.media_url = mediaUrl;
      }

      questions.push(questionData);
    });

    const quiz = {
      title: lessonName,
      className: className,
      startTime: new Date(startTime),
      endTime: new Date(endTime),
      perQuestionTime: perQuestionTime,
      perQuestionTimingEnabled: timingMode === 'per-question',
      questions: questions
    };

    try {
      const response = await fetch('http://localhost:3000/api/quiz/create-quiz', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(quiz)
      });
      const result = await response.json();
      if (result.success) {
        alert('Quiz Created Successfully!');
        quizForm.reset();
        questionsSection.innerHTML = '';
        window.location.href = 'student quiz.html';
      } else {
        alert('Error creating quiz: ' + result.message);
      }
    } catch (error) {
      alert('Error creating quiz: ' + error.message);
    }
  });
});
