/* ==================================================
   CONFIGURATION
================================================== */

const SECRET = "K9";

const APPROVED_PHONES = [
  "254707649890",
  "254782609857"
];


/* ==================================================
   DOM
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
   SIDEBAR
================================================== */

function openMenu() {

  if (sidebar) {
    sidebar.classList.add("open");
  }

  if (overlay) {
    overlay.classList.add("show");
  }

  if (menuBtn) {
    menuBtn.setAttribute(
      "aria-expanded",
      "true"
    );
  }

}


function closeMenu() {

  if (sidebar) {
    sidebar.classList.remove("open");
  }

  if (overlay) {
    overlay.classList.remove("show");
  }

  if (menuBtn) {
    menuBtn.setAttribute(
      "aria-expanded",
      "false"
    );
  }

}


menuBtn?.addEventListener(
  "click",
  openMenu
);


closeMenuBtn?.addEventListener(
  "click",
  closeMenu
);


overlay?.addEventListener(
  "click",
  closeMenu
);


document.addEventListener(
  "keydown",
  function (event) {

    if (event.key === "Escape") {
      closeMenu();
    }

  }
);


/* ==================================================
   QUESTION BANK
================================================== */

const questionBank = [

  {
    q: "345 + 289 =?",
    a: "634",
    subj: "MATH"
  },

  {
    q: "72 x 6 =?",
    a: "432",
    subj: "MATH"
  },

  {
    q: "1000 - 456 =?",
    a: "544",
    subj: "MATH"
  },

  {
    q: "9 x 9 =?",
    a: "81",
    subj: "MATH"
  },

  {
    q: "144 / 12 =?",
    a: "12",
    subj: "MATH"
  },

  {
    q: "25% of 200 =?",
    a: "50",
    subj: "MATH"
  },

  {
    q: "3/4 + 1/4 =?",
    a: "1",
    subj: "MATH"
  },

  {
    q: "Square of 15 =?",
    a: "225",
    subj: "MATH"
  },

  {
    q: "LCM of 4 and 6 =?",
    a: "12",
    subj: "MATH"
  },

  {
    q: "Perimeter of a square with side 8cm =?",
    a: "32",
    subj: "MATH"
  },

  {
    q: "50 + 75 =?",
    a: "125",
    subj: "MATH"
  },

  {
    q: "500 - 275 =?",
    a: "225",
    subj: "MATH"
  },

  {
    q: "15 x 4 =?",
    a: "60",
    subj: "MATH"
  },

  {
    q: "120 / 10 =?",
    a: "12",
    subj: "MATH"
  },

  {
    q: "Half of 100 =?",
    a: "50",
    subj: "MATH"
  },


  {
    q: "Correct spelling: A) Enviroment B) Environment C) Enviornment",
    a: "B",
    subj: "ENGLISH"
  },

  {
    q: "Opposite of Brave?",
    a: "coward",
    subj: "ENGLISH"
  },

  {
    q: "Plural of Child?",
    a: "children",
    subj: "ENGLISH"
  },

  {
    q: "Synonym of Happy?",
    a: "joyful",
    subj: "ENGLISH"
  },

  {
    q: "Past tense of Go?",
    a: "went",
    subj: "ENGLISH"
  },

  {
    q: "A person who writes books is a?",
    a: "author",
    subj: "ENGLISH"
  },

  {
    q: "Choose: I ___ to school yesterday. A) go B) went C) gone",
    a: "B",
    subj: "ENGLISH"
  },

  {
    q: "Punctuation: What a beautiful day ___",
    a: "!",
    subj: "ENGLISH"
  },

  {
    q: "Antonym of Expensive?",
    a: "cheap",
    subj: "ENGLISH"
  },

  {
    q: "How many vowels are in Education?",
    a: "5",
    subj: "ENGLISH"
  },

  {
    q: "Opposite of Hot?",
    a: "cold",
    subj: "ENGLISH"
  },

  {
    q: "Plural of Mouse?",
    a: "mice",
    subj: "ENGLISH"
  },

  {
    q: "Past tense of Eat?",
    a: "ate",
    subj: "ENGLISH"
  },

  {
    q: "Synonym of Big?",
    a: "large",
    subj: "ENGLISH"
  },

  {
    q: "A young dog is called a?",
    a: "puppy",
    subj: "ENGLISH"
  },


  {
    q: "Part of plant that makes food? A) Root B) Leaf C) Stem",
    a: "B",
    subj: "SCIENCE"
  },

  {
    q: "How many common states of matter? A) 2 B) 3 C) 4",
    a: "B",
    subj: "SCIENCE"
  },

  {
    q: "Water boils at ___ degrees C?",
    a: "100",
    subj: "SCIENCE"
  },

  {
    q: "The largest planet?",
    a: "jupiter",
    subj: "SCIENCE"
  },

  {
    q: "Humans have approximately ___ bones?",
    a: "206",
    subj: "SCIENCE"
  },

  {
    q: "Gas we breathe in?",
    a: "oxygen",
    subj: "SCIENCE"
  },

  {
    q: "Animal that lays eggs?",
    a: "chicken",
    subj: "SCIENCE"
  },

  {
    q: "Source of light and heat for Earth?",
    a: "sun",
    subj: "SCIENCE"
  },

  {
    q: "Name one part of an insect.",
    a: "head",
    subj: "SCIENCE"
  },

  {
    q: "Tool used to measure temperature?",
    a: "thermometer",
    subj: "SCIENCE"
  },

  {
    q: "Which organ pumps blood around the body?",
    a: "heart",
    subj: "SCIENCE"
  },

  {
    q: "Which sense organ is used for seeing?",
    a: "eye",
    subj: "SCIENCE"
  },

  {
    q: "Plants need sunlight to make?",
    a: "food",
    subj: "SCIENCE"
  },

  {
    q: "Water changes into ice when it is?",
    a: "cold",
    subj: "SCIENCE"
  },

  {
    q: "Which planet do we live on?",
    a: "earth",
    subj: "SCIENCE"
  },


  {
    q: "Capital of Kenya?",
    a: "nairobi",
    subj: "SOCIAL"
  },

  {
    q: "Currency of Kenya?",
    a: "shilling",
    subj: "SOCIAL"
  },

  {
    q: "Largest lake in Kenya?",
    a: "turkana",
    subj: "SOCIAL"
  },

  {
    q: "National animal of Kenya?",
    a: "lion",
    subj: "SOCIAL"
  },

  {
    q: "First president of Kenya?",
    a: "jomo kenyatta",
    subj: "SOCIAL"
  },

  {
    q: "Kenya is located in which continent?",
    a: "africa",
    subj: "SOCIAL"
  },

  {
    q: "What is the capital city of Tanzania?",
    a: "dodoma",
    subj: "SOCIAL"
  },

  {
    q: "Which ocean borders Kenya?",
    a: "indian ocean",
    subj: "SOCIAL"
  },

  {
    q: "What is the national language commonly used in Kenya?",
    a: "swahili",
    subj: "SOCIAL"
  },

  {
    q: "How many counties does Kenya have?",
    a: "47",
    subj: "SOCIAL"
  }

];


