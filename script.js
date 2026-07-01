let score = 0;
let progress = 0;
let highScore = 0;
let winGoal = 5;

const scoreDisplay = document.getElementById("score");
const highScoreDisplay = document.getElementById("high-score");
const progressBar = document.getElementById("progress-bar");
const messageDisplay = document.getElementById("message");
const player = document.getElementById("player-image");

/* Milestones */

const milestones = [
    {
        score: 20,
        message: "🌟 Great start!"
    },
    {
        score: 40,
        message: "🚰 Halfway there!"
    },
    {
        score: 60,
        message: "🎉 You're making a difference!"
    }
];

/* Update Score */

function updateScore() {
    scoreDisplay.textContent = score;

    if (score > highScore) {
        highScore = score;
        highScoreDisplay.textContent = highScore;
    }
}

/* Difficulty */

function updateDifficulty() {
    const difficulty =
        document.getElementById("difficulty").value;

    if (difficulty === "easy") {
        winGoal = 3;
    } else if (difficulty === "normal") {
        winGoal = 5;
    } else {
        winGoal = 8;
    }

    progressBar.max = winGoal;

    resetGame();
}

/* Move Forward */

function gainPoints() {

    score += 10;
    progress++;

    updateScore();

    progressBar.value = progress;

    player.style.transform =
        "translateY(-10px)";

    setTimeout(() => {
        player.style.transform =
            "translateY(0)";
    }, 200);

    messageDisplay.textContent =
        "✅ You're moving closer to clean water!";

    messageDisplay.style.color =
        "#159A48";

    milestones.forEach((milestone) => {

        if (score === milestone.score) {

            messageDisplay.textContent =
                milestone.message;

            messageDisplay.style.color =
                "#FF902A";
        }
    });

    if (progress >= winGoal) {
        messageDisplay.textContent =
            "💧 Great job! Now reach the clean water!";
    }
}

/* Clean Trash */

function cleanTrash(trashItem) {

    score += 5;

    updateScore();

    trashItem.remove();

    const trashLeft =
        document.querySelectorAll(".trash").length;

    document.getElementById("trash-count")
        .textContent = trashLeft;

    messageDisplay.textContent =
        "♻️ Awesome! You removed pollution.";

    messageDisplay.style.color =
        "#159A48";
}

/* Reach Goal */

function reachGoal() {

    const trashLeft =
        document.querySelectorAll(".trash").length;

    if (trashLeft > 0) {

        messageDisplay.textContent =
            "🗑️ Clean up all pollution before reaching clean water!";

        messageDisplay.style.color =
            "#F5402C";

        return;
    }

    if (progress < winGoal) {

        messageDisplay.textContent =
            `Keep going! ${winGoal - progress} more steps needed.`;

        messageDisplay.style.color =
            "#F5402C";

        return;
    }

    winGame();
}

/* Win Game */

function winGame() {

    messageDisplay.textContent =
        `🎉 Congratulations! You reached clean water with ${score} points!`;

    messageDisplay.style.color =
        "#2E9DF7";

    document.querySelectorAll(
        ".path, .goal"
    ).forEach((button) => {

        button.disabled = true;
    });

    document.body.style.backgroundColor =
        "#4FCB53";

    setTimeout(() => {

        document.body.style.backgroundColor =
            "#8BD1CB";

    }, 1500);
}

/* Reset */

function resetGame() {

    score = 0;
    progress = 0;

    updateScore();

    progressBar.value = 0;

    document.body.style.backgroundColor =
        "#8BD1CB";

    messageDisplay.textContent =
        "💧 Game restarted. Clean the pollution and reach clean water!";

    messageDisplay.style.color =
        "#2E9DF7";

    document.querySelectorAll(
        ".path, .goal"
    ).forEach((button) => {

        button.disabled = false;
    });

    const trashPath =
        document.querySelector(".trash-path");

    if (trashPath) {

        trashPath.innerHTML = `
            <div class="trash" onclick="cleanTrash(this)">🥤</div>
            <div class="trash" onclick="cleanTrash(this)">🗑️</div>
            <div class="trash" onclick="cleanTrash(this)">🧴</div>
            <div class="trash" onclick="cleanTrash(this)">☣️</div>
        `;
    }

    document.getElementById("trash-count")
        .textContent = "4";
}

/* Initialize */

document
    .getElementById("difficulty")
    .addEventListener(
        "change",
        updateDifficulty
    );

updateDifficulty();
updateScore();