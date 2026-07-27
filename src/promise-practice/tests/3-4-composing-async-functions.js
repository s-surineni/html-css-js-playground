expect(pipelinePromise instanceof Promise, true, 'the composed pipeline returns a Promise');

return pipelinePromise.then((finalResult) => {
  expect(
    finalResult,
    { orderId: 101, itemCount: 3, total: 55 },
    'each async stage transforms the previous result',
  );
  expect(summaryStore.get(101), finalResult, 'the final stage persists the summary');
});
