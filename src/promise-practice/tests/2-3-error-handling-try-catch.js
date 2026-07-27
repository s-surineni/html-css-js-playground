expect(runPromise instanceof Promise, true, 'the guarded async operation returns a Promise');

return runPromise.then((message) => {
  expect(message, 'Record 99 not found', 'try/catch handles the actual rejected operation');
});
