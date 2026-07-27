function delay(ms, value) {
  return new Promise((resolve) => setTimeout(() => resolve(value), ms));
}

const countingPromise = delay(50, 1)
  .then((value) => {
    console.log('step 1:', value);
    return value + 1;
  })
  .then((value) => {
    console.log('step 2:', value);
    return value + 1;
  })
  .then((value) => {
    console.log('step 3:', value);
    return value;
  });
