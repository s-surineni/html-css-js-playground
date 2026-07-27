// Creating a promise returns a Promise instance.
const p = new Promise((resolve) => resolve('hello'));
expect(p instanceof Promise, true, 'new Promise returns a Promise');
expect(typeof p.then, 'function', 'promise has a then method');