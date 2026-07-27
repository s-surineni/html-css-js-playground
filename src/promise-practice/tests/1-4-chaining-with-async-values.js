expect(ordersPromise instanceof Promise, true, 'the dependent request chain returns a Promise');

return ordersPromise.then((orders) => {
  expect(orders, [
    { orderId: 1, userId: 1 },
    { orderId: 2, userId: 1 },
  ], 'the second request receives the resolved user id');
});
