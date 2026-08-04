// Problem: setTimeout schedules its callback, but does not pause this function.
function demonstrateWithoutCallback() {
  setTimeout(() => {
    console.log('2. Inside the first timeout');
  }, 100);

  // This runs immediately, before the timeout callback.
  console.log('1. After the first setTimeout');
}

demonstrateWithoutCallback();

// Solution: accept a callback for work that must run after the timeout.
function runAfterTimeout(callback) {
  setTimeout(() => {
    console.log('3. Inside the second timeout');
    callback();
  }, 100);
}

runAfterTimeout(() => {
  console.log('4. After the second timeout');
});

function runAfterTimeoutPromise() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log("inside timeout")
      resolve()
    }, 10)
  })

}

const promise = runAfterTimeoutPromise();
promise.then(() => {
  console.log('after promise resolve')
})
