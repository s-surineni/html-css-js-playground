expect(iterationPromise instanceof Promise, true, 'consuming the async iterable returns a Promise');

return iterationPromise.then((values) => {
  expect(values, [1, 2, 3], 'for await...of collects every yielded value');
});
