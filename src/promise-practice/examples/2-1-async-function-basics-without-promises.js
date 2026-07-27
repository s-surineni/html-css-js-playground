function greet(name, callback) {
  queueMicrotask(() => callback(`Hello, ${name}!`));
}

greet('World', (value) => {
  console.log('resolved:', value);
});
