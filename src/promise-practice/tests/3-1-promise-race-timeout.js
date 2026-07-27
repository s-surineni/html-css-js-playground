// Promise.race settles as soon as any input promise settles.
const fast = Promise.resolve('fast');
const slow = new Promise((resolve) => setTimeout(() => resolve('slow'), 200));
const race = Promise.race([fast, slow]);
expect(race instanceof Promise, true, 'Promise.race returns a promise');
expect(typeof race.then, 'function', 'race result has then method');