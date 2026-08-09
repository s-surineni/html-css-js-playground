import { resolveSoonWithPromise } from './1-1-needle-utils.js';

// Port 1 is intentionally unreachable, making Needle report a connection
// error so this example can demonstrate Promise rejection without relying on
// a public API or an internet connection.
const requestPromise = resolveSoonWithPromise('http://127.0.0.1:1/profile');

requestPromise
  .then((body) => {
    console.log('request succeeded:', body);
  })
  .catch((error) => {
    console.error('request failed:', error.message);
  });
