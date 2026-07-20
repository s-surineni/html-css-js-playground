expect(account.balance, 1300, 'state is available through the public getter');
expect(account._balance, undefined, 'closure state is not an object property');
const anotherAccount = createBankAccount('Ravi', 2000);
anotherAccount.withdraw(500);
expect(anotherAccount.balance, 1500, 'each factory call receives independent state');
expect(account.balance, 1300, 'another account does not affect the first');
