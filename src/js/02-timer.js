import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import Notiflix from 'notiflix';

const input = document.querySelector("input#datetime-picker");

const refs = {
  startBtn: document.querySelector("[data-start]"),
  daysValue: document.querySelector("[data-days]"),
  hoursValue: document.querySelector("[data-hours]"),
  minutesValue: document.querySelector("[data-minutes]"),
  secondsValue: document.querySelector("[data-seconds]"),
}

const countDown = flatpickr(input, {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    console.log(selectedDates[0]);
    selectedDate = selectedDates[0];
  }}
);

let selectedDate = null;
let timerId;

function addLeadingZero(val) {
  return String(val).padStart(2, '0');
}

function convertMs(ms) {
  timerId = setInterval(() => {
    const difference = Date.parse(selectedDate) - Date.parse(new Date());

    if(difference <= 0) {
      clearInterval(timerId);
    }

    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;

    let days, hours, minutes, seconds;

    if(difference > 0) {
      days = addLeadingZero(Math.floor(difference / day));
      hours = addLeadingZero(Math.floor((difference % day) / hour));
      minutes = addLeadingZero(Math.floor(((difference % day) % hour) / minute));
      seconds = addLeadingZero(Math.floor((((difference % day) % hour) % minute) / second));
    } else {
      days = hours = minutes = seconds = '00';
    }

    refs.daysValue.textContent = days;
    refs.hoursValue.textContent = hours;
    refs.minutesValue.textContent = minutes;
    refs.secondsValue.innerHTML = seconds;

    return {
      difference,
      days,
      hours,
      minutes,
      seconds };
  }, 1000);
}

function countdown() {
  const newDate = new Date().getTime();
  const difference = selectedDate.getTime() - newDate;
  if(difference <= 0) {
    Notiflix.Notify.failure("Please choose a date in the future");
    refs.startBtn.disabled = true;
    clearInterval(timerId);
  }
  refs.startBtn.disabled = false;

  convertMs(difference);

}

refs.startBtn.addEventListener('click', countdown);
