import needle from 'needle';

// Callback version: the caller receives the result only after Needle finishes.
export function resolveSoon(callback) {
  needle.get(null, (error, response, body) => {
    if (error) {
      callback(error);
    }
    else {
      callback(body)
    }
  });
}

export function resolveSoonWithPromise() {
  return new Promise((resolve, reject) => {
    // `null` is not a valid URL, so Needle throws before starting a request.
    // The Promise constructor automatically catches synchronous exceptions
    // thrown by its executor and turns them into Promise rejections. That is
    // why `.catch()` runs below even though `reject()` is never called here.
    needle.get(null, (error, response, body) => {
      // With a valid URL, request errors arrive in this callback instead. A
      // real Promise wrapper should use `reject(error)` and `resolve(body)`;
      // `callback` is deliberately undefined in this Promise-based example.
      if (error) {
        callback(error);
      }
      else {
        callback(body)
      }
    });
  })
}

const prom = resolveSoonWithPromise()
prom.then(() => {
  // `.then()` runs only when the Promise is fulfilled.
  console.log('inside then');
  
}).catch((err)=> {
  // `.catch()` handles explicit rejections and exceptions thrown by the
  // executor or by an earlier Promise handler.
  console.log("exception in prom")

  // Error.message and Error.stack are non-enumerable, so JSON.stringify(err)
  // normally prints `{}`. Use `console.error(err)` or `err.message` to see it.
  console.log('ironman err', JSON.stringify(err));
})
