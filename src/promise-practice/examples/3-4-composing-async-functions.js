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

function runInRepository(operation) {
  return new Promise((resolve, reject) => {
    queueMicrotask(() => {
      try {
        resolve(operation());
      } catch (error) {
        reject(error);
      }
    });
  });
}

function loadOrder(orderId) {
  return runInRepository(() => {
    const order = orderStore.get(orderId);
    if (!order) throw new Error(`Order ${orderId} not found`);
    return order;
  });
}

function calculateSummary(order) {
  return runInRepository(() => ({
    orderId: order.id,
    itemCount: order.items.reduce((count, item) => count + item.quantity, 0),
    total: order.items.reduce((total, item) => total + item.price * item.quantity, 0),
  }));
}

function saveSummary(summary) {
  return runInRepository(() => {
    summaryStore.set(summary.orderId, summary);
    return summary;
  });
}

async function pipeline(orderId) {
  const order = await loadOrder(orderId);
  const summary = await calculateSummary(order);
  const savedSummary = await saveSummary(summary);
  console.log('saved summary:', savedSummary);
  return savedSummary;
}

const pipelinePromise = pipeline(101);
