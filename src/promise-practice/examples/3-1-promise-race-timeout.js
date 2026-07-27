function delay(ms, value) {
  return new Promise((resolve) => setTimeout(() => resolve(value), ms));
}

function timeout(ms) {
  return new Promise((_, reject) => {
    setTimeout(() => reject(new Error('timeout')), ms);
  });
}

async function fetchWithTimeout() {
  try {
    const result = await Promise.race([
      delay(200, 'data loaded'),
      timeout(100),
    ]);
    console.log('result:', result);
  } catch (error) {
    console.log('error:', error.message);
  }
}

fetchWithTimeout();