// Private variables in constructor functions using closures
function BankAccount(initialBalance) {
  // Private variable - only accessible within this constructor scope
  let balance = initialBalance;

  // Private method - not accessible from outside
  function validateAmount(amount) {
    return amount > 0;
  }

  // Public method - has access to private variables via closure
  this.deposit = function(amount) {
    if (validateAmount(amount)) {
      balance += amount;
      return `Deposited $${amount}. New balance: $${balance}`;
    }
    return 'Invalid deposit amount';
  };

  this.withdraw = function(amount) {
    if (validateAmount(amount) && amount <= balance) {
      balance -= amount;
      return `Withdrew $${amount}. New balance: $${balance}`;
    }
    return 'Invalid withdrawal amount or insufficient funds';
  };

  // Getter method for balance (read-only access to private variable)
  this.getBalance = function() {
    return balance;
  };
}

const account = new BankAccount(100);
console.log(account.getBalance()); // 100
console.log(account.deposit(50)); // Deposited $50. New balance: $150
console.log(account.withdraw(30)); // Withdrew $30. New balance: $120

// These won't work - balance and validateAmount are private:
console.log(account.balance); // undefined
console.log(account.validateAmount); // undefined
