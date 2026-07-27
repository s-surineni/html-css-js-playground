function mightFail(shouldFail) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldFail) {
        reject(new Error('something went wrong'));
      } else {
        resolve('success');
      }
    }, 50);
  });
}

mightFail(false)
  .then((result) => {
    console.log('result:', result);
  })
  .catch((error) => {
    console.log('caught error:', error.message);
  });

mightFail(true)
  .then((result) => {
    console.log('result:', result);
  })
  .catch((error) => {
    console.log('caught error:', error.message);
  });