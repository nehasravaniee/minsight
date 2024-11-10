let timerInterval;
let timeLeft;
let isPaused = true;

const startButton = document.getElementById('start-button');
const stopButton = document.getElementById('stop-button');
const restartButton = document.getElementById('restart-button');
const timerDisplay = document.getElementById('timer');
const message = document.getElementById('message');
const backgroundAudio = document.getElementById('background-audio');

function updateTimer() {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    timerDisplay.textContent = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
    timeLeft--;
    if (timeLeft < 0) {
        clearInterval(timerInterval);
        timerDisplay.textContent = '00:00';
        message.textContent = 'Have a peaceful day ahead!';
        backgroundAudio.pause();
        backgroundAudio.currentTime = 0;
        isPaused = true; // Set isPaused to true when the timer ends
    }
}

startButton.addEventListener('click', function() {
    if (isPaused) {
        const minutesInput = document.getElementById('minutes').value;
        timeLeft = parseInt(minutesInput) * 60;
        updateTimer();
        timerInterval = setInterval(updateTimer, 1000);
        backgroundAudio.play();
        isPaused = false;
    }
});

stopButton.addEventListener('click', function() {
    if (!isPaused) {
        clearInterval(timerInterval);
        backgroundAudio.pause();
        isPaused = true;
        message.textContent = 'Timer paused.';
    }
});

restartButton.addEventListener('click', function() {
    clearInterval(timerInterval); // Stop the current timer
    timerDisplay.textContent = '00:00'; // Reset timer display to 00:00
    timeLeft = undefined; // Clear the timeLeft so that Start button will reset it
    isPaused = true; // Pause the timer
    backgroundAudio.pause(); // Pause the background audio
    backgroundAudio.currentTime = 0; // Reset the audio to the beginning
    message.textContent = 'Timer reset. Click Start to begin again.';
});
