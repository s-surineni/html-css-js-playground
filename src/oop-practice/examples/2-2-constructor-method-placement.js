function BankAccount(owner, balance = 0) {
  this.owner = owner;
  this.balance = balance;

  // Intentionally recreated for every instance.
  this.deposit = function (amount) {
    this.balance += amount;
    return this.balance;
  };
}

// Created once and shared through BankAccount.prototype.
BankAccount.prototype.getSummary = function () {
  return `${this.owner}: $${this.balance}`;
};

const ashaAccount = new BankAccount('Asha', 1000);
const raviAccount = new BankAccount('Ravi', 2500);

console.log('--- Instance vs Prototype Methods ---');
console.log('own deposit:', Object.hasOwn(ashaAccount, 'deposit'));
console.log('own getSummary:', Object.hasOwn(ashaAccount, 'getSummary'));
console.log('deposit shared:', ashaAccount.deposit === raviAccount.deposit);
console.log('getSummary shared:', ashaAccount.getSummary === raviAccount.getSummary);
