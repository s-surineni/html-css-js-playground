async function greet(name) {
  return `Hello, ${name}!`;
}

const greetingPromise = greet('World');

console.log('async function returned a Promise:', greetingPromise instanceof Promise);

greetingPromise.then((greeting) => {
  console.log('resolved greeting:', greeting);
});
