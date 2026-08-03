import needle from 'needle';

function resolveSoon(callback) {
  needle.get(`https://official-joke-api.appspot.com/random_joke`, (error, response, body) => {
    if (error) {
      callback(error);
    }
    else {
      callback(body)
    }
  });
}

resolveSoon(() => {
  console.log('after request in the callback')
})
console.log('outside async call')



function resolveSoonWithPromise() {
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

const promise = resolveSoonWithPromise()
promise.then((result) => {
  console.log('inside then')
  console.log(result)
})
console.log('after then')