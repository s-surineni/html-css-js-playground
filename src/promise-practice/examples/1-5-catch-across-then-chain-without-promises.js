import { FAIL_URL, resolveSoon } from './needle-utils.js';

function fetchJoke(callback) {
  resolveSoon(callback);
}

function fetchPunchline(joke, callback) {
  resolveSoon((error, nextJoke) => {
    if (error) {
      callback(error);
      return;
    }
    callback(null, {
      setup: joke.setup,
      punchline: nextJoke.punchline,
    });
  });
}

function summarizePair(pair, callback) {
  resolveSoon((error, extra) => {
    if (error) {
      callback(error);
      return;
    }
    callback(null, {
      count: 2,
      preview: `${pair.setup} / ${pair.punchline}`,
      bonus: extra.setup,
    });
  });
}

// Callbacks do not bubble errors. Every nested step must check `error` itself.
function loadSummary(shouldFail, callback) {
  const start = shouldFail
    ? (cb) => resolveSoon(cb, FAIL_URL)
    : fetchJoke;

  start((firstError, joke) => {
    if (firstError) {
      console.log('caught anywhere in the chain:', firstError.message);
      callback(null, firstError.message);
      return;
    }

    console.log('loaded joke:', joke.setup);
    fetchPunchline(joke, (pairError, pair) => {
      if (pairError) {
        console.log('caught anywhere in the chain:', pairError.message);
        callback(null, pairError.message);
        return;
      }

      console.log('paired punchline:', pair.punchline);
      summarizePair(pair, (summaryError, summary) => {
        if (summaryError) {
          console.log('caught anywhere in the chain:', summaryError.message);
          callback(null, summaryError.message);
          return;
        }

        console.log('summary:', summary);
        callback(null, summary);
      });
    });
  });
}

loadSummary(true, () => {});
