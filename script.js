/* ============================================================
   CBC MASTER — Main Application Script
   ThinkPlus
   ============================================================ */

"use strict";

/* ============================================================
   PWA INSTALL
   ============================================================ */

let deferredPrompt = null;

window.addEventListener("beforeinstallprompt", (event) => {
    event.preventDefault();
    deferredPrompt = event;
});

async function installApp() {
    if (!deferredPrompt) {
        alert(
            "CBC MASTER is already installed, or your browser does not currently support installation."
        );
        return;
    }

    deferredPrompt.prompt();

    const result = await deferredPrompt.userChoice;

    if (result.outcome === "accepted") {
        console.log("CBC MASTER installation accepted.");
    } else {
        console.log("CBC MASTER installation dismissed.");
    }

    deferredPrompt = null;
}

window.addEventListener("appinstalled", () => {
    console.log("CBC MASTER installed successfully.");
});

/* ============================================================
   SIDEBAR
   ============================================================ */

const menuButton = document.getElementById("menuButton");
const sidebar = document.getElementById("sidebar");
const overlay = document.getElementById("overlay");

function openSidebar() {
    if (!sidebar) return;

    sidebar.classList.add("open");

    if (overlay) {
        overlay.classList.add("show");
    }
}

function closeSidebar() {
    if (!sidebar) return;

    sidebar.classList.remove("open");

    if (overlay) {
        overlay.classList.remove("show");
    }
}

if (menuButton) {
    menuButton.addEventListener("click", () => {
        if (sidebar && sidebar.classList.contains("open")) {
            closeSidebar();
        } else {
            openSidebar();
        }
    });
}

if (overlay) {
    overlay.addEventListener("click", closeSidebar);
}

/* ============================================================
   SIDEBAR LINKS
   ============================================================ */

document.querySelectorAll(".sidebar-link").forEach((link) => {
    link.addEventListener("click", () => {
        if (window.innerWidth <= 768) {
            closeSidebar();
        }
    });
});

/* ============================================================
   QUIZ DATA
   ============================================================ */

let quizQuestions = [];

async function loadQuestions() {
    try {
        const response = await fetch("./questions.json", {
            cache: "no-cache"
        });

        if (!response.ok) {
            throw new Error("Unable to load questions.json");
        }

        quizQuestions = await response.json();

        console.log(
            `CBC MASTER loaded ${quizQuestions.length} questions.`
        );
    } catch (error) {
        console.error("Question loading error:", error);
        quizQuestions = [];
    }
}

/* ============================================================
   QUIZ STATE
   ============================================================ */

let currentQuiz = [];
let currentQuestionIndex = 0;
let score = 0;

/* ============================================================
   LOCAL STORAGE
   ============================================================ */

const HISTORY_KEY = "cbc_master_quiz_history";
const LEADERBOARD_KEY = "cbc_master_leaderboard";
const PREMIUM_KEY = "cbc_master_premium";

function getHistory() {
    try {
        return JSON.parse(
            localStorage.getItem(HISTORY_KEY) || "[]"
        );
    } catch {
        return [];
    }
}

function saveHistory(history) {
    localStorage.setItem(
        HISTORY_KEY,
        JSON.stringify(history)
    );
}

function getLeaderboard() {
    try {
        return JSON.parse(
            localStorage.getItem(LEADERBOARD_KEY) || "[]"
        );
    } catch {
        return [];
    }
}

function saveLeaderboard(leaderboard) {
    localStorage.setItem(
        LEADERBOARD_KEY,
        JSON.stringify(leaderboard)
    );
}

/* ============================================================
   QUIZ START
   ============================================================ */

function startQuiz(subject = null) {
    if (!quizQuestions.length) {
        alert(
            "Quiz questions are still loading. Please try again."
        );
        return;
    }

    let questions = [...quizQuestions];

    if (subject) {
        questions = questions.filter(
            (question) =>
                String(question.subject || "").toLowerCase() ===
                String(subject).toLowerCase()
        );
    }

    if (!questions.length) {
        alert("No questions are available for this subject.");
        return;
    }

    questions.sort(() => Math.random() - 0.5);

    currentQuiz = questions.slice(0, 10);
    currentQuestionIndex = 0;
    score = 0;

    showQuestion();
}

/* ============================================================
   SHOW QUESTION
   ============================================================ */

