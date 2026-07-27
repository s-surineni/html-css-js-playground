expect(comparisonPromise instanceof Promise, true, 'both strategies can be awaited together');

return comparisonPromise.then(([sequentialValues, parallelValues]) => {
  expect(sequentialValues, ['a', 'b', 'c'], 'sequential awaits preserve the operation order');
  expect(parallelValues, ['a', 'b', 'c'], 'parallel awaits collect the same results');
});
