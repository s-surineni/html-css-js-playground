const orderPages = new Map([
  [1, [{ id: 101 }, { id: 102 }]],
  [2, [{ id: 103 }]],
]);

function loadOrderPage(pageNumber) {
  return new Promise((resolve) => {
    queueMicrotask(() => {
      resolve(orderPages.get(pageNumber) ?? []);
    });
  });
}

async function* fetchOrderPages() {
  for (let pageNumber = 1; ; pageNumber++) {
    const orders = await loadOrderPage(pageNumber);
    if (orders.length === 0) return;
    yield orders;
  }
}

async function main() {
  const allOrders = [];
  for await (const page of fetchOrderPages()) {
    allOrders.push(...page);
    console.log('loaded page:', page.map(({ id }) => id));
  }
  return allOrders;
}

const iterationPromise = main();
