import { resolveSoon } from './needle-utils.js';

function greet(callback) {
  resolveSoon((error, joke) => {
    if (error) {
      callback(error);
      return;
    }
    callback(null, `Hello, ${joke.setup}!`);
  });
}

greet((error, value) => {
  if (error) {
    console.error('unable to greet:', error.message);
    return;
  }
  console.log('resolved:', value);
});
