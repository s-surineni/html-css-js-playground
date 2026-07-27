// Promise.all runs promises in parallel and collects results.
async function parallel() {
  const [a, b, c] = await Promise.all([
    Promise.resolve('a'),
    Promise.resolve('b'),
    Promise.resolve('c'),
  ]);
  expect([a, b, c], ['a', 'b', 'c'], 'Promise.all collects all results');
}
parallel();