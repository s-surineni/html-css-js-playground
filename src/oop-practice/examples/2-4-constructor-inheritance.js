function BankAccount(owner, balance = 0) {
  this.owner = owner;
  this.balance = balance;
}

BankAccount.prototype.getSummary = function () {
  return `${this.owner}: $${this.balance}`;
};

function SavingsAccount(owner, balance = 0, interestRate = 0.01) {
  BankAccount.call(this, owner, balance);
  this.interestRate = interestRate;
}

SavingsAccount.prototype = Object.create(BankAccount.prototype);
Object.defineProperty(SavingsAccount.prototype, 'constructor', {
  value: SavingsAccount,
  writable: true,
  configurable: true,
});

SavingsAccount.prototype.getAccountInfo = function () {
  return `${this.getSummary()} at ${this.interestRate * 100}% interest`;
};

const ashaSavings = new SavingsAccount('Asha', 1000, 0.02);
console.log('--- Constructor Inheritance ---');
console.log(ashaSavings.getAccountInfo());
console.log('SavingsAccount instance:', ashaSavings instanceof SavingsAccount);
console.log('BankAccount instance:', ashaSavings instanceof BankAccount);
