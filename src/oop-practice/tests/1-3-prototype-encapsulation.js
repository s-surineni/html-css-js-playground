expect(c.value, 11, 'counter state is available through its getter');
expect(c.count, undefined, 'closure state is not an object property');
const anotherCounter = createCounter(2);
anotherCounter.decrement();
expect(anotherCounter.value, 1, 'each factory call has independent state');
expect(c.value, 11, 'another counter does not affect the first');
