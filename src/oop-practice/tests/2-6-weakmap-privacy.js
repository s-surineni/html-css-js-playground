expect(firstCounter.getValue(), 6, 'prototype method reads private WeakMap state');
expect(secondCounter.getValue(), 10, 'instances keep independent private state');
expect(firstCounter.count, undefined, 'state is not an instance property');
expect(firstCounter.increment === secondCounter.increment, true, 'prototype method is shared');
expect(Object.hasOwn(firstCounter, 'increment'), false, 'shared method is inherited');
