import Notiflix from 'notiflix';

const input = document.querySelector('.form');

input.addEventListener('submit', onInput);

function onInput(e) {
  e.preventDefault();
  let delayEl = parseInt(e.currentTarget.elements.delay.value);
  const stepEl = parseInt(e.currentTarget.elements.step.value);
  const amountEl = parseInt(e.currentTarget.elements.amount.value);
  let position = 0;
  let numberValue = Number(delayEl);
  let intervalId = setInterval(() => {
    position += 1;
    createPromise(position, numberValue)
      .then(({ position, delay }) => {
        Notiflix.Notify.success(
          `✅ Fulfilled promise ${position} in ${delay}ms`)
      })
      .catch(({ position, delay }) => {
        Notiflix.Notify.failure(
          `❌ Rejected promise ${position} in ${delay}ms`);
      });
    numberValue += Number(stepEl);
    if (position === Number(amountEl)) {
      clearInterval(intervalId);
    }
  }, stepEl);
}

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}
