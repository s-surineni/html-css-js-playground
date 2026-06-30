const acct = new BankAccount('Alice', 1000);
expect(acct.balance, 1000, 'initial balance');
acct.deposit(500);
expect(acct.balance, 1500, 'deposit(500) adds to balance');
acct.withdraw(200);
expect(acct.balance, 1300, 'withdraw(200) subtracts from balance');
acct.withdraw(99999);
expect(acct.balance, 1300, 'over-withdraw is rejected');
