function resolveAfter(ms, value, callback) {
  setTimeout(() => callback(value), ms);
}

const callback = (value) => {
  console.log('resolved value:', value);
};

console.log('created:', callback);
console.log('state before call:', 'pending');

resolveAfter(100, 'hello', callback);