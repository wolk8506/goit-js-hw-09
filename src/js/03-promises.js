import Notiflix from 'notiflix';

const input = document.querySelector('form');
let inputData = {};

input.addEventListener('submit', inputDataPromise);

function inputDataPromise(e) {
  e.preventDefault();

  for (let i = 0; i < Number(input.amount.value); i += 1) {
    let delay = Number(input.delay.value) + Number(input.step.value) * i;
    let position = i + 1;
    inputData = { position, delay };
    createPromiseItem(inputData);
  }
}

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}

function createPromiseItem({ position, delay }) {
  createPromise(position, delay)
    .then(({ position, delay }) => {
      //console.log(`✅ Fulfilled promise ${position} in ${delay}ms`);
      Notiflix.Notify.success(`Fulfilled promise ${position} in ${delay}ms`);
    })
    .catch(({ position, delay }) => {
      //console.log(`❌ Rejected promise ${position} in ${delay}ms`);
      Notiflix.Notify.failure(`Rejected promise ${position} in ${delay}ms`);
    });
}
