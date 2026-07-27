expect(greetingPromise instanceof Promise, true, 'resolveSoon returns a Promise');

return greetingPromise.then((greeting) => {
  expect(greeting, 'hello', 'promise resolves with the supplied value');
});
