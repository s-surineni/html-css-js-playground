// Returning a value from .then passes it to the next handler.
const chain = Promise.resolve(1)
  .then((v) => v + 1)
  .then((v) => v + 1);
expect(chain instanceof Promise, true, 'chaining returns a promise');
expect(typeof chain.then, 'function', 'chained promise has then method');