import { resolveSoonWithPromise } from './needle-utils.js';

function fetchJoke() {
  return resolveSoonWithPromise();
}

function describeJoke(joke) {
  return resolveSoonWithPromise().then((secondJoke) => ({
    first: `${joke.setup} — ${joke.punchline}`,
    second: `${secondJoke.setup} — ${secondJoke.punchline}`,
  }));
}

const userOrdersPromise = fetchJoke()
  .then((joke) => {
    console.log('loaded joke:', joke.setup);
    return describeJoke(joke);
  })
  .then((pair) => {
    console.log('chained jokes ready');
    return pair;
  });
