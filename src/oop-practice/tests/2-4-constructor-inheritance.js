expect(ashaSavings.getAccountInfo(), 'Asha: $1000 at 2% interest', 'child combines inherited and own behavior');
expect(ashaSavings instanceof SavingsAccount, true, 'instance uses child prototype');
expect(ashaSavings instanceof BankAccount, true, 'parent prototype is also in the chain');
expect(ashaSavings.constructor, SavingsAccount, 'child constructor link is restored');
expect(Object.getPrototypeOf(SavingsAccount.prototype), BankAccount.prototype, 'prototype chains are linked');
