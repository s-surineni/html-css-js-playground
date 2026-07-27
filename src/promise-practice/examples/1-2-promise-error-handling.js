function saveProfile(profile) {
  return new Promise((resolve, reject) => {
    queueMicrotask(() => {
      if (!profile.name?.trim()) {
        reject(new Error('Name is required'));
        return;
      }
      resolve({ ...profile, saved: true });
    });
  });
}

const savePromise = saveProfile({ id: 1, name: '' })
  .catch((error) => {
    console.log('unable to save profile:', error.message);
    return error.message;
  });
