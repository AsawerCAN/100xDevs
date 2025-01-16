const quizData = [
  {
    question: "Which language runs in a web browser?",
    a: "Java",
    b: "C",
    c: "Python",
    d: "JavaScript",
    correct: "d",
  },
  {
    question: "What does CSS stand for?",
    a: "Central Style Sheets",
    b: "Cascading Style Sheets",
    c: "Cascading Simple Sheets",
    d: "Cars SUVs Sailboats",
    correct: "b",
  },
  {
    question: "What does HTML stand for?",
    a: "Hypertext Markup Language",
    b: "Hypertext Markdown Language",
    c: "Hyperloop Machine Language",
    d: "Helicopters Terminals Motorboats Lamborginis",
    correct: "a",
  },
  {
    question: "What year was JavaScript launched?",
    a: "1996",
    b: "1995",
    c: "1994",
    d: "none of the above",
    correct: "b",
  },
];

let currentQuestion = 0;
let score = 0;
let selectedAnswer = null;

function loadQuestion() {
  const questionData = quizData[currentQuestion];
  const quizBody = document.getElementById("quizBody");

  // Update progress bar
  const progress = (currentQuestion / quizData.length) * 100;
  document.getElementById("progressBar").style.width = `${progress}%`;

  quizBody.innerHTML = `
              <div class="question animate-fade">
                  <span>Question ${currentQuestion + 1}/${
    quizData.length
  }:</span>
                  <p>${questionData.question}</p>
              </div>
              <div class="options animate-fade">
                  ${Object.keys(questionData)
                    .filter((key) => key !== "question" && key !== "correct")
                    .map(
                      (key) => `
                          <div class="option" data-option="${key}">
                              <input type="radio" id="${key}" name="answer" value="${key}">
                              <label for="${key}">${questionData[key]}</label>
                          </div>
                      `
                    )
                    .join("")}
              </div>
          `;

  // Add event listeners to options
  document.querySelectorAll(".option").forEach((option) => {
    option.addEventListener("click", selectOption);
  });

  // Reset submit button
  const submitBtn = document.getElementById("submitBtn");
  submitBtn.disabled = true;
  submitBtn.textContent = "Submit";
}

function selectOption(e) {
  document.querySelectorAll(".option").forEach((option) => {
    option.classList.remove("selected");
  });

  // Add selection to clicked option
  const option = e.currentTarget;
  option.classList.add("selected");
  selectedAnswer = option.dataset.option;

  document.getElementById("submitBtn").disabled = false;
}

function checkAnswer() {
  const submitBtn = document.getElementById("submitBtn");
  const currentQuiz = quizData[currentQuestion];
  const options = document.querySelectorAll(".option");

  options.forEach((option) => {
    const optionValue = option.dataset.option;
    if (optionValue === currentQuiz.correct) {
      option.classList.add("correct");
    } else if (optionValue === selectedAnswer) {
      option.classList.add("wrong");
    }
    option.style.pointerEvents = "none";
  });

  if (selectedAnswer === currentQuiz.correct) {
    score++;
  }

  if (currentQuestion < quizData.length - 1) {
    submitBtn.textContent = "Next Question";
    submitBtn.onclick = nextQuestion;
  } else {
    submitBtn.textContent = "Show Results";
    submitBtn.onclick = showResults;
  }
}

function nextQuestion() {
  currentQuestion++;
  selectedAnswer = null;
  loadQuestion();
}

function showResults() {
  const quizBody = document.getElementById("quizBody");
  const submitBtn = document.getElementById("submitBtn");

  score = Math.min(score, quizData.length);

  const percentage = Math.round((score / quizData.length) * 100);

  const incorrectAnswers = quizData.length - score;

  quizBody.innerHTML = `
                  <div class="result-container animate-fade">
                      <h2>Quiz Complete!</h2>
                      <div class="score">
                          <span>Score: ${score}/${quizData.length}</span>
                          <span>(${percentage}%)</span>
                      </div>
                      <p>${getResultMessage(percentage)}</p>
                      <div class="stats">
                          <p>✅ Correct Answers: ${score}</p>
                          <p>❌ Incorrect Answers: ${incorrectAnswers}</p>
                      </div>
                  </div>
              `;

  submitBtn.textContent = "Restart Quiz";
  submitBtn.onclick = restartQuiz;
  submitBtn.disabled = false;
  document.getElementById("progressBar").style.width = "100%";
}

function getResultMessage(percentage) {
  if (percentage === 100) return "Perfect score! Outstanding performance! 🏆";
  if (percentage >= 80) return "Excellent job! Well done! 🌟";
  if (percentage >= 60) return "Good effort! Keep practicing! 👍";
  return "Keep learning! You can do better! 💪";
}

function restartQuiz() {
  currentQuestion = 0;
  score = 0;
  selectedAnswer = null;
  loadQuestion();
}

document.getElementById("submitBtn").addEventListener("click", checkAnswer);

loadQuestion();
