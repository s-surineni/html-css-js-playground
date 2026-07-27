expect(iterationPromise instanceof Promise, true, 'consuming the async iterable returns a Promise');

return iterationPromise.then((allOrders) => {
  expect(
    allOrders.map(({ id }) => id),
    [101, 102, 103],
    'for await...of collects records from every page',
  );
});
