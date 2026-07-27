expect(savePromise instanceof Promise, true, 'the handled operation remains awaitable');

const failureTest = savePromise.then((message) => {
  expect(message, 'Name is required', 'catch receives and handles the rejection');
});

const successTest = saveProfile({ id: 2, name: 'Asha' }).then((profile) => {
  expect(profile, { id: 2, name: 'Asha', saved: true }, 'valid input still resolves normally');
});

return Promise.all([failureTest, successTest]);
