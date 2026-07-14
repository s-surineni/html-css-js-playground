expect(account.getBalance(), 120, 'deposit and withdrawal update private balance');
account.deposit(-10);
account.deposit(NaN);
expect(account.getBalance(), 120, 'invalid deposits are rejected');
account.withdraw(-10);
expect(account.getBalance(), 120, 'negative withdrawal cannot increase balance');
expect(savings.getBalance(), 1050, 'subclass uses the parent public API');
let invalidInitialBalanceThrows = false;
try { new BankAccount(-1); } catch (error) { invalidInitialBalanceThrows = error instanceof RangeError; }
expect(invalidInitialBalanceThrows, true, 'invalid initial balance throws');
