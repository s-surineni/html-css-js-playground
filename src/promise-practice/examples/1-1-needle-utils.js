import needle from 'needle';

const JOKE_URL = 'https://official-joke-api.appspot.com/random_joke';

export function resolveSoon(callback) {
  needle.get(JOKE_URL, (error, response, body) => {
    if (error) {
      callback(error);
    }
    else {
      callback(body)
    }
  });
}

export function resolveSoonWithPromise(url = JOKE_URL) {
  return new Promise((resolve, reject) => {
    needle.get(url, (error, response, body) => {
      if (error) {
        reject(error);
        return;
      }

      resolve(body);
    });
  });
}
