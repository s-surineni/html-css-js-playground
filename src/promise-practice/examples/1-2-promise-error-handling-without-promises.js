import needle from 'needle';
export function resolveSoon(callback) {
  needle.get(`https://official-jokap.appspot.com/random_joke`, (error, response, body) => {
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
    needle.get(`https://official-joke-api.appspot.com/random_joke`, (error, response, body) => {
      if (error) {
        reject(error)
      }
      else {
        resolve(body)
      }
    })
  })
}

resolveSoon((resp) => {
  console.log("inside callback");
  console.log()
})