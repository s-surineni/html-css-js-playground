expect(requestPromise instanceof Promise, true, 'the handled operation remains awaitable');

return requestPromise.then((message) => {
  expect(typeof message, 'string', 'catch receives and handles the rejection');
  expect(message.length > 0, true, 'the rejection message is non-empty');
});
