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

async function run() {
  try {
    const result = await mightFail(true);
    console.log('result:', result);
  } catch (error) {
    console.log('caught:', error.message);
  }
}

run();