expect(mainPromise instanceof Promise, true, 'calling the async main function returns a Promise');

return mainPromise.then((status) => {
  expect(status, 'done', 'await receives and returns the resolved value');
});
