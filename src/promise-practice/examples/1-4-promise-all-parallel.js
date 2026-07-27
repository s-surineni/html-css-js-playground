function delay(ms, value) {
  return new Promise((resolve) => setTimeout(() => resolve(value), ms));
}

const resultsPromise = Promise.all([
  delay(80, 'first'),
  delay(40, 'second'),
  delay(60, 'third'),
]).then((values) => {
  console.log('all results in input order:', values);
  return values;
});
