function BankAccount(accountType = 'Checking') {
  this.accountType = accountType;
  BankAccount.accountCount++;
}

BankAccount.INTEREST_RATE = 0.03;
BankAccount.accountCount = 0;

BankAccount.create = function (accountType) {
  return new this(accountType);
};

BankAccount.calculateMonthlyInterest = function (balance) {
  return balance * this.INTEREST_RATE / 12;
};

const primaryAccount = BankAccount.create('Checking');
const savingsAccount = BankAccount.create('Savings');

console.log('--- Constructor Static Members ---');
console.log('field:', BankAccount.INTEREST_RATE);
console.log('method:', BankAccount.calculateMonthlyInterest(1000));
console.log('accounts:', BankAccount.accountCount);
console.log('static method on instance:', primaryAccount.calculateMonthlyInterest);