function createCounter(initial = 0) {
  let count = initial;

  return {
    increment() {
      count++;
      return count;
    },
    decrement() {
      count--;
      return count;
    },
    get value() {
      return count;
    },
  };
}

console.log('--- Factory Function with Closure Privacy ---');
const counter = createCounter(10);
console.log('increment:', counter.increment());
console.log('public value:', counter.value);
console.log('private property:', counter.count);
