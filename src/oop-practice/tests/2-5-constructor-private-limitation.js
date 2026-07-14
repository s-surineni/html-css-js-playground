expect(c1.increment(), 7, 'instance method retains closure access');
expect(c2.getValue(), 6, 'prototype method reads public conventional field');
const c3 = new BetterCounter(0);
expect(c2.increment === c3.increment, true, 'prototype method is shared');
expect(Object.hasOwn(c2, '_count'), true, 'underscore field is still public');
