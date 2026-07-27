function delay(ms, value) {
  return new Promise((resolve) => setTimeout(() => resolve(value), ms));
}

async function sequential() {
  const a = await delay(50, 'a');
  const b = await delay(50, 'b');
  const c = await delay(50, 'c');
  console.log('sequential:', [a, b, c]);
}

async function parallel() {
  const [a, b, c] = await Promise.all([
    delay(50, 'a'),
    delay(50, 'b'),
    delay(50, 'c'),
  ]);
  console.log('parallel:', [a, b, c]);
}

sequential();
parallel();