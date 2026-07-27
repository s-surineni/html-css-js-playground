function delay(ms, value, shouldFail = false) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldFail) reject(new Error(value));
      else resolve(value);
    }, ms);
  });
}

async function main() {
  try {
    const result = await Promise.any([
      delay(80, 'slow', true),
      delay(40, 'fast'),
      delay(60, 'medium', true),
    ]);
    console.log('first success:', result);
  } catch (error) {
    console.log('all failed:', error.message);
  }
}

main();