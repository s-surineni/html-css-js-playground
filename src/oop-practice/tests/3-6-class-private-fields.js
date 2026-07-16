expect(checking.balance, 1000, 'getter exposes selected private instance state');
expect(checking.deposit(500), true, 'method updates private instance state');
expect(checking.balance, 1500, 'private balance is updated');
expect(checking.id, 1, 'private static counter generates first ID');
expect(savings.id, 2, 'private static counter is shared');
expect(BankAccount.accountsCreated, 2, 'static getter exposes derived shared state');
expect(Object.hasOwn(checking, '#balance'), false, 'private field is not a public property');
expect(Object.hasOwn(BankAccount, '#nextId'), false, 'private static field is not public');
