function asyncNumbers(callback) {
  let i = 0;
  function next() {
    i++;
    if (i > 3) {
      callback(null);
      return;
    }
    setTimeout(() => {
      callback(i);
    }, 30);
  }
  next();
}

asyncNumbers(function iterate(n) {
  if (n === null) return;
  console.log('number:', n);
  asyncNumbers(iterate);
});