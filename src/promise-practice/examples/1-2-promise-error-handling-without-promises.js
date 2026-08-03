import needle from 'needle';

export function resolveSoon(callback) {
  needle.get(`https://official-joke-api.appspot.com/rando_joke`, (error, response, body) => {
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


function saveProfile(profile, callback) {
  queueMicrotask(() => {
    if (!profile.name?.trim()) {
      callback(new Error('Name is required'));
      return;
    }
    callback(null, { ...profile, saved: true });
  });
}

saveProfile({ id: 1, name: '' }, (error, profile) => {
  if (error) {
    console.log('unable to save profile:', error.message);
    return;
  }
  console.log('saved profile:', profile);
});
