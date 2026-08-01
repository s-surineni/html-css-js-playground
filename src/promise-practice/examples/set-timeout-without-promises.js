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

function asyncExample(callback) {
    setTimeout(() => {
        console.log("inside set timeout");
        callback()
    }, 10)


}

function waitForTiemout() {
    console.log("outside setttimeout");
}
asyncExample(waitForTiemout)

function asyncExample2() {
    return new Promise(resolve => {
        setTimeout(() => {
            console.log("inside set timeout");
            resolve()
        }, 10)
    })

}

function waitForTimeout2() {
    const prom = asyncExample2();
    prom.then(()=> console.log("after set timeout"));
}

waitForTimeout2()