let startTime;
let elapsedTime = 0;
let timerInterval;

const display = document.querySelector('.display');
const startButton = document.getElementById('startButton');
const pauseButton = document.getElementById('pauseButton');
const resetButton = document.getElementById('resetButton');
const lapButton = document.getElementById('lapButton');
const lapsList = document.getElementById('laps');

function formatTime(time) {
    const hours = Math.floor(time / 3600000);
    const minutes = Math.floor((time % 3600000) / 60000);
    const seconds = Math.floor((time % 60000) / 1000);
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}

function startTimer() {
    startTime = Date.now() - elapsedTime;
    timerInterval = setInterval(function printTime() {
        elapsedTime = Date.now() - startTime;
        display.textContent = formatTime(elapsedTime);
    }, 1000);
    startButton.disabled = true;
    pauseButton.disabled = false;
}

function pauseTimer() {
    clearInterval(timerInterval);
    startButton.disabled = false;
    pauseButton.disabled = true;
}

function resetTimer() {
    clearInterval(timerInterval);
    startButton.disabled = false;
    pauseButton.disabled = true;
    elapsedTime = 0;
    display.textContent = formatTime(elapsedTime);
    lapsList.innerHTML = '';
}

function lapTimer() {
    const lapTime = elapsedTime;
    const lapItem = document.createElement('li');
    lapItem.textContent = `Lap ${lapsList.childElementCount + 1}: ${formatTime(lapTime)}`;
    lapsList.appendChild(lapItem);
}

startButton.addEventListener('click', startTimer);
pauseButton.addEventListener('click', pauseTimer);
resetButton.addEventListener('click', resetTimer);
lapButton.addEventListener('click', lapTimer);
