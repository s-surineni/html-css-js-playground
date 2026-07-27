function greet(name, callback) {
  setTimeout(() => callback(`Hello, ${name}!`), 50);
}

greet('World', (value) => {
  console.log('resolved:', value);
});