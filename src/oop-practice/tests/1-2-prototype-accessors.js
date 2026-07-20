expect(savingsAccount.balance, '₹7500', 'inherited setter updates the receiver');
expect(bankAccount.balance, '₹0', 'child update leaves the prototype unchanged');
expect(Object.hasOwn(savingsAccount, 'balance'), false, 'accessor remains inherited');
savingsAccount.balance = -100;
expect(savingsAccount.balance, '₹7500', 'invalid balance is rejected');
