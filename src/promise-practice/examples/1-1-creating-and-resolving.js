function resolveSoon(value) {
  return new Promise((resolve) => {
    queueMicrotask(() => resolve(value));
  });
}

const greetingPromise = resolveSoon('hello');

console.log('promise created:', greetingPromise instanceof Promise);
console.log('waiting for resolution...');

greetingPromise.then((greeting) => {
  console.log('promise resolved:', greeting);
});
