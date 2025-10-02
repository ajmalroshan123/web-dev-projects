// script.js

let timerElement = document.getElementById("timer");
let workInput = document.getElementById("work-duration");
let breakInput = document.getElementById("break-duration");
let startButton = document.getElementById("start-button");
let resetButton = document.getElementById("reset-button");

let countdown; // setInterval reference
let isRunning = false;
let isWorkTime = true;
let remainingTime = 0;

// Format time as MM:SS
function formatTime(seconds) {
    let mins = Math.floor(seconds / 60);
    let secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs
        .toString()
        .padStart(2, "0")}`;
}

// Start / Pause Timer
function startTimer() {
    if (!isRunning) {
        // First time or after reset
        if (remainingTime === 0) {
            let duration = isWorkTime
                ? parseInt(workInput.value) * 60
                : parseInt(breakInput.value) * 60;
            remainingTime = duration;
        }

        countdown = setInterval(() => {
            remainingTime--;
            timerElement.textContent = formatTime(remainingTime);

            if (remainingTime <= 0) {
                clearInterval(countdown);
                isRunning = false;
                isWorkTime = !isWorkTime; // switch mode
                remainingTime = 0;

                // Auto switch to break/work
                if (isWorkTime) {
                    alert("Break is over! Time to Work 💪");
                } else {
                    alert("Work session completed! Take a Break ☕");
                }
                startTimer(); // auto start next session
            }
        }, 1000);

        startButton.textContent = "Pause";
        isRunning = true;
    } else {
        // Pause
        clearInterval(countdown);
        startButton.textContent = "Resume";
        isRunning = false;
    }
}

// Reset Timer
function resetTimer() {
    clearInterval(countdown);
    isRunning = false;
    isWorkTime = true;
    remainingTime = 0;
    timerElement.textContent = formatTime(parseInt(workInput.value) * 60);
    startButton.textContent = "Start";
}

// Event Listeners
startButton.addEventListener("click", startTimer);
resetButton.addEventListener("click", resetTimer);

// On page load, show default work time
timerElement.textContent = formatTime(parseInt(workInput.value) * 60);
