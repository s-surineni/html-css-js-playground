function mightFail(shouldFail, callback) {
  setTimeout(() => {
    if (shouldFail) {
      callback(new Error('something went wrong'));
    } else {
      callback(null, 'success');
    }
  }, 50);
}

mightFail(false, (error, result) => {
  if (error) {
    console.log('caught error:', error.message);
  } else {
    console.log('result:', result);
  }
});

mightFail(true, (error, result) => {
  if (error) {
    console.log('caught error:', error.message);
  } else {
    console.log('result:', result);
  }
});
