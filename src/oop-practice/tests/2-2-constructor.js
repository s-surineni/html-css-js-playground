expect(p1.name, 'Reed van Richards', 'prototype setter preserves multi-word last name');
expect(p1.constructor, Person, 'constructor link is preserved');
const nameDescriptor = Object.getOwnPropertyDescriptor(Person.prototype, 'name');
expect(nameDescriptor.enumerable, false, 'prototype accessor is non-enumerable');
expect(typeof nameDescriptor.get, 'function', 'descriptor contains a getter');
