const bankAccount = {
  owner: 'Bank customer',
  balance: 0,
  getBalance() {
    return `₹${this.balance}`;
  },
  describe() {
    return `${this.owner}'s account balance is ${this.getBalance()}`;
  },
};

const savingsAccount = Object.create(bankAccount);
savingsAccount.owner = 'Asha';
savingsAccount.balance = 5000;
savingsAccount.interestRate = 5;

savingsAccount.describe = function () {
  return `${this.owner}'s savings balance is ${this.getBalance()} (${this.interestRate}% interest)`;
};

console.log('--- Method Overriding ---');
console.log(savingsAccount.describe());
console.log('own override:', Object.hasOwn(savingsAccount, 'describe'));

delete savingsAccount.describe;
console.log('inherited after delete:', savingsAccount.describe());
