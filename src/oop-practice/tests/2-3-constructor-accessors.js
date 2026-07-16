expect(person.name, 'Reed van Richards', 'setter preserves a multi-word last name');
expect(Object.hasOwn(person, 'name'), false, 'accessor is inherited');
expect(descriptor.enumerable, false, 'descriptor makes accessor non-enumerable');
expect(typeof descriptor.get, 'function', 'descriptor contains a getter');
expect(person.constructor, Person, 'prototype constructor link remains intact');
