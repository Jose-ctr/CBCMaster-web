/* ==================================================
   CBC MASTER
   Main Application JavaScript
   ================================================== */


/* ==================================================
   DIAGNOSTIC
   ================================================== */

document.body.insertAdjacentHTML(
  "afterbegin",
  `
    <div
      id="cbc-js-status"
      style="
        position:fixed;
        top:0;
        left:0;
        right:0;
        z-index:99999;
        background:#A6FF80;
        color:#000;
        padding:12px;
        text-align:center;
        font-weight:bold;
        font-family:Arial,sans-serif;
        box-shadow:0 2px 8px rgba(0,0,0,.25);
      "
    >
      CBC MASTER JavaScript is running
    </div>
  `
);


/* ==================================================
   CONFIGURATION
================================================== */

const SECRET = "K9";

const APPROVED_PHONES = [
  "254707649890",
  "254782609857"
];


/* ==================================================
   DOM ELEMENTS
================================================== */

const menuBtn =
  document.getElementById("menuBtn");

const closeMenuBtn =
  document.getElementById("closeMenuBtn");

const sidebar =
  document.getElementById("sidebar");

const overlay =
  document.getElementById("overlay");

const startBtn =
  document.getElementById("startBtn");

const nextBtn =
  document.getElementById("nextBtn");

const studentInput =
  document.getElementById("student");

const gradeSelect =
  document.getElementById("grade");

const quizBox =
  document.getElementById("quizBox");

const quizQuestion =
  document.getElementById("quizQuestion");

const answerInput =
  document.getElementById("answerInput");

const resultBox =
  document.getElementById("result");

const historyBox =
  document.getElementById("historyBox");

const leaderboardBox =
  document.getElementById("leaderboardBox");


/* ==================================================
   QUESTION BANK
================================================== */

const questionBank = {

  MATH: [
    {
      q: "What is 5 + 7?",
      a: "12"
    },
    {
      q: "What is 9 × 3?",
      a: "27"
    },
    {
      q: "What is 48 ÷ 6?",
      a: "8"
    },
    {
      q: "What is 100 − 45?",
      a: "55"
    },
    {
      q: "What is 12 × 4?",
      a: "48"
    },
    {
      q: "What is 81 ÷ 9?",
      a: "9"
    },
    {
      q: "What is 25 + 36?",
      a: "61"
    },
    {
      q: "What is 90 − 27?",
      a: "63"
    },
    {
      q: "What is 7 × 8?",
      a: "56"
    },
    {
      q: "What is 144 ÷ 12?",
      a: "12"
    }
  ],

  ENGLISH: [
    {
      q: "What is the opposite of 'hot'?",
      a: "cold"
    },
    {
      q: "What is the plural of 'child'?",
      a: "children"
    },
    {
      q: "What is a noun?",
      a: "name"
    },
    {
      q: "What is the opposite of 'big'?",
      a: "small"
    },
    {
      q: "Complete: The sun ___ brightly.",
      a: "shines"
    },
    {
      q: "What is the past tense of 'go'?",
      a: "went"
    },
    {
      q: "What is the plural of 'book'?",
      a: "books"
    },
    {
      q: "What is the opposite of 'early'?",
      a: "late"
    },
    {
      q: "What is the past tense of 'eat'?",
      a: "ate"
    },
    {
      q: "What is the opposite of 'happy'?",
      a: "sad"
    }
  ],

  SCIENCE: [
    {
      q: "What planet do we live on?",
      a: "earth"
    },
    {
      q: "What gas do humans breathe in?",
      a: "oxygen"
    },
    {
      q: "What do plants need to make food?",
      a: "sunlight"
    },
    {
      q: "How many legs does a spider have?",
      a: "8"
    },
    {
      q: "What organ pumps blood around the body?",
      a: "heart"
    },
    {
      q: "What is H2O commonly called?",
      a: "water"
    },
    {
      q: "Which sense organ helps us see?",
      a: "eye"
    },
    {
      q: "What force pulls objects toward Earth?",
      a: "gravity"
    },
    {
      q: "What do humans use to breathe?",
      a: "lungs"
    },
    {
      q: "What is the natural satellite of Earth?",
      a: "moon"
    }
  ],

  SOCIAL: [
    {
      q: "What is the capital city of Kenya?",
      a: "nairobi"
    },
    {
      q: "What is the currency of Kenya?",
      a: "kenyan shilling"
    },
    {
      q: "How many counties are in Kenya?",
      a: "47"
    },
    {
      q: "What is the national language of Kenya?",
      a: "swahili"
    },
    {
      q: "What is the largest lake in Kenya?",
      a: "lake victoria"
    },
    {
      q: "What is the Kenyan national flag's main color at the top?",
      a: "black"
    },
    {
      q: "Which ocean borders Kenya?",
      a: "indian ocean"
    },
    {
      q: "What is Kenya's national animal?",
      a: "lion"
    },
    {
      q: "What is the name of Kenya's parliament?",
      a: "parliament"
    },
    {
      q: "What continent is Kenya in?",
      a: "africa"
    }
  ]

};


