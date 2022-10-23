// Описан в документации
import flatpickr from "flatpickr";
// Дополнительный импорт стилей
import "flatpickr/dist/flatpickr.min.css";

const timerContainer = document.querySelector('.timer');
timerContainer.style.display = "flex";
timerContainer.style.gap = "8px";

const fieldTextSpans = document.querySelectorAll('.field');

for (const fieldTextSpan of fieldTextSpans) {
   fieldTextSpan.style.display = "flex"; 
   fieldTextSpan.style.flexDirection = "column"; 
   fieldTextSpan.style.textAlign = "center"; 
}
const startBtn = document.querySelector('[data-start]');

const daysText = document.querySelector('[data-days]');
const hoursText = document.querySelector('[data-hours]');
const minutesText = document.querySelector('[data-minutes]');
const secondsText = document.querySelector('[data-seconds]');


const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    console.log(selectedDates[0]);

    let dateNum = selectedDates[0].getTime();


    startBtn.addEventListener('click', () => {
    
      setInterval(() => {
        const dataclick = Date.now();
      // console.log("🚀 ~ dataclick", dataclick);
      const dateChooseAndCurrent = dateNum - dataclick;

      const convertToObject = convertMs(dateChooseAndCurrent);
      // console.log("🚀 ~ convertToObject", convertToObject);
       
      const { days, hours, minutes, seconds } = convertToObject;
      daysText.textContent = days;
      hoursText.textContent = hours;
      minutesText.textContent = minutes;
      secondsText.textContent = seconds;
      }, 1000);
    })
  },

};
flatpickr("#datetime-picker", options);

function addLeadingZero(value) {
  return String(value).padStart(2, "0");
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
  const seconds = addLeadingZero(Math.floor((((ms % day) % hour) % minute) / second));
  
  return { days, hours, minutes, seconds };
}









