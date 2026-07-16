expect(account.getBalance(), 150, 'instance method closes over private state');
expect(account.balance, undefined, 'private state is not an instance property');
expect(account.deposit(-10), false, 'invalid amount is rejected');
const anotherAccount = new BankAccount(20);
expect(account.getBalance === anotherAccount.getBalance, false, 'closure methods are recreated');
expect(anotherAccount.getBalance(), 20, 'each instance has independent private state');
