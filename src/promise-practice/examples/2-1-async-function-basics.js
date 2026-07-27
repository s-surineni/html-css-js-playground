async function greet(name) {
  return `Hello, ${name}!`;
}

const result = greet('World');

console.log('returned:', result);

result.then((value) => {
  console.log('resolved:', value);
});