/* ==================================================
   QUIZ STATE
================================================== */

let currentQuestions = [];

let currentQuestionIndex = 0;

let currentScore = 0;

let currentStudent = "";

let currentGrade = "";


/* ==================================================
   UTILITY
================================================== */

function escapeHTML(value) {

  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");

}


/* ==================================================
   SIDEBAR
================================================== */

function openSidebar() {

  if (sidebar) {
    sidebar.classList.add("open");
  }

  if (overlay) {
    overlay.classList.add("show");
  }

}


function closeSidebar() {

  if (sidebar) {
    sidebar.classList.remove("open");
  }

  if (overlay) {
    overlay.classList.remove("show");
  }

}


if (menuBtn) {

  menuBtn.addEventListener(
    "click",
    openSidebar
  );

}


if (closeMenuBtn) {

  closeMenuBtn.addEventListener(
    "click",
    closeSidebar
  );

}


if (overlay) {

  overlay.addEventListener(
    "click",
    closeSidebar
  );

}


document.addEventListener(
  "keydown",
  function (event) {

    if (event.key === "Escape") {
      closeSidebar();
    }

  }
);


/* ==================================================
   NOTES
================================================== */

function showNotes() {

  alert(
    "CBC MASTER Notes\n\n" +
    "Notes feature is ready for the next development stage."
  );

}


const notesBtn =
  document.getElementById("notesBtn");

const notesMainBtn =
  document.getElementById("notesMainBtn");


if (notesBtn) {

  notesBtn.addEventListener(
    "click",
    function () {

      closeSidebar();
      showNotes();

    }
  );

}


if (notesMainBtn) {

  notesMainBtn.addEventListener(
    "click",
    showNotes
  );

}


/* ==================================================
   PROJECTS
================================================== */

function showProjects() {

  alert(
    "CBC MASTER Projects\n\n" +
    "Project management features are coming soon."
  );

}


const projectsBtn =
  document.getElementById("projectsBtn");

const projectsMainBtn =
  document.getElementById("projectsMainBtn");


if (projectsBtn) {

  projectsBtn.addEventListener(
    "click",
    function () {

      closeSidebar();
      showProjects();

    }
  );

}


if (projectsMainBtn) {

  projectsMainBtn.addEventListener(
    "click",
    showProjects
  );

}


/* ==================================================
   HISTORY
================================================== */

function getHistory() {

  try {

    const stored =
      localStorage.getItem(
        "cbc_history"
      );

    if (!stored) {
      return [];
    }

    const parsed =
      JSON.parse(stored);

    return Array.isArray(parsed)
      ? parsed
      : [];

  } catch (error) {

    console.error(
      "Unable to read CBC history:",
      error
    );

    return [];

  }

}


function saveHistory(record) {

  const history =
    getHistory();

  history.unshift(record);

  const limitedHistory =
    history.slice(0, 50);

  localStorage.setItem(
    "cbc_history",
    JSON.stringify(
      limitedHistory
    )
  );

}


