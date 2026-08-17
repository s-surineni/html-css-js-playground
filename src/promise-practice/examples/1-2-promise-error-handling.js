import { FAIL_URL, resolveSoonWithPromise } from './needle-utils.js';

// FAIL_URL points at an unreachable local port so Needle reports a connection
// error without relying on a public API or internet connection.
const requestPromise = resolveSoonWithPromise(FAIL_URL)
  .then((body) => {
    console.log('request succeeded:', body);
    return body;
  })
  .catch((error) => {
    console.error('request failed:', error.message);
    return error.message;
  });
