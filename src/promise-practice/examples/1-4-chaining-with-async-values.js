function fetchUser(id) {
  return new Promise((resolve) => {
    setTimeout(() => resolve({ id, name: 'Alice' }), 50);
  });
}

function fetchOrders(userId) {
  return new Promise((resolve) => {
    setTimeout(() => resolve([{ orderId: 1, userId }, { orderId: 2, userId }]), 50);
  });
}

fetchUser(1)
  .then((user) => {
    console.log('user:', user.name);
    return fetchOrders(user.id);
  })
  .then((orders) => {
    console.log('orders:', orders.length);
  });