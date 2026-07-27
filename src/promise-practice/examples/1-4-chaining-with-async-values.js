function fetchUser(userId) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ id: userId, name: 'Asha' });
    }, 50);
  });
}

function fetchOrders(userId) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        { id: 101, userId, total: 40 },
        { id: 102, userId, total: 75 },
      ]);
    }, 50);
  });
}

const userOrdersPromise = fetchUser(1)
  .then((user) => {
    console.log('loaded user:', user.name);
    return fetchOrders(user.id);
  })
  .then((orders) => {
    console.log('loaded orders:', orders.length);
    return orders;
  })
  .catch((error) => {
    console.error('unable to load orders:', error.message);
    throw error;
  });
