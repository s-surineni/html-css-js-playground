import { FAIL_URL, resolveSoon } from './needle-utils.js';

resolveSoon((error, body) => {
  if (error) {
    console.error('request failed:', error.message);
    return;
  }
  console.log('request succeeded:', body);
}, FAIL_URL);
