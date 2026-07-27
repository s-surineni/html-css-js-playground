// for await...of iterates over async iterables.
async function* asyncNumbers() {
  yield 1;
  yield 2;
  yield 3;
}
async function main() {
  const values = [];
  for await (const n of asyncNumbers()) {
    values.push(n);
  }
  expect(values, [1, 2, 3], 'for await...of collects all yielded values');
}
return main();
