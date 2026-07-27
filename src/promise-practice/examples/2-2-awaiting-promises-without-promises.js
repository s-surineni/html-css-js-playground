function delay(ms, value, callback) {
  setTimeout(() => callback(value), ms);
}

function main(callback) {
  console.log('starting...');
  delay(50, 'done', (result) => {
    console.log('after await:', result);
    callback();
  });
}

main();