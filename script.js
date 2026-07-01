let score = 0;
let progress = 0;
let highScore = 0;
let winGoal = 5;

const scoreDisplay = document.getElementById("score");
const highScoreDisplay = document.getElementById("high-score");
const progressBar = document.getElementById("progress-bar");
const messageDisplay = document.getElementById("message");
const player = document.getElementById("player-image");

/* Milestone Messages */

const milestones = [
    {
        score: 20,
        message: "🌟 Great start!"
    },
    {
        score: 40,
        message: "🚰 Halfway to clean water!"
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

    player.style.transform = "translateY(-10px)";

    setTimeout(() => {
        player.style.transform = "translateY(0)";
    }, 200);

    messageDisplay.textContent =
        "✅ Great job! You're moving toward clean water!";
    messageDisplay.style.color = "#159A48";

    milestones.forEach(milestone => {

        if (score === milestone.score) {

            messageDisplay.textContent =
                milestone.message;

            messageDisplay.style.color =
                "#FF902A";
        }
    });

    if (progress >= winGoal) {
        winGame();
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
        "♻️ Great job! You cleaned up pollution.";

    messageDisplay.style.color =
        "#159A48";
}

/* Reach Clean Water */

function reachGoal() {

    if (progress < winGoal) {

        messageDisplay.textContent =
            `Keep going! You need ${winGoal - progress} more steps.`;

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
