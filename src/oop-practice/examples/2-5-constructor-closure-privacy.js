function BankAccount(initialBalance) {
  if (!Number.isFinite(initialBalance) || initialBalance < 0) {
    throw new RangeError('Initial balance must be non-negative');
  }

  let balance = initialBalance;

  this.deposit = function (amount) {
    if (!Number.isFinite(amount) || amount <= 0) return false;
    balance += amount;
    return true;
  };

  this.getBalance = function () {
    return balance;
  };
}

const account = new BankAccount(100);
account.deposit(50);
console.log('--- Constructor Closure Privacy ---');
console.log('balance through API:', account.getBalance());
console.log('balance property:', account.balance);
