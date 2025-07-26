let startTime, intervalId, difference = 0;
let isRunning = false;
const display = document.getElementById('display');
const startStop = document.getElementById('startStop');
const reset = document.getElementById('reset');
const lap = document.getElementById('lap');
const lapsList = document.getElementById('laps');

startStop.addEventListener('click', () => {
  isRunning ? pauseTimer() : startTimer();
});

reset.addEventListener('click', resetTimer);
lap.addEventListener('click', recordLap);

function startTimer() {
  startTime = Date.now() - difference;
  intervalId = setInterval(updateDisplay, 10);
  isRunning = true;
  startStop.textContent = '⏸ Pause';
}

function pauseTimer() {
  clearInterval(intervalId);
  difference = Date.now() - startTime;
  isRunning = false;
  startStop.textContent = '▶ Resume';
}

function resetTimer() {
  clearInterval(intervalId);
  difference = 0;
  isRunning = false;
  display.textContent = '00:00:00.000';
  startStop.textContent = '▶ Start';
  lapsList.innerHTML = '';
}

function updateDisplay() {
  let now = Date.now();
  difference = now - startTime;

  let h = Math.floor(difference / 3600000);
  let m = Math.floor((difference % 3600000) / 60000);
  let s = Math.floor((difference % 60000) / 1000);
  let ms = difference % 1000;

  display.textContent = 
    `${pad(h)}:${pad(m)}:${pad(s)}.${padMs(ms)}`;
}

function pad(num) {
  return num.toString().padStart(2, '0');
}

function padMs(ms) {
  return ms.toString().padStart(3, '0');
}

function recordLap() {
  if (!isRunning) return;
  const li = document.createElement('li');
  li.innerHTML = `${display.textContent} <button onclick="this.parentElement.remove()">✖</button>`;
  lapsList.appendChild(li);
}

