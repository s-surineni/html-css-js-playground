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

function summarizeOrders(userOrders, callback) {
  queueMicrotask(() => {
    if (userOrders.length === 0) {
      callback(new Error('No orders to summarize'));
      return;
    }
    callback(null, {
      count: userOrders.length,
      total: userOrders.reduce((sum, order) => sum + order.total, 0),
    });
  });
}

// Callbacks do not bubble errors. Every nested step must check `error` itself.
function loadSummary(userId, callback) {
  fetchUser(userId, (userError, user) => {
    if (userError) {
      console.log('caught anywhere in the chain:', userError.message);
      callback(null, userError.message);
      return;
    }

    console.log('loaded user:', user.name);
    fetchOrders(user.id, (ordersError, userOrders) => {
      if (ordersError) {
        console.log('caught anywhere in the chain:', ordersError.message);
        callback(null, ordersError.message);
        return;
      }

      console.log('loaded orders:', userOrders.length);
      summarizeOrders(userOrders, (summaryError, summary) => {
        if (summaryError) {
          console.log('caught anywhere in the chain:', summaryError.message);
          callback(null, summaryError.message);
          return;
        }

        console.log('summary:', summary);
        callback(null, summary);
      });
    });
  });
}

loadSummary(99, () => {});
