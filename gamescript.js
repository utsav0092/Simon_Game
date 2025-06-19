// Step : 1
let gameSeq = [];
let userSeq = [];

let startGame = false;
let level = 0;
let maxScore = 0;

let buttons = ["red", "yellow", "green", "purple"];

let h3 = document.querySelector("h3");
let body = document.querySelector("body");
let startBtn = document.getElementById("startBtn");
let resetBtn = document.getElementById("resetBtn");

// --- KEYPRESS START (commented out to avoid duplicate triggers) ---
// document.addEventListener("keypress", function () {
//     if (startGame === false) {
//         startGame = true;
//         level = 0;
//         gameSeq = [];
//         userSeq = [];
//         levelUp();
//         startBtn.disabled = true;
//         resetBtn.disabled = false;
//     }
// });
// --- KEYPRESS END ---

// START button
startBtn.addEventListener("click", function () {
    if (!startGame) {
        startGame = true;
        level = 0;
        gameSeq = [];
        userSeq = [];
        levelUp();
        startBtn.disabled = true;
        resetBtn.disabled = false;
    }
});

// RESET button
resetBtn.addEventListener("click", function () {
    reSetGame(true); // User-triggered reset
});

// Step : 2
function gameFlash(btn) {
    btn.classList.add("flash");
    setTimeout(() => {
        btn.classList.remove("flash");
    }, 300);
}

function levelUp() {
    level++;
    h3.innerText = `Level ${level}`;
    userSeq = [];

    let rindex = Math.floor(Math.random() * 4);
    let rcolor = buttons[rindex];
    let rbtn = document.querySelector(`.${rcolor}`);
    gameSeq.push(rcolor);
    console.log("Game Sequence:", gameSeq);
    gameFlash(rbtn);
}

// Step : 3
function checkAns(idx) {
    if (userSeq[idx] === gameSeq[idx]) {
        if (userSeq.length === gameSeq.length) {
            body.classList.add("green");
            setTimeout(function () {
                body.classList.remove("green");
            }, 150);
            setTimeout(levelUp, 1000);
        }
    } else {
        reSetGame(false);
    }
}

function btnPress() {
    if (startGame === true) {
        let btn = this;
        userFlash(btn);
        let userColor = btn.getAttribute("id");
        userSeq.push(userColor);
        checkAns(userSeq.length - 1);
    }
}

function userFlash(btn) {
    btn.classList.add("userFlash");
    setTimeout(() => {
        btn.classList.remove("userFlash");
    }, 300);
}

let allbtns = document.querySelectorAll(".btn");
for (const btn of allbtns) {
    btn.addEventListener("click", btnPress);
}

function reSetGame(isResetByUser = false) {
    if (!isResetByUser && level > maxScore) {
        maxScore = level;
    }

    h3.innerHTML = isResetByUser
        ? `Game Reset! Press Start to begin again.`
        : `Game Over! Press Start to try again.<br><br>Your Score: <b>${level}</b><br>Max Score: <b>${maxScore}</b>`;

    body.classList.add("red");
    setTimeout(() => {
        body.classList.remove("red");
    }, 150);

    startGame = false;
    level = 0;
    gameSeq = [];
    userSeq = [];
    startBtn.disabled = false;
    resetBtn.disabled = true;
}