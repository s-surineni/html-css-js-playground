// An async function always returns a promise.
async function greet(name) {
  return `Hello, ${name}!`;
}
const result = greet('World');
expect(result instanceof Promise, true, 'async function returns a promise');
expect(typeof result.then, 'function', 'async result has then method');