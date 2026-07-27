expect(greetingPromise instanceof Promise, true, 'the async function returns a Promise');

return greetingPromise.then((greeting) => {
  expect(greeting, 'Hello, World!', 'the returned value becomes the resolved value');
});
