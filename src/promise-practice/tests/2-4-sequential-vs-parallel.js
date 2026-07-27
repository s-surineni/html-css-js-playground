expect(comparisonPromise instanceof Promise, true, 'both strategies can be awaited together');

return comparisonPromise.then(({ sequentialValues, parallelValues }) => {
  expect(sequentialValues, ['a', 'b', 'c'], 'sequential awaits preserve the operation order');
  expect(parallelValues, ['a', 'b', 'c'], 'parallel awaits collect the same results');
  expect(
    executionLog.slice(0, 6),
    [
      'start:sequential:a',
      'end:sequential:a',
      'start:sequential:b',
      'end:sequential:b',
      'start:sequential:c',
      'end:sequential:c',
    ],
    'sequential work starts only after the previous task ends',
  );
  expect(
    executionLog.slice(6, 9),
    ['start:parallel:a', 'start:parallel:b', 'start:parallel:c'],
    'parallel work starts all tasks before any finishes',
  );
});