function showQuestion() {
    if (!currentQuiz.length) return;

    const question = currentQuiz[currentQuestionIndex];

    const questionElement =
        document.getElementById("question");

    const optionsElement =
        document.getElementById("options");

    const progressElement =
        document.getElementById("quizProgress");

    if (!questionElement || !optionsElement) {
        console.warn(
            "Quiz elements were not found in index.html."
        );
        return;
    }

    questionElement.textContent =
        question.question || question.text || "";

    optionsElement.innerHTML = "";

    const options =
        question.options ||
        question.choices ||
        [];

    options.forEach((option, index) => {
        const button = document.createElement("button");

        button.type = "button";
        button.className = "quiz-option";
        button.textContent = option;

        button.addEventListener("click", () => {
            answerQuestion(index);
        });

        optionsElement.appendChild(button);
    });

    if (progressElement) {
        progressElement.textContent =
            `Question ${currentQuestionIndex + 1} of ${currentQuiz.length}`;
    }
}

/* ============================================================
   ANSWER QUESTION
   ============================================================ */

function answerQuestion(selectedIndex) {
    const question = currentQuiz[currentQuestionIndex];

    const correctAnswer =
        question.answer ??
        question.correctAnswer ??
        question.correct;

    let correctIndex = correctAnswer;

    if (typeof correctAnswer === "string") {
        const options =
            question.options ||
            question.choices ||
            [];

        correctIndex = options.findIndex(
            (option) =>
                String(option).toLowerCase() ===
                correctAnswer.toLowerCase()
        );
    }

    if (Number(selectedIndex) === Number(correctIndex)) {
        score++;
    }

    currentQuestionIndex++;

    if (currentQuestionIndex >= currentQuiz.length) {
        finishQuiz();
    } else {
        showQuestion();
    }
}

/* ============================================================
   FINISH QUIZ
   ============================================================ */

function finishQuiz() {
    const total = currentQuiz.length;

    const result = {
        date: new Date().toISOString(),
        score,
        total,
        percentage: total
            ? Math.round((score / total) * 100)
            : 0
    };

    const history = getHistory();

    history.unshift(result);

    saveHistory(history.slice(0, 100));

    const leaderboard = getLeaderboard();

    leaderboard.push(result);

    leaderboard.sort(
        (a, b) => b.percentage - a.percentage
    );

    saveLeaderboard(
        leaderboard.slice(0, 50)
    );

    alert(
        `Quiz complete!\n\nScore: ${score}/${total}\nPercentage: ${result.percentage}%`
    );

    updateProgressDisplay();
}

/* ============================================================
   PROGRESS HISTORY
   ============================================================ */

function updateProgressDisplay() {
    const history = getHistory();

    const element =
        document.getElementById("progressHistory");

    if (!element) return;

    if (!history.length) {
        element.innerHTML =
            "<p>No quiz history yet.</p>";
        return;
    }

    element.innerHTML = history
        .slice(0, 10)
        .map((item) => {
            const date = new Date(item.date);

            return `
                <div class="history-item">
                    <strong>${item.score}/${item.total}</strong>
                    <span>${item.percentage}%</span>
                    <small>${date.toLocaleDateString()}</small>
                </div>
            `;
        })
        .join("");
}

/* ============================================================
   LEADERBOARD
   ============================================================ */

function updateLeaderboard() {
    const leaderboard = getLeaderboard();

    const element =
        document.getElementById("leaderboard");

    if (!element) return;

    if (!leaderboard.length) {
        element.innerHTML =
            "<p>No leaderboard results yet.</p>";
        return;
    }

    element.innerHTML = leaderboard
        .slice(0, 10)
        .map(
            (item, index) => `
                <div class="leaderboard-item">
                    <strong>#${index + 1}</strong>
                    <span>${item.score}/${item.total}</span>
                    <span>${item.percentage}%</span>
                </div>
            `
        )
        .join("");
}

/* ============================================================
   NOTES
   ============================================================ */

function openNotes() {
    alert(
        "CBC Notes\n\nSelect a subject to revise your CBC learning areas."
    );
}

/* ============================================================
   CBC PROJECTS
   ============================================================ */

function openProjects() {
    alert(
        "CBC Projects\n\nProject-based learning resources will appear here."
    );
}

/* ============================================================
   CONTACT SUPPORT
   ============================================================ */

function contactSupport() {
    window.open(
        "https://wa.me/254707649890",
        "_blank"
    );
}

