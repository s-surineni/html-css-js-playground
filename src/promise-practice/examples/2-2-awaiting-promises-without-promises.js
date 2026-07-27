function loadStatus(callback) {
  queueMicrotask(() => callback('done'));
}

function main(callback) {
  console.log('starting...');
  loadStatus((result) => {
    console.log('after await:', result);
    callback();
  });
}

main();
