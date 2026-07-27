expect(countingPromise instanceof Promise, true, 'the chain returns a Promise');

return countingPromise.then((finalValue) => {
  expect(finalValue, 3, 'each handler passes its return value to the next');
});
