import { resolveSoon } from './needle-utils.js';

function fetchJoke(callback) {
  resolveSoon(callback);
}

function describeJoke(joke, callback) {
  resolveSoon((error, secondJoke) => {
    if (error) {
      callback(error);
      return;
    }
    callback(null, {
      first: `${joke.setup} — ${joke.punchline}`,
      second: `${secondJoke.setup} — ${secondJoke.punchline}`,
    });
  });
}

fetchJoke((jokeError, joke) => {
  if (jokeError) {
    console.error('unable to load joke:', jokeError.message);
    return;
  }

  console.log('loaded joke:', joke.setup);
  describeJoke(joke, (pairError, pair) => {
    if (pairError) {
      console.error('unable to chain jokes:', pairError.message);
      return;
    }

    console.log('chained jokes ready:', pair);
  });
});
