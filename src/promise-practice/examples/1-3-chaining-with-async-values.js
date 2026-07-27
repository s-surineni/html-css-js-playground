const users = new Map([
  [1, { id: 1, name: 'Asha' }],
]);

const orders = [
  { id: 101, userId: 1, total: 40 },
  { id: 102, userId: 1, total: 75 },
];

function fetchUser(userId) {
  return new Promise((resolve, reject) => {
    queueMicrotask(() => {
      const user = users.get(userId);
      if (!user) {
        reject(new Error(`User ${userId} not found`));
        return;
      }
      resolve(user);
    });
  });
}

function fetchOrders(userId) {
  return new Promise((resolve) => {
    queueMicrotask(() => {
      resolve(orders.filter((order) => order.userId === userId));
    });
  });
}

const userOrdersPromise = fetchUser(1)
  .then((user) => {
    console.log('loaded user:', user.name);
    return fetchOrders(user.id);
  })
  .then((userOrders) => {
    console.log('loaded orders:', userOrders.length);
    return userOrders;
  });