/* ==================================================
   QUIZ VARIABLES
================================================== */

let currentQuestions = [];

let currentQuestionIndex = 0;

let currentScore = 0;

let currentStudent = "";

let currentGrade = "";


/* ==================================================
   ESCAPE HTML
================================================== */

function escapeHTML(value) {

  return String(value || "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");

}


/* ==================================================
   HISTORY
================================================== */

function getHistory() {

  try {

    return JSON.parse(
      localStorage.getItem(
        "cbc_history"
      ) || "[]"
    );

  } catch (error) {

    console.error(
      "History loading error:",
      error
    );

    return [];

  }

}


function saveHistory(
  student,
  grade,
  score,
  total
) {

  const history = getHistory();

  const percent =
    total > 0
      ? Math.round(
          (score / total) * 100
        )
      : 0;

  const result = {

    student,
    grade,
    score,
    total,
    percent,

    date:
      new Date().toLocaleString()

  };

  history.push(result);

  localStorage.setItem(
    "cbc_history",
    JSON.stringify(
      history.slice(-50)
    )
  );

  return result;

}


function renderHistory() {

  const history = getHistory();

  if (!historyBox) {
    return;
  }

  if (history.length === 0) {

    historyBox.innerHTML =
      "<p>No history saved yet.</p>";

    return;

  }

  let html = "";

  history
    .slice()
    .reverse()
    .forEach(
      function (item, index) {

        html += `

          <div class="history-item">

            <strong>
              ${index + 1}.
              ${escapeHTML(item.student)}
            </strong>

            <br>

            Grade:
            ${escapeHTML(item.grade)}

            <br>

            Score:
            ${item.score}/${item.total}

            (${item.percent}%)

            <br>

            Date:
            ${escapeHTML(item.date)}

          </div>

        `;

      }
    );

  historyBox.innerHTML = html;

}


