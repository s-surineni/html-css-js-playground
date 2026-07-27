function delay(ms, value) {
  return new Promise((resolve) => setTimeout(() => resolve(value), ms));
}

async function main() {
  console.log('starting...');
  const result = await delay(50, 'done');
  console.log('after await:', result);
}

main();