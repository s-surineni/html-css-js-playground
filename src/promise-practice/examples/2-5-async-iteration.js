async function* asyncNumbers() {
  for (let i = 1; i <= 3; i++) {
    await new Promise((resolve) => setTimeout(resolve, 30));
    yield i;
  }
}

async function main() {
  const values = [];
  for await (const n of asyncNumbers()) {
    values.push(n);
    console.log('number:', n);
  }
  return values;
}

const iterationPromise = main();
