// .catch handles rejections and returns a new promise.
const p = Promise.reject(new Error('test'));
const caught = p.catch((e) => e.message);
expect(caught instanceof Promise, true, 'catch returns a promise');
expect(typeof caught.then, 'function', 'caught result has then method');