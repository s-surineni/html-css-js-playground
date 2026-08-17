expect(summaryPromise instanceof Promise, true, 'the chain remains awaitable after catch');

const failureTest = summaryPromise.then((message) => {
  expect(typeof message, 'string', 'one catch handles a rejection from an earlier then step');
  expect(message.length > 0, true, 'the caught rejection message is non-empty');
});

const successTest = loadSummary(false).then((summary) => {
  expect(summary.count, 2, 'a successful chain still resolves normally');
  expect(typeof summary.preview, 'string', 'later then steps still transform the result');
  expect(typeof summary.bonus, 'string', 'each step can issue another Needle request');
});

return Promise.all([failureTest, successTest]);
