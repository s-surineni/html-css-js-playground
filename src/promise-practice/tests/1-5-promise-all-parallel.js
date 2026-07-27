// Promise.all takes an iterable of promises and returns a single promise.
const all = Promise.all([Promise.resolve(1), Promise.resolve(2), Promise.resolve(3)]);
expect(all instanceof Promise, true, 'Promise.all returns a promise');
expect(typeof all.then, 'function', 'Promise.all result has then method');