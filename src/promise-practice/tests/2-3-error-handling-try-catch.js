expect(runPromise instanceof Promise, true, 'the guarded async operation returns a Promise');

return runPromise.then((message) => {
  expect(message, 'operation failed', 'try/catch handles the actual rejected operation');
});
