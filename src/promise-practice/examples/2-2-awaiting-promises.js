function loadStatus() {
  return new Promise((resolve) => {
    queueMicrotask(() => resolve('done'));
  });
}

async function main() {
  console.log('starting...');
  const status = await loadStatus();
  console.log('after await:', status);
  return status;
}

const mainPromise = main();
