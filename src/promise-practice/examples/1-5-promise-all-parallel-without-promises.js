function delay(ms, value, callback) {
  setTimeout(() => callback(value), ms);
}

function parallel(tasks, callback) {
  const results = [];
  let completed = 0;
  for (let i = 0; i < tasks.length; i++) {
    tasks[i]((result) => {
      results[i] = result;
      completed++;
      if (completed === tasks.length) {
        callback(results);
      }
    });
  }
}

parallel([
  (cb) => delay(80, 'first', cb),
  (cb) => delay(40, 'second', cb),
  (cb) => delay(60, 'third', cb),
], (values) => {
  console.log('all results:', values);
});