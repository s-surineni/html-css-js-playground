function requestProvider(ms, provider, shouldFail = false) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldFail) reject(new Error(`${provider} failed`));
      else resolve({ provider, quote: 42 });
    }, ms);
  });
}

async function main() {
  try {
    const result = await Promise.any([
      requestProvider(80, 'primary', true),
      requestProvider(40, 'cache'),
      requestProvider(60, 'replica', true),
    ]);
    console.log('first success:', result.provider, result.quote);
    return result;
  } catch (error) {
    console.log('all failed:', error.message);
    return error.message;
  }
}

const firstSuccessPromise = main();
