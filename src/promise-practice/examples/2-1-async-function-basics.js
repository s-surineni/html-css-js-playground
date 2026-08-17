import { resolveSoonWithPromise } from './needle-utils.js';

// Version 1: consume the Promise with async/await.
async function loadRandomJokeWithAsyncAwait() {
  const joke = await resolveSoonWithPromise();
  return joke;
}

// Version 2: do the same work with a Promise chain and no async/await.
function loadRandomJokeWithPromiseChain() {
  return resolveSoonWithPromise();
}

const asyncAwaitPromise = loadRandomJokeWithAsyncAwait();
const promiseChain = loadRandomJokeWithPromiseChain();
const greetingPromise = asyncAwaitPromise;

console.log(
  'async function returned a Promise:',
  asyncAwaitPromise instanceof Promise,
);
console.log(
  'regular function returned a Promise:',
  promiseChain instanceof Promise,
);
console.log('synchronous code continues while Needle loads both jokes');

asyncAwaitPromise
  .then((joke) => {
    console.log('async/await joke:', joke.setup, joke.punchline);
  })
  .catch((error) => {
    console.error('async/await request failed:', error.message);
  });

promiseChain
  .then((joke) => {
    console.log('Promise-chain joke:', joke.setup, joke.punchline);
  })
  .catch((error) => {
    console.error('Promise-chain request failed:', error.message);
  });
