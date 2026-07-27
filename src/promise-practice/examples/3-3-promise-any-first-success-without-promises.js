function requestProvider(ms, provider, shouldFail, callback) {
  setTimeout(() => {
    if (shouldFail) {
      callback(new Error(`${provider} failed`));
    } else {
      callback(null, { provider, quote: 42 });
    }
  }, ms);
}

function any(tasks, callback) {
  let settled = false;
  let errors = [];
  let completed = 0;
  for (let i = 0; i < tasks.length; i++) {
    tasks[i]((error, result) => {
      if (settled) return;
      completed++;
      if (error) {
        errors.push(error);
        if (completed === tasks.length) {
          settled = true;
          const aggregate = new AggregateError(errors, 'All promises were rejected');
          callback(aggregate);
        }
      } else {
        settled = true;
        callback(null, result);
      }
    });
  }
}

any([
  (cb) => requestProvider(80, 'primary', true, cb),
  (cb) => requestProvider(40, 'cache', false, cb),
  (cb) => requestProvider(60, 'replica', true, cb),
], (error, result) => {
  if (error) {
    console.log('all failed:', error.message);
  } else {
    console.log('first success:', result.provider, result.quote);
  }
});
