import needle from 'needle';

const JOKE_URL = 'https://official-joke-api.appspot.com/random_joke';

// Convert Needle's callback API into a Promise so both examples below can use
// the same real asynchronous HTTP operation.
function requestRandomJoke() {
  return new Promise((resolve, reject) => {
    needle.get(JOKE_URL, (error, response) => {
      if (error) {
        reject(error);
        return;
      }

      resolve(response);
    });
  });
}

// Version 1: consume the Promise with async/await.
async function loadRandomJokeWithAsyncAwait() {
  const response = await requestRandomJoke();
  return response.body;
}

// Version 2: do the same work with a Promise chain and no async/await.
function loadRandomJokeWithPromiseChain() {
  return requestRandomJoke().then((response) => response.body);
}

const asyncAwaitPromise = loadRandomJokeWithAsyncAwait();
const promiseChain = loadRandomJokeWithPromiseChain();

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
