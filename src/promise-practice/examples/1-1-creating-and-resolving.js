function resolveAfter(ms, value) {
  return new Promise((resolve) => {
    setTimeout(() => resolve(value), ms);
  });
}

const result = resolveAfter(100, 'hello');

console.log('promise created:', result);
console.log('state before then:', result);

result.then((value) => {
  console.log('resolved value:', value);
});