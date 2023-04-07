// Описаний в документації
import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

const inputTimer = document.querySelector('input#datetime-picker');
const startTimer = document.querySelector('[data-start]');
const timer = document.querySelector('.timer');
const elDay = document.querySelector('[data-days]');
const elHours = document.querySelector('[data-hours]');
const elMin = document.querySelector('[data-minutes]');
const elSec = document.querySelector('[data-seconds]');

const currentDate = Date.now();
let selectDate = 0;
let activeBtn = false;
let colorInterval = null;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    startTimer.removeAttribute('disabled');
    selectDate = selectedDates[0].getTime();
    if (selectDate < currentDate) {
      startTimer.setAttribute('disabled', 'true');
      Notiflix.Notify.warning('Please choose a date in the future');
    }
  },
};
flatpickr(inputTimer, options);
startTimer.setAttribute('disabled', 'true');
startTimer.addEventListener('click', onStartTimer);

function onStartTimer() {
  startTimer.setAttribute('disabled', 'true');
  changeActiveColor();
  const intervalTimer = setInterval(() => {
    const currentTime = Date.now();
    const deltaTime = selectDate - currentTime;

    if (deltaTime < 900) {
      clearInterval(colorInterval);
      startTimer.setAttribute('disabled', 'true');
      clearInterval(intervalTimer);
    }
    const numbersTime = convertMs(deltaTime);
    elSec.textContent = numbersTime.seconds;
    elMin.textContent = numbersTime.minutes;
    elHours.textContent = numbersTime.hours;
    elDay.textContent = numbersTime.days;
  }, 1000);
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = addLeadingZero(Math.floor(ms / day));
  // Remaining hours
  const hours = addLeadingZero(Math.floor((ms % day) / hour));
  // Remaining minutes
  const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
  // Remaining seconds
  const seconds = addLeadingZero(
    Math.floor((((ms % day) % hour) % minute) / second)
  );

  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

function changeActiveColor() {
  if (activeBtn) {
    return;
  }
  activeBtn = true;
  colorInterval = setInterval(() => {
    timer.style.color = getRandomHexColor();
  }, 1000);
}

timer.style.cssText =
  'font-size: 30px; font-weight: bolder; display: flex; justify-content: space-around; margin-top: 100px;';
