function mightFail(shouldFail, callback) {
  setTimeout(() => {
    if (shouldFail) {
      callback(new Error('operation failed'));
    } else {
      callback(null, 'ok');
    }
  }, 50);
}

function run(callback) {
  mightFail(true, (error, result) => {
    if (error) {
      console.log('caught:', error.message);
    } else {
      console.log('result:', result);
    }
    callback();
  });
}

run();