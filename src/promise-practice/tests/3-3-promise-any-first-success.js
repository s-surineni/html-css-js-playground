// Promise.any resolves with the first fulfilled promise.
const result = Promise.any([
  Promise.reject(new Error('fail1')),
  Promise.resolve('success'),
  Promise.reject(new Error('fail2')),
]);
expect(result instanceof Promise, true, 'Promise.any returns a promise');
expect(typeof result.then, 'function', 'any result has then method');