expect(Object.getPrototypeOf(savingsAccount), bankAccount, 'child delegates to bank account');
expect(bankAccount.isPrototypeOf(savingsAccount), true, 'bank account is in the prototype chain');
expect(Object.hasOwn(savingsAccount, 'showBalance'), false, 'method is inherited');
expect(savingsAccount.showBalance === bankAccount.showBalance, true, 'inherited method is shared');
expect(savingsAccount.owner, 'Bank customer', 'delete reveals the inherited value');
