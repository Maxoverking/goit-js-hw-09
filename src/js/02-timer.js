import flatpickr from "flatpickr";
import 'flatpickr/dist/flatpickr.min.css';

import { Notify } from 'notiflix/build/notiflix-notify-aio';

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  
  onClose(selectedDates) {
    let selectDate = selectedDates[0].getTime();

    if (selectDate < Date.now()) {
      Notify.failure("Please choose a date in the future", { position: "center-top", fontSize : '20px', width: '400px'});
      return;
    } else {
      startBtn.disabled = false; 
      Notify.success('Success', { timeout: 1500, position: "center-top", fontSize : '25px'});
    }

    startBtn.addEventListener('click', () => {
      startBtn.disabled = true;

      let timer = setInterval(() => {
        const currentDate = Date.now(); 
        const selectDateAndCurrent = selectDate - currentDate;

        if (selectDateAndCurrent >= 0) {
          const convertToObject = convertMs(selectDateAndCurrent);
          const { days, hours, minutes, seconds } = convertToObject;

          daysText.textContent = days;
          hoursText.textContent = hours;
          minutesText.textContent = minutes;
          secondsText.textContent = seconds;
          if (selectDateAndCurrent <= 86400000) {
            timerContainer.style.color = 'red'; 
          }
        } else {
          clearInterval(timer);
          timerContainer.style.color = 'black';
        }   
      }, 1000);
    })
  },

};
const timerContainer = document.querySelector('.timer');

const startBtn = document.querySelector('[data-start]');
startBtn.disabled = true;

const daysText = document.querySelector('[data-days]');
const hoursText = document.querySelector('[data-hours]');
const minutesText = document.querySelector('[data-minutes]');
const secondsText = document.querySelector('[data-seconds]');

const inputId = document.getElementById('datetime-picker');
let fp = flatpickr(inputId , options);

function addLeadingZero(value) {
  return String(value).padStart(2, "0");
 }

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = addLeadingZero(Math.floor(ms / day));
  const hours = addLeadingZero(Math.floor((ms % day) / hour));
  const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
  const seconds = addLeadingZero(Math.floor((((ms % day) % hour) % minute) / second));
  return { days, hours, minutes, seconds };
}









