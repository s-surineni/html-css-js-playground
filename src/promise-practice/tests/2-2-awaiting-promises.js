// await can only be used inside async functions or top-level modules.
async function main() {
  const p = Promise.resolve('done');
  const result = await p;
  expect(result, 'done', 'await receives the resolved value');
}
main();