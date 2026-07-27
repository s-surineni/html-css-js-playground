function fetchUser(id, callback) {
  setTimeout(() => callback({ id, name: 'Alice' }), 50);
}

function fetchOrders(userId, callback) {
  setTimeout(() => callback([{ orderId: 1, userId }, { orderId: 2, userId }]), 50);
}

fetchUser(1, (user) => {
  console.log('user:', user.name);
  fetchOrders(user.id, (orders) => {
    console.log('orders:', orders.length);
  });
});