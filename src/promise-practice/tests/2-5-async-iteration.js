expect(iterationPromise instanceof Promise, true, 'consuming the async iterable returns a Promise');

return iterationPromise.then((allJokes) => {
  expect(
    allJokes.map(({ id }) => id),
    [101, 102],
    'for await...of collects records from every page',
  );
  expect(
    allJokes.every((joke) => typeof joke.setup === 'string'),
    true,
    'each page is loaded through Needle before being yielded',
  );
});
