expect(p1 instanceof Person, true, 'new links the instance to Person.prototype');
expect(Object.getPrototypeOf(p1), Person.prototype, 'prototype link is inspectable');
expect(Person.prototype.constructor, Person, 'prototype keeps its constructor link');
expect(
  Object.getPrototypeOf(Person.prototype),
  Object.prototype,
  'Person.prototype inherits from Object.prototype',
);
expect(Object.hasOwn(p1, 'firstName'), true, 'constructor state is an own property');
expect(Object.hasOwn(p1, 'greet'), true, 'constructor method is an own property');
expect(Object.hasOwn(p1, 'getName'), false, 'prototype method is inherited');
expect(p1.getName === p2.getName, true, 'prototype method is shared');
expect(p1.greet === p2.greet, false, 'instance method is allocated per object');
expect(manualPerson instanceof Person, true, 'manual steps reproduce the prototype link');
expect(manualPerson.getName(), 'Natasha Romanoff', 'manual construction initializes state');
expect(p3 instanceof Person, true, 'constructor guard handles a call without new');
expect(p3.getName(), 'Peter Parker', 'guarded call initializes the returned instance');
