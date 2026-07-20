function createBankAccount(owner, initialBalance = 0) {
  let balance = initialBalance;

  return {
    owner,
    deposit(amount) {
      if (amount > 0) balance += amount;
      return balance;
    },
    withdraw(amount) {
      if (amount > 0 && amount <= balance) balance -= amount;
      return balance;
    },
    get balance() {
      return balance;
    },
  };
}

console.log('--- Factory Function with Closure Privacy ---');
const account = createBankAccount('Asha', 1000);
console.log('deposit:', account.deposit(500));
console.log('withdraw:', account.withdraw(200));
console.log('public balance:', account.balance);
console.log('private property:', account._balance);
