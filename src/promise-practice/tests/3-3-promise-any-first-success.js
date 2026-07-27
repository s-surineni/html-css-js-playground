expect(firstSuccessPromise instanceof Promise, true, 'Promise.any is consumed through a Promise');

return firstSuccessPromise.then((firstSuccess) => {
  expect(firstSuccess, 'fast', 'the first fulfilled operation wins despite other rejections');
});
