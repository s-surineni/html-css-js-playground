import needle from 'needle';
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
    needle.get(null, (error, response, body) => {
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
  console.log('inside then');
  
}).catch((err)=> {
  console.log("exception in prom")
  console.log('ironman err', JSON.stringify(err));
})