function renderHistory() {

  if (!historyBox) {
    return;
  }

  const history =
    getHistory();

  if (history.length === 0) {

    historyBox.innerHTML = `
      <p>
        No quiz history yet.
      </p>
    `;

    return;

  }

  historyBox.innerHTML =
    history
      .map(function (item) {

        return `
          <div class="history-item">

            <strong>
              ${escapeHTML(
                item.student || "Student"
              )}
            </strong>

            <div>
              Grade:
              ${escapeHTML(
                item.grade || "-"
              )}
            </div>

            <div>
              Score:
              ${escapeHTML(
                item.score ?? 0
              )}/${escapeHTML(
                item.total ?? 0
              )}
            </div>

            <small>
              ${escapeHTML(
                item.date || ""
              )}
            </small>

          </div>
        `;

      })
      .join("");

}


/* ==================================================
   LEADERBOARD
================================================== */

function renderLeaderboard() {

  if (!leaderboardBox) {
    return;
  }

  const history =
    getHistory();

  if (history.length === 0) {

    leaderboardBox.innerHTML = `
      <p>
        No scores available yet.
      </p>
    `;

    return;

  }

  const sorted =
    [...history]
      .sort(function (a, b) {

        return (
          Number(b.score || 0) -
          Number(a.score || 0)
        );

      })
      .slice(0, 10);

  leaderboardBox.innerHTML =
    sorted
      .map(function (item, index) {

        return `
          <div class="leaderboard-item">

            <strong>
              ${index + 1}.
              ${escapeHTML(
                item.student || "Student"
              )}
            </strong>

            <span>
              ${escapeHTML(
                item.score ?? 0
              )}/${escapeHTML(
                item.total ?? 0
              )}
            </span>

          </div>
        `;

      })
      .join("");

}


/* ==================================================
   HISTORY BUTTON
================================================== */

function showHistory() {

  closeSidebar();

  if (historyBox) {

    historyBox.scrollIntoView({
      behavior: "smooth",
      block: "start"
    });

  }

}


const historyBtn =
  document.getElementById("historyBtn");


if (historyBtn) {

  historyBtn.addEventListener(
    "click",
    showHistory
  );

}


/* ==================================================
   LEADERBOARD BUTTON
================================================== */

function showLeaderboard() {

  closeSidebar();

  if (leaderboardBox) {

    leaderboardBox.scrollIntoView({
      behavior: "smooth",
      block: "start"
    });

  }

}


const leaderboardBtn =
  document.getElementById(
    "leaderboardBtn"
  );


if (leaderboardBtn) {

  leaderboardBtn.addEventListener(
    "click",
    showLeaderboard
  );

}


/* ==================================================
   QUIZ
================================================== */

function startQuiz() {

  currentStudent =
    studentInput
      ? studentInput.value.trim()
      : "";

  currentGrade =
    gradeSelect
      ? gradeSelect.value
      : "";

  if (!currentStudent) {

    alert(
      "Please enter the student's name."
    );

    if (studentInput) {
      studentInput.focus();
    }

    return;

  }


  if (!currentGrade) {

    alert(
      "Please select a grade."
    );

    if (gradeSelect) {
      gradeSelect.focus();
    }

    return;

  }


  const subjects =
    Object.keys(
      questionBank
    );

  let allQuestions = [];

  subjects.forEach(
    function (subject) {

      questionBank[subject]
        .forEach(
          function (question) {

            allQuestions.push({
              subject: subject,
              q: question.q,
              a: question.a
            });

          }
        );

    }
  );


  allQuestions =
    allQuestions
      .sort(
        function () {
          return Math.random() - 0.5;
        }
      )
      .slice(0, 10);


  currentQuestions =
    allQuestions;

  currentQuestionIndex = 0;

  currentScore = 0;


  if (quizBox) {

    quizBox.style.display =
      "block";

  }


  if (resultBox) {

    resultBox.innerHTML =
      "";

  }


  displayQuestion();


  if (quizBox) {

    quizBox.scrollIntoView({
      behavior: "smooth",
      block: "start"
    });

  }

}


/* ==================================================
   DISPLAY QUESTION
================================================== */

