expect(userOrdersPromise instanceof Promise, true, 'the dependent request chain returns a Promise');

const successTest = userOrdersPromise.then((userOrders) => {
  expect(userOrders.length, 2, 'both orders are returned');
  expect(
    userOrders.every(({ userId }) => userId === 1),
    true,
    'the resolved user id is passed to fetchOrders',
  );
  expect(
    userOrders.reduce((total, order) => total + order.total, 0),
    115,
    'the returned orders contain realistic totals',
  );
});

const missingUserTest = fetchUser(99).then(
  () => {
    expect(true, false, 'an unknown user should reject');
  },
  (error) => {
    expect(error.message, 'User 99 not found', 'an unknown user returns a useful error');
  },
);

return Promise.all([successTest, missingUserTest]);
