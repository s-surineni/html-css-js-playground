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

const tasks = [
  { name: 'profile', run: (cb) => delay(40, { name: 'Asha' }, false, cb) },
  { name: 'recommendations', run: (cb) => delay(60, 'service unavailable', true, cb) },
  { name: 'orders', run: (cb) => delay(30, [{ id: 101 }], false, cb) },
];

allSettled(tasks.map(({ run }) => run), (outcomes) => {
  outcomes.forEach((outcome, index) => {
    const result = outcome.status === 'fulfilled'
      ? outcome.value
      : outcome.reason.message;
    console.log(`${tasks[index].name}:`, outcome.status, result);
  });
});
