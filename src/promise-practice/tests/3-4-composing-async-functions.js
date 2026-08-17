expect(pipelinePromise instanceof Promise, true, 'the composed pipeline returns a Promise');

return pipelinePromise.then((finalResult) => {
  expect(finalResult.orderId, 101, 'each async stage transforms the previous result');
  expect(finalResult.itemCount, 3, 'summary counts come from the loaded order items');
  expect(typeof finalResult.total, 'number', 'Needle-backed stages still produce a numeric total');
  expect(summaryStore.get(101), finalResult, 'the final stage persists the summary');
});