function renderLeaderboard() {

  const history = getHistory();

  if (!leaderboardBox) {
    return;
  }

  if (history.length === 0) {

    leaderboardBox.innerHTML =
      "<p>No scores yet.</p>";

    return;

  }

  const sorted =
    history
      .slice()
      .sort(
        function (a, b) {

          if (
            b.percent !==
            a.percent
          ) {

            return (
              b.percent -
              a.percent
            );

          }

          return (
            b.score -
            a.score
          );

        }
      );

  let html = "";

  sorted
    .slice(0, 10)
    .forEach(
      function (item, index) {

        html += `

          <div class="history-item">

            🏆

            <strong>
              ${index + 1}.
              ${escapeHTML(item.student)}
            </strong>

            <br>

            Grade:
            ${escapeHTML(item.grade)}

            <br>

            Score:
            ${item.percent}%

          </div>

        `;

      }
    );

  leaderboardBox.innerHTML = html;

}


/* ==================================================
   NOTES
================================================== */

function showNotes() {

  closeMenu();

  alert(
    "📝 CBC MASTER NOTES\n\n" +

    "Grade 4-6 revision notes\n\n" +

    "Mathematics\n" +
    "• Numbers\n" +
    "• Fractions\n" +
    "• Measurement\n" +
    "• Geometry\n\n" +

    "English\n" +
    "• Grammar\n" +
    "• Vocabulary\n" +
    "• Reading\n\n" +

    "Science\n" +
    "• Plants\n" +
    "• Animals\n" +
    "• Matter\n\n" +

    "Social Studies\n" +
    "• Kenya\n" +
    "• Environment\n" +
    "• Community\n\n" +

    "More revision notes will be added in future updates."
  );

}


document
  .getElementById("notesBtn")
  ?.addEventListener(
    "click",
    showNotes
  );

document
  .getElementById("notesMainBtn")
  ?.addEventListener(
    "click",
    showNotes
  );


/* ==================================================
   PROJECTS
================================================== */

function showProjects() {

  closeMenu();

  alert(
    "📚 CBC PROJECTS\n\n" +

    "GRADE 4\n\n" +
    "• Water Filter Project\n" +
    "• Simple Weather Chart\n" +
    "• Plant Growth Observation\n\n" +

    "GRADE 5\n\n" +
    "• Financial Budget Project\n" +
    "• Environmental Conservation\n" +
    "• Simple Machine Project\n\n" +

    "GRADE 6\n\n" +
    "• Community Problem Solution\n" +
    "• Water Conservation\n" +
    "• Environmental Research\n\n" +

    "Project guides and marking rubrics will be expanded in future updates."
  );

}


document
  .getElementById("projectsBtn")
  ?.addEventListener(
    "click",
    showProjects
  );

document
  .getElementById("projectsMainBtn")
  ?.addEventListener(
    "click",
    showProjects
  );


/* ==================================================
   HISTORY / LEADERBOARD MENU
================================================== */

document
  .getElementById("historyBtn")
  ?.addEventListener(
    "click",
    function () {

      closeMenu();

      historyBox?.scrollIntoView({
        behavior: "smooth",
        block: "center"
      });

    }
  );


document
  .getElementById("leaderboardBtn")
  ?.addEventListener(
    "click",
    function () {

      closeMenu();

      leaderboardBox?.scrollIntoView({
        behavior: "smooth",
        block: "center"
      });

    }
  );


/* ==================================================
   START QUIZ
================================================== */

