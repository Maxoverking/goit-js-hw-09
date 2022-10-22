const startButton = document.querySelector('[data-start]');
const stopButton = document.querySelector('[data-stop]');

let timerId = null;

startButton.addEventListener('click', startInterval);
stopButton.addEventListener('click', stopInterval);

function startInterval() {
    timerId = setInterval(() => {
        console.log('startInterval');
        document.body.style.backgroundColor = getRandomHexColor(); 
        startButton.setAttribute('disabled', true);
        stopButton.addEventListener('click', stopInterval);
    }, 1000);
}

function stopInterval() {
    console.log('clearInterval');
    clearInterval(timerId);
    document.body.style.backgroundColor = '';
    startButton.removeAttribute('disabled');
    stopButton.removeEventListener('click', stopInterval);
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}
