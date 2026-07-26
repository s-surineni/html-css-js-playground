expect(alice.getHolderName(), 'Alice', 'class method reads instance state');
expect(Object.hasOwn(alice, 'type'), true, 'public instance field is own');
expect(Object.hasOwn(alice, 'getHolderName'), false, 'class method is inherited');
expect(alice.getHolderName === bob.getHolderName, true, 'class method is shared');
expect(alice instanceof BankAccount, true, 'new creates a class instance');
expect(Object.getPrototypeOf(alice), BankAccount.prototype, 'instance links to class prototype');
expect(
  Object.prototype.propertyIsEnumerable.call(BankAccount.prototype, 'getHolderName'),
  false,
  'class methods are non-enumerable',
);
