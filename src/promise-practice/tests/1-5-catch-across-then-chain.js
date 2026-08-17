expect(summaryPromise instanceof Promise, true, 'the chain remains awaitable after catch');

const failureTest = summaryPromise.then((message) => {
  expect(message, 'User 99 not found', 'one catch handles a rejection from an earlier then step');
});

const successTest = loadSummary(1).then((summary) => {
  expect(summary, { count: 2, total: 115 }, 'a successful chain still resolves normally');
});

return Promise.all([failureTest, successTest]);
