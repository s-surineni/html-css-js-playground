const bankAccount = {
  // Every account exposes the same operation. Child objects can override it.
  calculateMonthlyFee() {
    return 0;
  },

  // This shared method dynamically calls the implementation belonging to
  // the object that receives the call (`checkingAccount` or `savingsAccount`).
  describe() {
    return `${this.owner}'s ${this.type} account: ₹${this.balance} balance, ₹${this.calculateMonthlyFee()} monthly fee`;
  },
};

const checkingAccount = Object.create(bankAccount);
checkingAccount.owner = 'Asha';
checkingAccount.type = 'checking';
checkingAccount.balance = 5000;
// Checking accounts provide their own implementation of the shared operation.
checkingAccount.calculateMonthlyFee = function () {
  return 100;
};

const savingsAccount = Object.create(bankAccount);
savingsAccount.owner = 'Ravi';
savingsAccount.type = 'savings';
savingsAccount.balance = 10000;
// Savings accounts provide a different implementation of the same operation.
savingsAccount.calculateMonthlyFee = function () {
  return this.balance < 5000 ? 50 : 0;
};

console.log('--- Prototype Polymorphism ---');
const accounts = [checkingAccount, savingsAccount];

// Polymorphism: treat every account uniformly while JavaScript dynamically
// selects the correct `calculateMonthlyFee` implementation for each object.
for (const account of accounts) {
  console.log(account.describe());
}
