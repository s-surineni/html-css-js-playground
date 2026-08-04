import { resolveSoon } from './1-1-needle-utils.js';

console.log('callback registered');
console.log('waiting for callback...');

resolveSoon((error, joke) => {
  if (error) {
    console.error('unable to load joke:', error.message);
    return;
  }
  console.log('resolved value:', `${joke.setup} — ${joke.punchline}`);
});