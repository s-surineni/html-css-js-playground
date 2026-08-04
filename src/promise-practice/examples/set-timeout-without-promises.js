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
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log('Inside the promise timeout');
      resolve();
    }, 10);
  });
}

const promise = runAfterTimeoutPromise();
promise.then(() => {
  console.log('After the promise resolves');
});

function asyncExample(callback) {
  setTimeout(() => {
    console.log('Inside the callback timeout');
    callback();
  }, 10);
}

function waitForTimeout() {
  console.log('After the callback timeout');
}

asyncExample(waitForTimeout);

function asyncExample2() {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log('Inside the second promise timeout');
      resolve();
    }, 10);
  });
}

function waitForTimeout2() {
  const timeoutPromise = asyncExample2();
  timeoutPromise.then(() => console.log('After the second promise timeout'));
}

waitForTimeout2();
