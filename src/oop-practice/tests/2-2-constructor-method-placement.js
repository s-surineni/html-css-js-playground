expect(Object.hasOwn(tony, 'greet'), true, 'constructor method is an own property');
expect(Object.hasOwn(tony, 'getName'), false, 'prototype method is inherited');
expect(tony.greet === bruce.greet, false, 'instance method is recreated');
expect(tony.getName === bruce.getName, true, 'prototype method is shared');
expect(tony.getName(), 'Tony Stark', 'shared method reads receiver state');
