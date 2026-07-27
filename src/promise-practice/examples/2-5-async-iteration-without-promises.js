const orderPages = new Map([
  [1, [{ id: 101 }, { id: 102 }]],
  [2, [{ id: 103 }]],
]);

function loadOrderPage(pageNumber, callback) {
  queueMicrotask(() => {
    callback(orderPages.get(pageNumber) ?? []);
  });
}

function processOrderPages(pageNumber = 1) {
  loadOrderPage(pageNumber, (page) => {
    if (page.length === 0) return;
    console.log('loaded page:', page.map(({ id }) => id));
    processOrderPages(pageNumber + 1);
  });
}

processOrderPages();
