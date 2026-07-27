expect(greetingPromise instanceof Promise, true, 'resolveAfter returns a Promise');

return greetingPromise.then((greeting) => {
  expect(greeting, 'hello', 'promise resolves with the supplied value');
});
