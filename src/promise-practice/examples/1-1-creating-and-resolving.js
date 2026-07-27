function resolveAfter(ms, value) {
  return new Promise((resolve) => {
    setTimeout(() => resolve(value), ms);
  });
}

const greetingPromise = resolveAfter(100, 'hello');

console.log('promise created:', greetingPromise instanceof Promise);
console.log('waiting for resolution...');

greetingPromise.then((greeting) => {
  console.log('promise resolved:', greeting);
});
