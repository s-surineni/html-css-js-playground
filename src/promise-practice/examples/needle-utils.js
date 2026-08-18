import needle from 'needle';

export const JOKE_URL = 'https://official-joke-api.appspot.com/random_joke';

// Unreachable local port — useful for demos that need a reliable rejection
// without depending on a public API error response.
export const FAIL_URL = 'http://127.0.0.1:1/profile';

export function resolveSoon(callback, url = JOKE_URL) {
  needle.get(url, (error, response, body) => {
    if (error) {
      callback(error);
      return;
    }
    callback(null, body);
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
