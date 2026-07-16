expect(acct.balance, 1000, 'initial balance');
expect(acct.id, 1, 'private static counter generates the first account ID');
expect(savings.id, 2, 'private static counter is shared across instances');
expect(BankAccount.accountsCreated, 2, 'static getter exposes derived shared state');
expect(Object.hasOwn(acct, '#balance'), false, 'private instance field is not public');
expect(
  Object.hasOwn(BankAccount, '#nextAccountId'),
  false,
  'private static field is not public',
);
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
expect(BankAccount.accountsCreated, 2, 'failed construction does not increment the counter');
