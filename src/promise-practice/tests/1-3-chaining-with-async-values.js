expect(userPostsPromise instanceof Promise, true, 'the dependent request chain returns a Promise');

return userPostsPromise.then((summary) => {
  expect(typeof summary.postCount, 'number', 'the posts response is passed into the next then');
  expect(summary.postCount > 0, true, 'returning a promise from then waits for the next JSON result');
  expect(typeof summary.firstTitle, 'string', 'the first post title comes from the API response');
});