function displayQuestion() {

  if (
    !currentQuestions ||
    currentQuestions.length === 0
  ) {
    return;
  }


  const question =
    currentQuestions[
      currentQuestionIndex
    ];


  if (quizQuestion) {

    quizQuestion.innerHTML = `
      <div>
        <strong>
          Question
          ${currentQuestionIndex + 1}
          of
          ${currentQuestions.length}
        </strong>
      </div>

      <div style="margin-top:10px;">
        ${escapeHTML(question.q)}
      </div>
    `;

  }


  if (answerInput) {

    answerInput.value = "";

    answerInput.focus();

  }


  if (nextBtn) {

    nextBtn.textContent =
      currentQuestionIndex ===
      currentQuestions.length - 1
        ? "Finish Quiz"
        : "Next Question";

  }

}


/* ==================================================
   ANSWER NORMALIZATION
================================================== */

function normalizeAnswer(value) {

  return String(value || "")
    .trim()
    .toLowerCase()
    .replace(/\s+/g, " ");

}


/* ==================================================
   CHECK ANSWER
================================================== */

function checkAnswer() {

  if (
    !currentQuestions ||
    currentQuestions.length === 0
  ) {
    return;
  }


  const question =
    currentQuestions[
      currentQuestionIndex
    ];


  const userAnswer =
    normalizeAnswer(
      answerInput
        ? answerInput.value
        : ""
    );


  const correctAnswer =
    normalizeAnswer(
      question.a
    );


  if (!userAnswer) {

    alert(
      "Please enter an answer."
    );

    if (answerInput) {
      answerInput.focus();
    }

    return;

  }


  if (
    userAnswer ===
    correctAnswer
  ) {

    currentScore++;

    if (resultBox) {

      resultBox.innerHTML = `
        <div class="correct">
          ✓ Correct!
        </div>
      `;

    }

  } else {

    if (resultBox) {

      resultBox.innerHTML = `
        <div class="incorrect">
          ✗ Incorrect.
          Correct answer:
          <strong>
            ${escapeHTML(
              question.a
            )}
          </strong>
        </div>
      `;

    }

  }


  setTimeout(
    function () {

      if (
        currentQuestionIndex <
        currentQuestions.length - 1
      ) {

        currentQuestionIndex++;

        if (resultBox) {
          resultBox.innerHTML = "";
        }

        displayQuestion();

      } else {

        finishQuiz();

      }

    },
    600
  );

}


/* ==================================================
   NEXT BUTTON
================================================== */

if (nextBtn) {

  nextBtn.addEventListener(
    "click",
    checkAnswer
  );

}


/* ==================================================
   FINISH QUIZ
================================================== */

function finishQuiz() {

  const total =
    currentQuestions.length;


  const percentage =
    total > 0
      ? Math.round(
          (currentScore / total) * 100
        )
      : 0;


  const record = {

    student:
      currentStudent,

    grade:
      currentGrade,

    score:
      currentScore,

    total:
      total,

    percentage:
      percentage,

    date:
      new Date().toLocaleString()

  };


  saveHistory(record);

  renderHistory();

  renderLeaderboard();


  if (quizQuestion) {

    quizQuestion.innerHTML = `
      <div class="quiz-complete">

        <h2>
          Quiz Complete
        </h2>

        <p>
          ${escapeHTML(
            currentStudent
          )}
        </p>

        <h3>
          Score:
          ${currentScore}/${total}
        </h3>

        <p>
          ${percentage}%
        </p>

      </div>
    `;

  }


  if (answerInput) {

    answerInput.style.display =
      "none";

  }


  if (nextBtn) {

    nextBtn.style.display =
      "none";

  }


  if (resultBox) {

    resultBox.innerHTML = `
      <button
        type="button"
        class="action-btn"
        onclick="startQuiz()"
      >
        🔄 Try Another Quiz
      </button>
    `;

  }

}


/* ==================================================
   START QUIZ BUTTON
================================================== */

if (startBtn) {

  startBtn.addEventListener(
    "click",
    startQuiz
  );

}


/* ==================================================
   RATE
================================================== */

function rateApp() {

  closeSidebar();

  alert(
    "Thank you for using CBC MASTER!"
  );

}


const rateBtn =
  document.getElementById(
    "rateBtn"
  );


if (rateBtn) {

  rateBtn.addEventListener(
    "click",
    rateApp
  );

}