function startQuiz() {

  const student =
    String(
      studentInput?.value || ""
    ).trim();

  const grade =
    String(
      gradeSelect?.value || "4"
    );

  if (!student) {

    alert(
      "Please enter the student's name first."
    );

    studentInput?.focus();

    return;

  }

  currentStudent = student;

  currentGrade = grade;

  currentScore = 0;

  currentQuestionIndex = 0;

  currentQuestions =
    questionBank
      .slice()
      .sort(
        () =>
          Math.random() - 0.5
      )
      .slice(0, 10);

  if (
    currentQuestions.length === 0
  ) {

    alert(
      "No questions are available."
    );

    return;

  }

  if (resultBox) {

    resultBox.style.display =
      "none";

    resultBox.innerHTML = "";

  }

  if (quizBox) {

    quizBox.style.display =
      "block";

  }

  displayQuestion();

  quizBox?.scrollIntoView({
    behavior: "smooth",
    block: "start"
  });

}


/* ==================================================
   DISPLAY QUESTION
================================================== */

function displayQuestion() {

  if (
    !quizQuestion ||
    !answerInput ||
    !nextBtn
  ) {
    return;
  }

  const question =
    currentQuestions[
      currentQuestionIndex
    ];

  if (!question) {

    finishQuiz();

    return;

  }

  quizQuestion.innerHTML = `

    <div class="quiz-number">

      Question
      ${currentQuestionIndex + 1}
      of
      ${currentQuestions.length}

    </div>

    <div>
      ${escapeHTML(question.q)}
    </div>

    <div style="
      margin-top:8px;
      font-size:13px;
      color:#64748B;
      font-weight:normal;
    ">

      Subject:
      ${escapeHTML(question.subj)}

    </div>

  `;

  answerInput.value = "";

  answerInput.focus();

  nextBtn.textContent =
    currentQuestionIndex ===
    currentQuestions.length - 1
      ? "Finish Quiz ✓"
      : "Next Question →";

}


/* ==================================================
   ANSWER NORMALIZATION
================================================== */

function normalizeAnswer(answer) {

  return String(answer || "")
    .trim()
    .toLowerCase()
    .replace(/\s+/g, " ");

}


/* ==================================================
   CHECK ANSWER
================================================== */

function checkAnswer() {

  if (!answerInput) {
    return;
  }

  const userAnswer =
    normalizeAnswer(
      answerInput.value
    );

  if (!userAnswer) {

    alert(
      "Please enter an answer."
    );

    answerInput.focus();

    return;

  }

  const question =
    currentQuestions[
      currentQuestionIndex
    ];

  if (!question) {
    return;
  }

  const correctAnswer =
    normalizeAnswer(
      question.a
    );

  if (
    userAnswer ===
    correctAnswer
  ) {

    currentScore++;

  }

  currentQuestionIndex++;

  if (
    currentQuestionIndex >=
    currentQuestions.length
  ) {

    finishQuiz();

  } else {

    displayQuestion();

  }

}


/* ==================================================
   FINISH QUIZ
================================================== */

function finishQuiz() {

  const total =
    currentQuestions.length;

  const percent =
    total > 0
      ? Math.round(
          (currentScore / total) *
          100
        )
      : 0;

  const saved =
    saveHistory(
      currentStudent,
      currentGrade,
      currentScore,
      total
    );

  if (quizBox) {

    quizBox.style.display =
      "none";

  }

  if (resultBox) {

    let message = "";

    if (percent >= 80) {

      message =
        "🎉 Excellent work!";

    } else if (percent >= 60) {

      message =
        "👏 Good work! Keep practicing.";

    } else if (percent >= 40) {

      message =
        "👍 Keep learning and try again.";

    } else {

      message =
        "💪 Keep practicing. You can do it!";

    }

    resultBox.style.display =
      "block";

    resultBox.innerHTML = `

      <div class="quiz-score">

        ${escapeHTML(message)}

      </div>

      <strong>
        Student:
      </strong>

      ${escapeHTML(saved.student)}

      <br>

      <strong>
        Grade:
      </strong>

      ${escapeHTML(saved.grade)}

      <br>

      <strong>
        Score:
      </strong>

      ${saved.score}/${saved.total}

      <br>

      <strong>
        Percentage:
      </strong>

      ${saved.percent}%

      <br><br>

      <button
        type="button"
        class="action-btn"
        onclick="startQuiz()">

        🔄 Try Another Quiz

      </button>

    `;

    resultBox.scrollIntoView({
      behavior: "smooth",
      block: "center"
    });

  }

  renderHistory();

  renderLeaderboard();

}


startBtn?.addEventListener(
  "click",
  startQuiz
);


