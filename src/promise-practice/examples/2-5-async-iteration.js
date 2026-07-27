async function* asyncNumbers() {
  for (let i = 1; i <= 3; i++) {
    await new Promise((resolve) => setTimeout(resolve, 30));
    yield i;
  }
}

async function main() {
  for await (const n of asyncNumbers()) {
    console.log('number:', n);
  }
}

main();