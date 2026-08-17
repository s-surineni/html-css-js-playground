expect(greetingPromise instanceof Promise, true, 'resolveSoonWithPromise returns a Promise');

return greetingPromise.then((joke) => {
  expect(typeof joke.setup, 'string', 'promise resolves with a joke setup');
  expect(typeof joke.punchline, 'string', 'promise resolves with a joke punchline');
});
