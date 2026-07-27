function mightFail(shouldFail) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldFail) {
        reject(new Error('operation failed'));
      } else {
        resolve('ok');
      }
    }, 50);
  });
}

async function run(shouldFail) {
  try {
    const result = await mightFail(shouldFail);
    console.log('result:', result);
    return result;
  } catch (error) {
    console.log('caught:', error.message);
    return error.message;
  }
}

const runPromise = run(true);
