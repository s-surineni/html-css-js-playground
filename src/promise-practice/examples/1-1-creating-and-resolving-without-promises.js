import needle from 'needle';

function resolveSoon(callback) {
  needle.get(`https://official-joke-api.appspot.com/random_joke`, (error, response, body) => {
    if (error) {
      callback(error);
      return;
    }
    if (response.statusCode < 200 || response.statusCode >= 300) {
      callback(new Error(`HTTP ${response.statusCode}: ${response.statusMessage}`));
      return;
    }
    try {
      console.log("inside async");
      console.log(body);
      callback()
    } catch (err) {
      callback(err);
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
promise.then(() => {
  console.log()
})