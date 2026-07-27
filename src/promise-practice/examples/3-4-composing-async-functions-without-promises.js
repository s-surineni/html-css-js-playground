const orderStore = new Map([
  [101, {
    id: 101,
    items: [
      { price: 20, quantity: 2 },
      { price: 15, quantity: 1 },
    ],
  }],
]);

const summaryStore = new Map();

function runInRepository(operation, callback) {
  queueMicrotask(() => {
    try {
      callback(null, operation());
    } catch (error) {
      callback(error);
    }
  });
}

function loadOrder(orderId, callback) {
  runInRepository(() => {
    const order = orderStore.get(orderId);
    if (!order) throw new Error(`Order ${orderId} not found`);
    return order;
  }, callback);
}

function calculateSummary(order, callback) {
  runInRepository(() => ({
    orderId: order.id,
    itemCount: order.items.reduce((count, item) => count + item.quantity, 0),
    total: order.items.reduce((total, item) => total + item.price * item.quantity, 0),
  }), callback);
}

function saveSummary(summary, callback) {
  runInRepository(() => {
    summaryStore.set(summary.orderId, summary);
    return summary;
  }, callback);
}

function pipeline(orderId, callback) {
  loadOrder(orderId, (loadError, order) => {
    if (loadError) return callback(loadError);
    calculateSummary(order, (summaryError, summary) => {
      if (summaryError) return callback(summaryError);
      saveSummary(summary, callback);
    });
  });
}

pipeline(101, (error, savedSummary) => {
  if (error) {
    console.error('pipeline failed:', error.message);
    return;
  }
  console.log('saved summary:', savedSummary);
});
