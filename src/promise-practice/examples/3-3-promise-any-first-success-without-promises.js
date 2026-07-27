function delay(ms, value, shouldFail, callback) {
  setTimeout(() => {
    if (shouldFail) {
      callback(new Error(value));
    } else {
      callback(null, value);
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
  (cb) => delay(80, 'slow', true, cb),
  (cb) => delay(40, 'fast', false, cb),
  (cb) => delay(60, 'medium', true, cb),
], (error, result) => {
  if (error) {
    console.log('all failed:', error.message);
  } else {
    console.log('first success:', result);
  }
});