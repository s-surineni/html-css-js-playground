expect(pipelinePromise instanceof Promise, true, 'the composed pipeline returns a Promise');

return pipelinePromise.then((finalResult) => {
  expect(finalResult, 'HELLO WORLD', 'each async stage transforms the previous result');
});
