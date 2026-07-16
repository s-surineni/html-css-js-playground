expect(tony.firstName, 'Tony', 'constructor initializes instance state');
expect(bruce.lastName, 'Banner', 'each call initializes a separate object');
expect(tony instanceof Person, true, 'new creates a Person instance');
expect(Object.getPrototypeOf(tony), Person.prototype, 'new links the prototype');
expect(tony.constructor, Person, 'prototype supplies the constructor link');
