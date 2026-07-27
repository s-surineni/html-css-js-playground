const executionLog = [];

function runTask(group, label, ms = 20) {
  executionLog.push(`start:${group}:${label}`);
  return new Promise((resolve) => {
    setTimeout(() => {
      executionLog.push(`end:${group}:${label}`);
      resolve(label);
    }, ms);
  });
}

async function sequential() {
  const a = await runTask('sequential', 'a');
  const b = await runTask('sequential', 'b');
  const c = await runTask('sequential', 'c');
  const values = [a, b, c];
  console.log('sequential:', values);
  return values;
}

async function parallel() {
  const [a, b, c] = await Promise.all([
    runTask('parallel', 'a'),
    runTask('parallel', 'b'),
    runTask('parallel', 'c'),
  ]);
  const values = [a, b, c];
  console.log('parallel:', values);
  return values;
}

async function compareStrategies() {
  const sequentialValues = await sequential();
  const parallelValues = await parallel();
  console.log('execution order:', executionLog);
  return { sequentialValues, parallelValues };
}

const comparisonPromise = compareStrategies();