nextBtn?.addEventListener(
  "click",
  checkAnswer
);


answerInput?.addEventListener(
  "keydown",
  function (event) {

    if (event.key === "Enter") {

      event.preventDefault();

      checkAnswer();

    }

  }
);


/* ==================================================
   RATE
================================================== */

document
  .getElementById("rateBtn")
  ?.addEventListener(
    "click",
    function () {

      closeMenu();

      alert(
        "⭐ Thank you for using CBC MASTER!\n\n" +
        "If you enjoy the app, please rate it " +
        "and share it with other learners."
      );

    }
  );


/* ==================================================
   SHARE
================================================== */

async function shareApp() {

  closeMenu();

  const shareData = {

    title: "CBC MASTER",

    text:
      "CBC MASTER - Grade 4-6 quizzes, notes and projects.",

    url:
      window.location.href

  };

  if (navigator.share) {

    try {

      await navigator.share(
        shareData
      );

    } catch (error) {

      console.log(
        "Share cancelled."
      );

    }

  } else {

    try {

      await navigator.clipboard.writeText(
        window.location.href
      );

      alert(
        "CBC MASTER link copied!\n\n" +
        "You can now share it with others."
      );

    } catch (error) {

      alert(
        "Share this link:\n\n" +
        window.location.href
      );

    }

  }

}


document
  .getElementById("shareBtn")
  ?.addEventListener(
    "click",
    shareApp
  );


/* ==================================================
   PREMIUM
================================================== */

function normalizePhone(phone) {

  const digits =
    String(phone || "")
      .replace(/\D/g, "");

  if (
    digits.length === 10 &&
    digits.startsWith("0")
  ) {

    return (
      "254" +
      digits.substring(1)
    );

  }

  return digits;

}


function generateCode(phone) {

  const normalized =
    normalizePhone(phone);

  return (
    "CBC-" +
    SECRET +
    "-" +
    normalized.slice(-4)
  );

}


function isActivated() {

  const saved =
    localStorage.getItem(
      "cbc_code"
    );

  if (!saved) {
    return false;
  }

  return APPROVED_PHONES.some(
    function (phone) {

      return (
        saved ===
        generateCode(phone)
      );

    }
  );

}


