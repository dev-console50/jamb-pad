const questions = [
  // 1. Multiple Choice
  {
    question: "1. What is the synonym of 'happy'?",
    options: ["Sad", "Joyful", "Angry", "Tired"],
    answer: "Joyful",
    type: "mcq"
  },
  {
    question: "2. Choose the correct sentence:",
    options: [
      "He go to school everyday.",
      "He goes to school everyday.",
      "He going to school everyday.",
      "He gone to school everyday."
    ],
    answer: "He goes to school everyday.",
    type: "mcq"
  },

  // 2. True or False
  {
    question: "3. 'A noun is a naming word.'",
    options: ["True", "False"],
    answer: "True",
    type: "mcq"
  },
  {
    question: "4. 'An adverb describes a noun.'",
    options: ["True", "False"],
    answer: "False",
    type: "mcq"
  },

  // 3. Fill in the Blank
  {
    question: "5. 'She _____ to church every Sunday.'",
    options: ["go", "goes", "gone", "going"],
    answer: "goes",
    type: "mcq"
  },
  {
    question: "6. 'They have _____ finished their homework.'",
    options: ["all", "already", "also", "almost"],
    answer: "already",
    type: "mcq"
  },

  // 4. Matching (converted to MCQ for simplicity)
  {
    question: "7. Match: 'Bark' is to 'Dog' as 'Meow' is to?",
    options: ["Horse", "Cat", "Lion", "Cow"],
    answer: "Cat",
    type: "mcq"
  },
  {
    question: "8. Match: 'Book' is to 'Read' as 'Pen' is to?",
    options: ["Paper", "Write", "Ink", "Note"],
    answer: "Write",
    type: "mcq"
  },

  // 5. Rearrangement
  {
    question: "9. Rearrange to form a correct sentence: 'always / I / early / up / get'",
    options: [
      "I always get up early",
      "Always I get up early",
      "Get up I always early",
      "Early I always get up"
    ],
    answer: "I always get up early",
    type: "mcq"
  },
  {
    question: "10. Rearrange: 'delicious / the / food / very / is'",
    options: [
      "The food is very delicious",
      "Very delicious is the food",
      "Delicious the food is very",
      "The very food delicious is"
    ],
    answer: "The food is very delicious",
    type: "mcq"
  },

  // 6. Sentence Completion
  {
    question: "11. If it rains tomorrow, we _____ at home.",
    options: ["will stay", "stayed", "stay", "would staying"],
    answer: "will stay",
    type: "mcq"
  },
  {
    question: "12. He was so tired that he _____ asleep.",
    options: ["fell", "fall", "falls", "falling"],
    answer: "fell",
    type: "mcq"
  },

  // 7. Word Substitution
  {
    question: "13. A person who writes dictionaries:",
    options: ["Novelist", "Dramatist", "Lexicographer", "Editor"],
    answer: "Lexicographer",
    type: "mcq"
  },
  {
    question: "14. A person who can speak two languages:",
    options: ["Bilingual", "Linguist", "Speaker", "Orator"],
    answer: "Bilingual",
    type: "mcq"
  },

  // 8. Error Detection
  {
    question: "15. Identify the error: 'She go to market every day.'",
    options: ["She", "go", "to market", "every day"],
    answer: "go",
    type: "mcq"
  },
  {
    question: "16. Identify the error: 'He did not went to school yesterday.'",
    options: ["He", "did not", "went", "to school"],
    answer: "went",
    type: "mcq"
  },

  // 9. Comprehension (short)
  {
    question: "17. Passage: 'The sun rises in the east and sets in the west.' What direction does the sun set?",
    options: ["North", "East", "South", "West"],
    answer: "West",
    type: "mcq"
  },
  {
    question: "18. Passage: 'Water is essential for life.' What is essential for life?",
    options: ["Air", "Water", "Food", "Sunlight"],
    answer: "Water",
    type: "mcq"
  },

  // 10. Synonyms and Antonyms
  {
    question: "19. Synonym of 'begin':",
    options: ["End", "Start", "Close", "Finish"],
    answer: "Start",
    type: "mcq"
  },
  {
    question: "20. Antonym of 'strong':",
    options: ["Powerful", "Weak", "Sturdy", "Tough"],
    answer: "Weak",
    type: "mcq"
  }
];  
  

let currentQuestion = 0;
let userAnswers = new Array(questions.length).fill(null);
let timeLeft = 600; // 10 minutes in seconds
let timerInterval;

function startTimer() {
  timerInterval = setInterval(() => {
    if (timeLeft <= 0) {
      clearInterval(timerInterval);
      submitQuiz();
    } else {
      let minutes = Math.floor(timeLeft / 60);
      let seconds = timeLeft % 60;
      document.getElementById("timer").textContent = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
      timeLeft--;
    }
  }, 1000);
}

function renderQuestion(index) {
  const q = questions[index];
  const container = document.getElementById("questionContainer");
  container.innerHTML = `<div class="question"><p>${q.question}</p></div>`;

  if (q.type === "mcq") {
    q.options.forEach(option => {
      const checked = userAnswers[index] === option ? "checked" : "";
      container.innerHTML += `
        <div class="options">
          <label>
            <input type="radio" name="q${index}" value="${option}" ${checked}>
            ${option}
          </label>
        </div>
      `;
    });
  }

  document.getElementById("prevBtn").disabled = index === 0;
  document.getElementById("nextBtn").disabled = index === questions.length - 1;
}

function saveAnswer() {
  const selected = document.querySelector(`input[name="q${currentQuestion}"]:checked`);
  if (selected) {
    userAnswers[currentQuestion] = selected.value;
  }
}

function submitQuiz() {
  clearInterval(timerInterval);
  saveAnswer();

  let score = 0;
  questions.forEach((q, i) => {
    if (q.answer && userAnswers[i] && userAnswers[i].toLowerCase() === q.answer.toLowerCase()) {
      score++;
    }
  });

  document.getElementById("result").textContent = `You scored ${score} out of ${questions.length}`;
  document.getElementById("quizForm").style.display = "none";
  document.querySelector(".navigation").style.display = "none";
  document.getElementById("submitBtn").style.display = "none";
}

document.getElementById("nextBtn").addEventListener("click", () => {
  saveAnswer();
  if (currentQuestion < questions.length - 1) {
    currentQuestion++;
    renderQuestion(currentQuestion);
  }
});

document.getElementById("prevBtn").addEventListener("click", () => {
  saveAnswer();
  if (currentQuestion > 0) {
    currentQuestion--;
    renderQuestion(currentQuestion);
  }
});

document.getElementById("submitBtn").addEventListener("click", submitQuiz);

// Initialize
window.onload = () => {
  renderQuestion(currentQuestion);
  startTimer();
};
