function fetchUser(userId, callback) {
  setTimeout(() => {
    callback({ id: userId, name: 'Asha' });
  }, 50);
}

function fetchOrders(userId, callback) {
  setTimeout(() => {
    callback([
      { id: 101, userId, total: 40 },
      { id: 102, userId, total: 75 },
    ]);
  }, 50);
}

fetchUser(1, (user) => {
  console.log('loaded user:', user.name);
  fetchOrders(user.id, (orders) => {
    console.log('loaded orders:', orders.length);
  });
});