/* ==================================================
   SHARE
================================================== */

function shareApp() {

  const shareData = {

    title:
      "CBC MASTER",

    text:
      "CBC MASTER — Teach smarter. Save time. Go digital.",

    url:
      window.location.href

  };


  if (
    navigator.share
  ) {

    navigator.share(
      shareData
    )
      .catch(
        function (error) {

          console.log(
            "Share cancelled:",
            error
          );

        }
      );

  } else {

    alert(
      "Share this link:\n\n" +
      window.location.href
    );

  }

}


const shareBtn =
  document.getElementById(
    "shareBtn"
  );


if (shareBtn) {

  shareBtn.addEventListener(
    "click",
    shareApp
  );

}


/* ==================================================
   PREMIUM
================================================== */

function showPremium() {

  closeSidebar();


  const phone =
    prompt(
      "Enter your phone number:"
    );


  if (!phone) {
    return;
  }


  const normalizedPhone =
    phone
      .replace(/\D/g, "");


  if (
    APPROVED_PHONES.includes(
      normalizedPhone
    )
  ) {

    const code =
      prompt(
        "Enter your CBC MASTER activation code:"
      );


    const expectedCode =
      "CBC-" +
      SECRET +
      "-" +
      normalizedPhone.slice(-4);


    if (
      code &&
      code.trim().toUpperCase() ===
      expectedCode
    ) {

      localStorage.setItem(
        "cbc_premium",
        "true"
      );

      alert(
        "Premium activated successfully."
      );

    } else {

      alert(
        "Invalid activation code."
      );

    }

  } else {

    alert(
      "Premium activation requires an approved phone number.\n\n" +
      "Price: KSh 150\n" +
      "M-Pesa: 0707649890\n\n" +
      "For support, contact ThinkPlus on WhatsApp."
    );

  }

}


const premiumMenuBtn =
  document.getElementById(
    "premiumMenuBtn"
  );


if (premiumMenuBtn) {

  premiumMenuBtn.addEventListener(
    "click",
    showPremium
  );

}


/* ==================================================
   CONTACT
================================================== */

const contactBtn =
  document.getElementById(
    "contactBtn"
  );


if (contactBtn) {

  contactBtn.addEventListener(
    "click",
    function () {

      window.open(
        "https://wa.me/254707649890",
        "_blank"
      );

    }
  );

}


/* ==================================================
   APK DOWNLOAD
================================================== */

const downloadBtn =
  document.getElementById(
    "downloadBtn"
  );


if (downloadBtn) {

  downloadBtn.addEventListener(
    "click",
    function () {

      window.location.href =
        "https://github.com/Jose-ctr/CBCMast/releases/download/v1/cbc-master.apk";

    }
  );

}


/* ==================================================
   HISTORY / LEADERBOARD INITIALIZATION
================================================== */

renderHistory();

renderLeaderboard();


/* ==================================================
   PWA INSTALL
================================================== */

let deferredInstallPrompt = null;


window.addEventListener(
  "beforeinstallprompt",
  function (event) {

    event.preventDefault();

    deferredInstallPrompt =
      event;

  }
);


function isInstalledApp() {

  return (
    window.matchMedia(
      "(display-mode: standalone)"
    ).matches ||
    window.navigator.standalone === true
  );

}


/* ==================================================
   LAST VISIT
================================================== */

try {

  localStorage.setItem(
    "cbc_last_visit",
    new Date().toISOString()
  );

} catch (error) {

  console.log(
    "Local storage unavailable:",
    error
  );

}


/* ==================================================
   SERVICE WORKER
================================================== */

if (
  "serviceWorker" in navigator
) {

  window.addEventListener(
    "load",
    function () {

      navigator.serviceWorker
        .register("./sw.js")
        .then(
          function (registration) {

            console.log(
              "CBC MASTER Service Worker registered:",
              registration.scope
            );

          }
        )
        .catch(
          function (error) {

            console.error(
              "CBC MASTER Service Worker registration failed:",
              error
            );

          }
        );

    }
  );

}


/* ==================================================
   FINAL STATUS
================================================== */

console.log(
  "CBC MASTER loaded successfully."
);
