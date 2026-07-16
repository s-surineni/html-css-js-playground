expect(counter.value, 11, 'state is available through the public getter');
expect(counter.count, undefined, 'closure state is not an object property');
const anotherCounter = createCounter(2);
anotherCounter.decrement();
expect(anotherCounter.value, 1, 'each factory call receives independent state');
expect(counter.value, 11, 'another counter does not affect the first');
