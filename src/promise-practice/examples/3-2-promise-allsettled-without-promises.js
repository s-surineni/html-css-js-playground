function delay(ms, value, shouldFail, callback) {
  setTimeout(() => {
    if (shouldFail) {
      callback(new Error(value));
    } else {
      callback(null, value);
    }
  }, ms);
}

function allSettled(tasks, callback) {
  const outcomes = [];
  let completed = 0;
  for (let i = 0; i < tasks.length; i++) {
    tasks[i]((error, result) => {
      if (error) {
        outcomes[i] = { status: 'rejected', reason: error };
      } else {
        outcomes[i] = { status: 'fulfilled', value: result };
      }
      completed++;
      if (completed === tasks.length) {
        callback(outcomes);
      }
    });
  }
}

allSettled([
  (cb) => delay(40, 'success-a', false, cb),
  (cb) => delay(60, 'fail-b', true, cb),
  (cb) => delay(30, 'success-c', false, cb),
], (outcomes) => {
  outcomes.forEach((outcome, i) => {
    console.log(`task ${i}:`, outcome.status === 'fulfilled' ? outcome.value : outcome.reason.message);
  });
});