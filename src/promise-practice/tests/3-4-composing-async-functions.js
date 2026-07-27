// Async functions can be composed in a pipeline.
async function double(x) {
  return x * 2;
}
async function addOne(x) {
  return x + 1;
}
async function pipeline(x) {
  const doubled = await double(x);
  return await addOne(doubled);
}
const result = pipeline(3);
expect(result instanceof Promise, true, 'pipeline returns a promise');
expect(typeof result.then, 'function', 'pipeline result has then method');