expect(tony.getName(), 'Tony Stark', 'class method reads instance state');
expect(Object.hasOwn(tony, 'role'), true, 'public instance field is own');
expect(Object.hasOwn(tony, 'getName'), false, 'class method is inherited');
expect(tony.getName === bruce.getName, true, 'class method is shared');
expect(tony instanceof Person, true, 'new creates a class instance');
expect(Object.getPrototypeOf(tony), Person.prototype, 'instance links to class prototype');
expect(
  Object.prototype.propertyIsEnumerable.call(Person.prototype, 'getName'),
  false,
  'class methods are non-enumerable',
);
