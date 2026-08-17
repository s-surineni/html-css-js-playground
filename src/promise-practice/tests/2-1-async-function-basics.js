expect(greetingPromise instanceof Promise, true, 'the async function returns a Promise');

return greetingPromise.then((joke) => {
  expect(typeof joke.setup, 'string', 'the returned value becomes the resolved value');
  expect(typeof joke.punchline, 'string', 'Needle body fields are available after await');
});
