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

const successPromise = mightFail(false)
  .then((result) => {
    console.log('result:', result);
    return result;
  })
  .catch((error) => {
    console.log('caught error:', error.message);
    return error.message;
  });

const failurePromise = mightFail(true)
  .then((result) => {
    console.log('result:', result);
    return result;
  })
  .catch((error) => {
    console.log('caught error:', error.message);
    return error.message;
  });

const handledPromises = Promise.all([successPromise, failurePromise]);
