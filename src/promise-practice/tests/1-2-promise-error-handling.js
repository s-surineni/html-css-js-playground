expect(handledPromises instanceof Promise, true, 'handled operations remain awaitable');

return handledPromises.then((outcomes) => {
  expect(outcomes, ['success', 'something went wrong'], 'catch converts the rejection into a handled value');
});
