expect(resultsPromise instanceof Promise, true, 'Promise.all returns a single Promise');

return resultsPromise.then((jokes) => {
  expect(jokes.length, 3, 'results preserve input order, not completion order');
  expect(
    jokes.every((joke) => typeof joke.setup === 'string' && typeof joke.punchline === 'string'),
    true,
    'each parallel request resolves with a joke from the API',
  );
});
