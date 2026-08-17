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

function summarizeOrders(userOrders) {
  return new Promise((resolve, reject) => {
    queueMicrotask(() => {
      if (userOrders.length === 0) {
        reject(new Error('No orders to summarize'));
        return;
      }
      resolve({
        count: userOrders.length,
        total: userOrders.reduce((sum, order) => sum + order.total, 0),
      });
    });
  });
}

// One trailing .catch() handles a rejection from any earlier step in the chain.
function loadSummary(userId) {
  return fetchUser(userId)
    .then((user) => {
      console.log('loaded user:', user.name);
      return fetchOrders(user.id);
    })
    .then((userOrders) => {
      console.log('loaded orders:', userOrders.length);
      return summarizeOrders(userOrders);
    })
    .then((summary) => {
      console.log('summary:', summary);
      return summary;
    })
    .catch((error) => {
      console.log('caught anywhere in the chain:', error.message);
      return error.message;
    });
}

const summaryPromise = loadSummary(99);
