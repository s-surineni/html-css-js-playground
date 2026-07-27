expect(userOrdersPromise instanceof Promise, true, 'the dependent request chain returns a Promise');

return userOrdersPromise.then((orders) => {
  expect(orders.length, 2, 'both orders are returned');
  expect(
    orders.every(({ userId }) => userId === 1),
    true,
    'the resolved user id is passed to fetchOrders',
  );
  expect(
    orders.reduce((total, order) => total + order.total, 0),
    115,
    'the returned orders contain realistic totals',
  );
});
