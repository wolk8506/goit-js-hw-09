const btnStart = document.querySelector('[data-start]');
const btnStop = document.querySelector('[data-stop]');
const body = document.querySelector('body');
let timerId = null;

btnStart.addEventListener('click', btnStartPress);
btnStop.addEventListener('click', btnStopPress);
btnStop.setAttribute('disabled', true);

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

function btnStartPress() {
  timerId = setInterval(() => {
    setColor();
  }, 1000);

  btnStart.setAttribute('disabled', true);
  btnStop.removeAttribute('disabled', true);
}

function setColor() {
  body.style.backgroundColor = getRandomHexColor();
}

function btnStopPress() {
  clearInterval(timerId);

  btnStop.setAttribute('disabled', true);
  btnStart.removeAttribute('disabled', true);
}
