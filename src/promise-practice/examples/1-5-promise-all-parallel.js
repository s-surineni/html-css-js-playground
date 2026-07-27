function delay(ms, value) {
  return new Promise((resolve) => setTimeout(() => resolve(value), ms));
}

const results = Promise.all([
  delay(80, 'first'),
  delay(40, 'second'),
  delay(60, 'third'),
]);

results.then((values) => {
  console.log('all results:', values);
});