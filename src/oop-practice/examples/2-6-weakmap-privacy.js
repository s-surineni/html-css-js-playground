// WeakMap keys are instances; their associated state is not stored publicly.
const counterState = new WeakMap();

function Counter(initial = 0) {
  counterState.set(this, { count: initial });
}

Counter.prototype.increment = function () {
  const state = counterState.get(this);
  state.count++;
  return state.count;
};

Counter.prototype.getValue = function () {
  return counterState.get(this).count;
};

const firstCounter = new Counter(5);
const secondCounter = new Counter(10);
firstCounter.increment();

console.log('--- WeakMap Privacy with Shared Methods ---');
console.log('first value:', firstCounter.getValue());
console.log('public count:', firstCounter.count);
console.log('method shared:', firstCounter.increment === secondCounter.increment);
