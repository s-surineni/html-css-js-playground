function delay(ms, value, callback) {
  setTimeout(() => callback(value), ms);
}

function sequential(callback) {
  delay(50, 'a', (a) => {
    delay(50, 'b', (b) => {
      delay(50, 'c', (c) => {
        console.log('sequential:', [a, b, c]);
        callback();
      });
    });
  });
}

function parallel(callback) {
  const results = [];
  let completed = 0;
  const items = ['a', 'b', 'c'];
  for (let i = 0; i < items.length; i++) {
    delay(50, items[i], (result) => {
      results[i] = result;
      completed++;
      if (completed === items.length) {
        console.log('parallel:', results);
        callback();
      }
    });
  }
}

sequential(() => {});
parallel(() => {});