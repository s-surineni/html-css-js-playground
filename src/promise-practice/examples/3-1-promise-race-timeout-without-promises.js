function delay(ms, value, callback) {
  setTimeout(() => callback(value), ms);
}

function timeout(ms, callback) {
  setTimeout(() => callback(new Error('timeout')), ms);
}

function fetchWithTimeout(callback) {
  let settled = false;
  function done(error, result) {
    if (settled) return;
    settled = true;
    if (error) {
      console.log('error:', error.message);
    } else {
      console.log('result:', result);
    }
    callback();
  }
  delay(200, 'data loaded', (result) => done(null, result));
  timeout(100, (error) => done(error));
}

fetchWithTimeout();