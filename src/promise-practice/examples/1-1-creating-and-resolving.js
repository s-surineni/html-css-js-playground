import { resolveSoonWithPromise } from './needle-utils.js';

const greetingPromise = resolveSoonWithPromise();

console.log('promise created:', greetingPromise instanceof Promise);
console.log('waiting for resolution...');

greetingPromise.then((joke) => {
  console.log('promise resolved:', `${joke.setup} — ${joke.punchline}`);
});
