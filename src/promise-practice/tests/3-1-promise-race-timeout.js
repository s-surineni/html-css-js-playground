expect(timeoutPromise instanceof Promise, true, 'the raced operation returns a Promise');

return timeoutPromise.then((outcome) => {
  expect(outcome, 'timeout', 'the timeout rejects before the slower data operation resolves');
});
