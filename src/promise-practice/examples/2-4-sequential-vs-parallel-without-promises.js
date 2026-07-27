const executionLog = [];

function runTask(group, label, callback) {
  executionLog.push(`start:${group}:${label}`);
  setTimeout(() => {
    executionLog.push(`end:${group}:${label}`);
    callback(label);
  }, 20);
}

function sequential(callback) {
  runTask('sequential', 'a', (a) => {
    runTask('sequential', 'b', (b) => {
      runTask('sequential', 'c', (c) => {
        console.log('sequential:', [a, b, c]);
        callback();
      });
    });
  });
}

function parallel(callback) {
  const results = [];
  let completed = 0;
  const items = ['a', 'b', 'c'];
  for (let i = 0; i < items.length; i++) {
    runTask('parallel', items[i], (result) => {
      results[i] = result;
      completed++;
      if (completed === items.length) {
        console.log('parallel:', results);
        callback();
      }
    });
  }
}

sequential(() => {
  parallel(() => {
    console.log('execution order:', executionLog);
  });
});
