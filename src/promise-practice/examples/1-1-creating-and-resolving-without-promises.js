function resolveSoon(value, callback) {
  queueMicrotask(() => callback(value));
}

const callback = (value) => {
  console.log('resolved value:', value);
};

console.log('callback registered');
console.log('waiting for callback...');

resolveSoon('hello', callback);
