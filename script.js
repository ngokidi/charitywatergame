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

/* Difficulty Levels */

function updateDifficulty() {

    const difficulty =
        document.getElementById("difficulty").value;

    if (difficulty === "easy") {
        winGoal = 3;
    }

    else if (difficulty === "normal") {
        winGoal = 5;
    }

    else {
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
        "✅ Great job! You're getting closer to clean water.";
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

/* Remove Pollution */

function losePoints(button) {

    score = Math.max(0, score - 5);

    if (progress > 0) {
        progress--;
    }

    updateScore();

    progressBar.value = progress;

    player.style.transform = "rotate(-15deg)";

    setTimeout(() => {
        player.style.transform = "rotate(0deg)";
    }, 200);

    messageDisplay.textContent =
        "❌ Pollution slowed you down!";
    messageDisplay.style.color = "#F5402C";

    // Remove clicked obstacle
    button.remove();
}

/* Reach Goal */

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

    messageDisplay.style.color = "#2E9DF7";

    document.querySelectorAll(
        ".path, .obstacle, .goal"
    ).forEach(button => {

        button.disabled = true;
    });

    // Celebration effect
    document.body.style.backgroundColor =
        "#4FCB53";

    setTimeout(() => {

        document.body.style.backgroundColor =
            "#8BD1CB";

    }, 1500);
}

/* Reset Game */

function resetGame() {

    score = 0;
    progress = 0;

    updateScore();

    progressBar.value = 0;

    messageDisplay.textContent =
        "💧 Game restarted. Good luck!";
    messageDisplay.style.color =
        "#2E9DF7";

    document.querySelectorAll(
        ".path, .obstacle, .goal"
    ).forEach(button => {

        button.disabled = false;
    });

    player.style.transform = "none";

    // Recreate obstacles if they were removed

    const gameBoard =
        document.querySelector(".game-board");

    const oldObstacles =
        document.querySelectorAll(".obstacle");

    if (oldObstacles.length < 2) {

        oldObstacles.forEach(obstacle => {
            obstacle.remove();
        });

        const trashButton =
            document.createElement("button");

        trashButton.className =
            "obstacle";

        trashButton.innerHTML =
            "🗑️ Remove Trash";

        trashButton.onclick =
            function () {
                losePoints(this);
            };

        const pollutionButton =
            document.createElement("button");

        pollutionButton.className =
            "obstacle";

        pollutionButton.innerHTML =
            "☣️ Remove Pollution";

        pollutionButton.onclick =
            function () {
                losePoints(this);
            };

        const goalButton =
            document.querySelector(".goal");

        gameBoard.insertBefore(
            trashButton,
            goalButton
        );

        gameBoard.insertBefore(
            pollutionButton,
            goalButton
        );
    }
}

/* Initial Setup */

document
    .getElementById("difficulty")
    .addEventListener(
        "change",
        updateDifficulty
    );

updateDifficulty();
updateScore();