import { resolveSoon } from './needle-utils.js';

const summaryStore = new Map();

function loadOrder(orderId, callback) {
  resolveSoon((error, joke) => {
    if (error) {
      callback(error);
      return;
    }
    callback(null, {
      id: orderId,
      items: [
        { price: joke.setup.length, quantity: 2 },
        { price: joke.punchline.length, quantity: 1 },
      ],
    });
  });
}

function calculateSummary(order, callback) {
  resolveSoon((error) => {
    if (error) {
      callback(error);
      return;
    }
    callback(null, {
      orderId: order.id,
      itemCount: order.items.reduce((count, item) => count + item.quantity, 0),
      total: order.items.reduce((total, item) => total + item.price * item.quantity, 0),
    });
  });
}

function saveSummary(summary, callback) {
  resolveSoon((error) => {
    if (error) {
      callback(error);
      return;
    }
    summaryStore.set(summary.orderId, summary);
    callback(null, summary);
  });
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
