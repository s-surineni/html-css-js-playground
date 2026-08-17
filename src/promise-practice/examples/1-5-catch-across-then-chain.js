import { FAIL_URL, resolveSoonWithPromise } from './needle-utils.js';

function fetchJoke() {
  return resolveSoonWithPromise();
}

function fetchPunchline(joke) {
  return resolveSoonWithPromise().then((nextJoke) => ({
    setup: joke.setup,
    punchline: nextJoke.punchline,
  }));
}

function summarizePair(pair) {
  return resolveSoonWithPromise().then((extra) => ({
    count: 2,
    preview: `${pair.setup} / ${pair.punchline}`,
    bonus: extra.setup,
  }));
}

// One trailing .catch() handles a rejection from any earlier step in the chain.
function loadSummary(shouldFail) {
  const firstStep = shouldFail
    ? resolveSoonWithPromise(FAIL_URL)
    : fetchJoke();

  return firstStep
    .then((joke) => {
      console.log('loaded joke:', joke.setup);
      return fetchPunchline(joke);
    })
    .then((pair) => {
      console.log('paired punchline:', pair.punchline);
      return summarizePair(pair);
    })
    .then((summary) => {
      console.log('summary:', summary);
      return summary;
    })
    .catch((error) => {
      console.log('caught anywhere in the chain:', error.message);
      return error.message;
    });
}

const summaryPromise = loadSummary(true);