function showActivation() {

  closeMenu();

  document
    .getElementById(
      "activationModal"
    )
    ?.remove();


  const modal =
    document.createElement("div");

  modal.id =
    "activationModal";

  modal.style.cssText = `
    position:fixed;
    inset:0;
    background:rgba(0,0,0,.70);
    z-index:5000;
    display:flex;
    align-items:center;
    justify-content:center;
    padding:20px;
  `;


  modal.innerHTML = `

    <div style="
      width:100%;
      max-width:420px;
      background:white;
      border-radius:16px;
      padding:24px;
      box-shadow:0 10px 30px rgba(0,0,0,.35);
      color:#111827;
    ">

      <button
        id="closeActivation"
        type="button"
        style="
          float:right;
          width:36px;
          height:36px;
          border:0;
          border-radius:50%;
          background:#E5E7EB;
          font-size:22px;
          cursor:pointer;
        ">

        ×

      </button>


      <h2 style="
        margin-top:0;
        color:#0F766E;
        text-align:center;
      ">

        🔓 CBC MASTER PREMIUM

      </h2>


      <p style="
        text-align:center;
        line-height:1.5;
      ">

        Unlock CBC MASTER Premium for

        <strong>
          KSh 150
        </strong>

      </p>


      <div style="
        background:#ECFDF5;
        border:1px solid #16A34A;
        border-radius:10px;
        padding:15px;
        text-align:center;
        margin:15px 0;
      ">

        <strong>
          M-Pesa
        </strong>

        <br><br>

        Send

        <strong>
          KSh 150
        </strong>

        to

        <strong>
          0707649890
        </strong>

      </div>


      <a
        href="https://wa.me/254707649890?text=Hello%20CBC%20MASTER%20Support.%20I%20have%20paid%20KSh%20150%20and%20need%20my%20activation%20code."
        style="
          display:block;
          text-align:center;
          text-decoration:none;
          background:#16A34A;
          color:white;
          padding:14px;
          border-radius:10px;
          font-weight:bold;
          margin-top:12px;
        ">

        💬 SEND PAYMENT CONFIRMATION

      </a>


      <hr style="
        border:0;
        border-top:1px solid #E5E7EB;
        margin:20px 0;
      ">


      <p style="
        font-size:14px;
        color:#64748B;
        text-align:center;
      ">

        Already received your activation code?

      </p>


      <input
        id="activationCodeInput"
        type="text"
        placeholder="Enter activation code"
        autocomplete="off"
        style="
          width:100%;
          padding:13px;
          border:1px solid #CBD5E1;
          border-radius:10px;
          font-size:16px;
        ">


      <button
        id="activateCodeBtn"
        type="button"
        style="
          width:100%;
          padding:14px;
          border:0;
          border-radius:10px;
          background:#0F766E;
          color:white;
          font-size:16px;
          font-weight:bold;
          margin-top:12px;
          cursor:pointer;
        ">

        🔓 ACTIVATE NOW

      </button>


      <div
        id="activationMessage"
        style="
          display:none;
          margin-top:12px;
          padding:10px;
          border-radius:8px;
          text-align:center;
          font-size:14px;
        ">
      </div>

    </div>

  `;


  document.body.appendChild(
    modal
  );


  document
    .getElementById(
      "closeActivation"
    )
    ?.addEventListener(
      "click",
      function () {

        modal.remove();

      }
    );


  const activateBtn =
    document.getElementById(
      "activateCodeBtn"
    );

  const codeInput =
    document.getElementById(
      "activationCodeInput"
    );

  const message =
    document.getElementById(
      "activationMessage"
    );


  activateBtn?.addEventListener(
    "click",
    function () {

      const code =
        String(
          codeInput?.value || ""
        )
          .trim()
          .toUpperCase();


      if (!code) {

        message.style.display =
          "block";

        message.style.background =
          "#FEF2F2";

        message.style.color =
          "#DC2626";

        message.textContent =
          "Please enter your activation code.";

        return;

      }


      const valid =
        APPROVED_PHONES.some(
          function (phone) {

            return (
              code ===
              generateCode(phone)
            );

          }
        );


      if (valid) {

        localStorage.setItem(
          "cbc_code",
          code
        );

        message.style.display =
          "block";

        message.style.background =
          "#ECFDF5";

        message.style.color =
          "#15803D";

        message.textContent =
          "✅ CBC MASTER activated successfully!";


        setTimeout(
          function () {

            modal.remove();

          },
          1200
        );

      } else {

        message.style.display =
          "block";

        message.style.background =
          "#FEF2F2";

        message.style.color =
          "#DC2626";

        message.textContent =
          "❌ Invalid activation code.";

      }

    }
  );

}


document
  .getElementById("contactBtn")
  ?.addEventListener(
    "click",
    showActivation
  );


document
  .getElementById("premiumMenuBtn")
  ?.addEventListener(
    "click",
    showActivation
  );


/* ==================================================
   APK DOWNLOAD
================================================== */

document
  .getElementById("downloadBtn")
  ?.addEventListener(
    "click",
    function () {

      const apkUrl =
        this.getAttribute("href");

      if (
        !apkUrl ||
        apkUrl ===
        "YOUR-DIRECT-APK-URL.apk"
      ) {

        alert(
          "CBC MASTER APK download link has not been configured yet."
        );

      }

    }
  );


/* ==================================================
   PWA SERVICE WORKER
   IMPORTANT: FILE IS sw.js
================================================== */

if (
  "serviceWorker" in navigator
) {

  window.addEventListener(
    "load",
    function () {

      navigator.serviceWorker
        .register(
          "./sw.js"
        )
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
   PWA INSTALL
================================================== */

let deferredInstallPrompt =
  null;


window.addEventListener(
  "beforeinstallprompt",
  function (event) {

    event.preventDefault();

    deferredInstallPrompt =
      event;

    console.log(
      "CBC MASTER PWA is installable."
    );

  }
);


window.addEventListener(
  "appinstalled",
  function () {

    console.log(
      "CBC MASTER PWA installed."
    );

    deferredInstallPrompt =
      null;

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


if (isInstalledApp()) {

  console.log(
    "CBC MASTER is running as an installed app."
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
    "Local storage unavailable."
  );

}


/* ==================================================
   INITIAL DISPLAY
================================================== */

renderHistory();

renderLeaderboard();


console.log(
  "CBC MASTER loaded successfully."
);
