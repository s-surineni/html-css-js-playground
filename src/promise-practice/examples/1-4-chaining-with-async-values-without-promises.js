const users = new Map([
  [1, { id: 1, name: 'Asha' }],
]);

const orders = [
  { id: 101, userId: 1, total: 40 },
  { id: 102, userId: 1, total: 75 },
];

function fetchUser(userId, callback) {
  queueMicrotask(() => {
    const user = users.get(userId);
    if (!user) {
      callback(new Error(`User ${userId} not found`));
      return;
    }
    callback(null, user);
  });
}

function fetchOrders(userId, callback) {
  queueMicrotask(() => {
    callback(
      null,
      orders.filter((order) => order.userId === userId),
    );
  });
}

fetchUser(1, (userError, user) => {
  if (userError) {
    console.error('unable to load user:', userError.message);
    return;
  }

  console.log('loaded user:', user.name);
  fetchOrders(user.id, (ordersError, userOrders) => {
    if (ordersError) {
      console.error('unable to load orders:', ordersError.message);
      return;
    }

    console.log('loaded orders:', userOrders.length);
  });
});
