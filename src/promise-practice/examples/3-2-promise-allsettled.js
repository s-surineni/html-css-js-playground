function delay(ms, value, shouldFail = false) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldFail) reject(new Error(value));
      else resolve(value);
    }, ms);
  });
}

const outcomesPromise = Promise.allSettled([
  delay(40, 'success-a'),
  delay(60, 'fail-b', true),
  delay(30, 'success-c'),
]).then((outcomes) => {
  outcomes.forEach((outcome, i) => {
    console.log(`task ${i}:`, outcome.status === 'fulfilled' ? outcome.value : outcome.reason.message);
  });
  return outcomes;
});
