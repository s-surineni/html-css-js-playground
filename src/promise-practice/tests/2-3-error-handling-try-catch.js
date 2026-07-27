// try/catch works with await for error handling.
async function run() {
  const p = Promise.reject(new Error('oops'));
  try {
    await p;
    expect(false, true, 'should not reach here');
  } catch (error) {
    expect(error.message, 'oops', 'catch receives the rejection reason');
  }
}
return run();
