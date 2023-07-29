import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import 'notiflix/dist/notiflix-3.2.6.min.css';

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
const inputDatetime = document.querySelector('input#datetime-picker');
const buttonStart = document.querySelector('button[data-start]');
buttonStart.disabled = true;
const timer = {
  days: document.querySelector('.timer [data-days]'),
  hours: document.querySelector('.timer [data-hours]'),
  minutes: document.querySelector('.timer [data-minutes]'),
  seconds: document.querySelector('.timer [data-seconds]'),
};

class CountDown {
  isActive = false;
  counterId = null;
  endDate;
  constructor(endDate = Date.now()) {
    this.setEndDate(endDate);
  }
  setEndDate(endDate) {
    this.endDate = endDate;
  }
  isDateInFuture() {
    return this.endDate > Date.now();
  }
  startCountDown(outputFunction, startFunction, endFunction) {
    if (this.isDateInFuture()) {
      this.counterId = setInterval(
        function () {
          const timeLeft = this.endDate - Date.now();
          if (timeLeft > 0) {
            outputFunction(timeLeft);
          } else {
            clearInterval(this.counterId);
            this.isActive = false;
            endFunction();
          }
        }.bind(this),
        1000
      );
      startFunction();
      this.isActive = true;
    }
  }
}

const countDown = new CountDown();

function updateClock(countDownMs) {
  const countDown = convertMs(countDownMs);
  for (let key in countDown) {
    if (countDown[key] !== Number(timer[key].textContent)) {
      timer[key].textContent = String(countDown[key]).padStart(2, '0');
    }
  }
}

function timeOnStart() {
  buttonStart.disabled = true;
  inputDatetime.disabled = true;
  Notify.success('Сountdown just started!!!');
}

function timeIsOver() {
  inputDatetime.disabled = false;
  Notify.success('TIME IS OVER!!!');
}
function evnStart(e) {
  if (countDown.isDateInFuture()) {
    countDown.startCountDown(updateClock, timeOnStart, timeIsOver);
  } else {
    buttonStart.disabled = true;
    Notify.failure('Please choose a date in future!');
  }
}
buttonStart.addEventListener('click', evnStart);

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    console.log(selectedDates[0]);
    countDown.setEndDate(selectedDates[0]);
    buttonStart.disabled = !countDown.isDateInFuture();
    if (!countDown.isDateInFuture()) {
      Notify.failure('Please choose a date in future!');
    }
  },
};

flatpickr(inputDatetime, options);
