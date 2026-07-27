function delay(ms, value, shouldFail = false) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldFail) reject(new Error(value));
      else resolve(value);
    }, ms);
  });
}

const tasks = [
  { name: 'profile', promise: delay(40, { name: 'Asha' }) },
  { name: 'recommendations', promise: delay(60, 'service unavailable', true) },
  { name: 'orders', promise: delay(30, [{ id: 101 }]) },
];

const outcomesPromise = Promise.allSettled(
  tasks.map(({ promise }) => promise),
).then((outcomes) => {
  const reports = outcomes.map((outcome, index) => ({
    name: tasks[index].name,
    ...outcome,
  }));

  reports.forEach((report) => {
    const result = report.status === 'fulfilled'
      ? report.value
      : report.reason.message;
    console.log(`${report.name}:`, report.status, result);
  });
  return reports;
});
