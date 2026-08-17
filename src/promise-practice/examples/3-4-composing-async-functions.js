import { resolveSoonWithPromise } from './needle-utils.js';

const summaryStore = new Map();

function loadOrder(orderId) {
  return resolveSoonWithPromise().then((joke) => ({
    id: orderId,
    items: [
      { price: joke.setup.length, quantity: 2 },
      { price: joke.punchline.length, quantity: 1 },
    ],
  }));
}

function calculateSummary(order) {
  return resolveSoonWithPromise().then(() => ({
    orderId: order.id,
    itemCount: order.items.reduce((count, item) => count + item.quantity, 0),
    total: order.items.reduce((total, item) => total + item.price * item.quantity, 0),
  }));
}

function saveSummary(summary) {
  return resolveSoonWithPromise().then(() => {
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
