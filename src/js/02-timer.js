import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

import Notiflix from 'notiflix';

const input = document.querySelector('#datetime-picker');
const btnStart = document.querySelector('[data-start]');
const day = document.querySelector('[data-days]');
const hour = document.querySelector('[data-hours]');
const minute = document.querySelector('[data-minutes]');
const second = document.querySelector('[data-seconds]');

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (new Date() - selectedDates[0] > 0) {
      btnStart.setAttribute('disabled', true);
      Notiflix.Notify.warning('Please choose a date in the future');
      //alert('Please choose a date in the future');
    } else {
      btnStart.removeAttribute('disabled', true);
      selectedDate = selectedDates[0];
    }
  },
};

let selectedDate = null;
let timerId = null;

flatpickr(input, options);

btnStart.setAttribute('disabled', true);
btnStart.addEventListener('click', startTimer);

function startTimer() {
  timerId = setInterval(() => {
    timerСheck();
  }, 1000);
  btnStart.setAttribute('disabled', true);
  Notiflix.Notify.success('Start timer');
}

function stopTimer() {
  Notiflix.Notify.info('Time is over', {
    timeout: 6000,
  });
  btnStart.removeAttribute('disabled', true);
  clearInterval(timerId);
}

function timerСheck() {
  if (selectedDate <= new Date()) {
    stopTimer();
    return;
  }
  updateTimerInterfece(convertMs(selectedDate - new Date()));
}

function pad(value) {
  return String(value).padStart(2, '0');
}

function updateTimerInterfece({ days, hours, minutes, seconds }) {
  day.textContent = `${pad(days)}`;
  hour.textContent = `${pad(hours)}`;
  minute.textContent = `${pad(minutes)}`;
  second.textContent = `${pad(seconds)}`;
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}
