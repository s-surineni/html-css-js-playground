expect(outcomesPromise instanceof Promise, true, 'Promise.allSettled returns a Promise');

return outcomesPromise.then((outcomes) => {
  expect(
    outcomes.map(({ status }) => status),
    ['fulfilled', 'rejected', 'fulfilled'],
    'all outcomes are reported in input order',
  );
  expect(outcomes[1].reason.message, 'fail-b', 'the rejection reason is preserved');
});
