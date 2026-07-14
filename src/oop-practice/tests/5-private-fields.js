const acct = new BankAccount('Alice', 1000);
expect(acct.balance, 1000, 'initial balance');
expect(acct.deposit(500), true, 'valid deposit succeeds');
expect(acct.balance, 1500, 'deposit(500) adds to balance');
expect(acct.withdraw(200), true, 'valid withdrawal succeeds');
expect(acct.balance, 1300, 'withdraw(200) subtracts from balance');
expect(acct.withdraw(99999), false, 'over-withdraw is rejected');
expect(acct.balance, 1300, 'over-withdraw is rejected');
expect(acct.withdraw(-100), false, 'negative withdrawal is rejected');
expect(acct.deposit(NaN), false, 'NaN deposit is rejected');
expect(acct.balance, 1300, 'invalid operations do not change balance');
let invalidInitialBalanceThrows = false;
try { new BankAccount('Bob', -1); } catch (error) { invalidInitialBalanceThrows = error instanceof RangeError; }
expect(invalidInitialBalanceThrows, true, 'negative initial balance throws');
