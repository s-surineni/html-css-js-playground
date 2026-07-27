// Promise.allSettled waits for all promises and returns their outcomes.
const results = Promise.allSettled([
  Promise.resolve('ok'),
  Promise.reject(new Error('fail')),
]);
expect(results instanceof Promise, true, 'Promise.allSettled returns a promise');
expect(typeof results.then, 'function', 'allSettled result has then method');