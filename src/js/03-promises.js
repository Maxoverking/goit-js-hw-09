import { Notify } from 'notiflix/build/notiflix-notify-aio';

const form = document.querySelector('.form');

form.addEventListener('submit', (evt) => {
  evt.preventDefault();
  
  const { delay, step, amount } = evt.currentTarget.elements;
  
  const delayValue = Number(delay.value);
  const stepValue = Number(step.value);
  const amountValue = Number(amount.value);

let innerAmound = 0;

let intervalId = setInterval(()=>{
 innerAmound += 1;
 if(innerAmound === amountValue){
   clearInterval(intervalId);
 }
  createPromise(amountValue, delayValue);
}, stepValue);

})




function createPromise(position, delay) {
  //  console.log(position, delay);
  const shouldResolve = Math.random() > 0.3;
  const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldResolve) {
      resolve(`✅ Fulfilled promise ${position} in ${delay}ms`)
      } else {
      reject(`❌ Rejected promise ${position} in ${delay}ms`)
      }
      
    }, delay);
  })

  promise
    .then( result => Notify.success(result))
    .catch(result  => Notify.failure(result))
 
  }

