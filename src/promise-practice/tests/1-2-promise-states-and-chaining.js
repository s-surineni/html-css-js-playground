// Chaining .then returns a new promise and passes values along.
const chain = Promise.resolve(1).then((v) => v + 1).then((v) => v + 1);
expect(chain instanceof Promise, true, 'then returns a promise');
expect(typeof chain.then, 'function', 'chained result has then method');