expect(resultsPromise instanceof Promise, true, 'Promise.all returns a single Promise');

return resultsPromise.then((values) => {
  expect(values, ['first', 'second', 'third'], 'results preserve input order, not completion order');
});
