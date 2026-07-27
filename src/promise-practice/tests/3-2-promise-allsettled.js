expect(outcomesPromise instanceof Promise, true, 'Promise.allSettled returns a Promise');

return outcomesPromise.then((reports) => {
  expect(
    reports.map(({ name }) => name),
    ['profile', 'recommendations', 'orders'],
    'outcomes retain useful task names',
  );
  expect(
    reports.map(({ status }) => status),
    ['fulfilled', 'rejected', 'fulfilled'],
    'all outcomes are reported in input order',
  );
  expect(reports[1].reason.message, 'service unavailable', 'the rejection reason is preserved');
});
