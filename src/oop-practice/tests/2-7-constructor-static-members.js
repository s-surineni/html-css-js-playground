expect(BankAccount.INTEREST_RATE, 0.03, 'constructor holds a static-like field');
expect(BankAccount.calculateMonthlyInterest(1200), 3, 'constructor holds a static-like method');
expect(BankAccount.accountCount, 2, 'constructor tracks shared state');
expect(primaryAccount.calculateMonthlyInterest, undefined, 'static method is absent from instances');
expect(savingsAccount.accountType, 'Savings', 'factory initializes the returned instance');
