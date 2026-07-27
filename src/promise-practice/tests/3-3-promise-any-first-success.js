expect(firstSuccessPromise instanceof Promise, true, 'Promise.any is consumed through a Promise');

return firstSuccessPromise.then((firstSuccess) => {
  expect(
    firstSuccess,
    { provider: 'cache', quote: 42 },
    'the first fulfilled provider wins despite other rejections',
  );
});
