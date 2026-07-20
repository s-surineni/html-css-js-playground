expect(ashaAccount.owner, 'Asha', 'constructor initializes instance state');
expect(raviAccount.balance, 2500, 'each call initializes a separate object');
expect(ashaAccount instanceof BankAccount, true, 'new creates a BankAccount instance');
expect(Object.getPrototypeOf(ashaAccount), BankAccount.prototype, 'new links the prototype');
expect(ashaAccount.constructor, BankAccount, 'prototype supplies the constructor link');
