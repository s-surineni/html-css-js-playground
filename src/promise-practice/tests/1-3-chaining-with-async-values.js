expect(userOrdersPromise instanceof Promise, true, 'the dependent request chain returns a Promise');

return userOrdersPromise.then((pair) => {
  expect(typeof pair.first, 'string', 'the first joke is passed into the next request');
  expect(typeof pair.second, 'string', 'returning a promise from then waits for the next result');
  expect(pair.first.includes('—'), true, 'the first joke is formatted from the API response');
  expect(pair.second.includes('—'), true, 'the second joke is formatted from the API response');
});