/* ============================================================
   RATE APP
   ============================================================ */

function rateApp() {
    alert(
        "Thank you for supporting CBC MASTER!\n\nPlease rate the app when the store/review page is available."
    );
}

/* ============================================================
   SHARE APP
   ============================================================ */

async function shareApp() {
    const shareData = {
        title: "CBC MASTER",
        text:
            "CBC MASTER — Learn, revise and track your CBC progress.",
        url: window.location.href
    };

    try {
        if (navigator.share) {
            await navigator.share(shareData);
        } else {
            await navigator.clipboard.writeText(
                window.location.href
            );

            alert(
                "CBC MASTER link copied to your clipboard."
            );
        }
    } catch (error) {
        console.log("Share cancelled:", error);
    }
}

/* ============================================================
   PREMIUM
   ============================================================ */

const SECRET = "K9";

const APPROVED_PHONES = [
    "254707649890",
    "254782609857"
];

function normalizePhone(phone) {
    return String(phone || "")
        .replace(/\D/g, "")
        .replace(/^0/, "254");
}

function activatePremium() {
    const phone = prompt(
        "Enter the phone number used for premium activation:"
    );

    if (!phone) return;

    const normalizedPhone =
        normalizePhone(phone);

    if (!APPROVED_PHONES.includes(normalizedPhone)) {
        alert(
            "This phone number is not approved for CBC MASTER Premium."
        );
        return;
    }

    const code = prompt(
        "Enter your Premium activation code:"
    );

    if (!code) return;

    if (String(code).trim() !== SECRET) {
        alert("Invalid Premium activation code.");
        return;
    }

    localStorage.setItem(
        PREMIUM_KEY,
        JSON.stringify({
            active: true,
            phone: normalizedPhone,
            activatedAt: new Date().toISOString()
        })
    );

    alert(
        "CBC MASTER Premium activated successfully!"
    );
}

function isPremiumActive() {
    try {
        const premium = JSON.parse(
            localStorage.getItem(PREMIUM_KEY) || "null"
        );

        return premium?.active === true;
    } catch {
        return false;
    }
}

/* ============================================================
   PAYMENT INFORMATION
   ============================================================ */

function showPremiumPayment() {
    alert(
        "CBC MASTER Premium\n\n" +
        "Send payment to M-Pesa:\n" +
        "0707649890\n\n" +
        "After payment, contact support on WhatsApp for activation."
    );
}

/* ============================================================
   NAVIGATION HELPERS
   ============================================================ */

function scrollToSection(id) {
    const element = document.getElementById(id);

    if (!element) {
        return;
    }

    element.scrollIntoView({
        behavior: "smooth",
        block: "start"
    });

    if (window.innerWidth <= 768) {
        closeSidebar();
    }
}

/* ============================================================
   GLOBAL BUTTON HANDLING
   ============================================================ */

document.addEventListener("click", (event) => {
    const target = event.target.closest(
        "[data-action]"
    );

    if (!target) return;

    const action = target.dataset.action;

    switch (action) {
        case "install":
            installApp();
            break;

        case "quiz":
            startQuiz();
            break;

        case "notes":
            openNotes();
            break;

        case "projects":
            openProjects();
            break;

        case "progress":
            updateProgressDisplay();
            break;

        case "leaderboard":
            updateLeaderboard();
            break;

        case "support":
            contactSupport();
            break;

        case "rate":
            rateApp();
            break;

        case "share":
            shareApp();
            break;

        case "premium":
            activatePremium();
            break;

        case "payment":
            showPremiumPayment();
            break;

        default:
            console.log(
                `Unknown CBC MASTER action: ${action}`
            );
    }
});

/* ============================================================
   SERVICE WORKER
   ============================================================ */

if ("serviceWorker" in navigator) {
    window.addEventListener("load", () => {
        navigator.serviceWorker
            .register("./sw.js", {
                updateViaCache: "none"
            })
            .then((registration) => {
                console.log(
                    "CBC MASTER service worker registered:",
                    registration.scope
                );

                registration.update();
            })
            .catch((error) => {
                console.error(
                    "Service worker registration failed:",
                    error
                );
            });
    });
}

/* ============================================================
   INITIALIZATION
   ============================================================ */

document.addEventListener("DOMContentLoaded", async () => {
    await loadQuestions();

    updateProgressDisplay();
    updateLeaderboard();

    console.log("CBC MASTER initialized.");
});
