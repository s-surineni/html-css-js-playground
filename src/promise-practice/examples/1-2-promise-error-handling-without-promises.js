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
