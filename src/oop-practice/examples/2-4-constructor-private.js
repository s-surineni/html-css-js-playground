// Private variables in constructor functions using closures
function BankAccount(initialBalance) {
  if (!Number.isFinite(initialBalance) || initialBalance < 0) {
    throw new RangeError('Initial balance must be a finite non-negative number');
  }

  // Private variable - only accessible within this constructor scope
  let balance = initialBalance;

  // Private method - not accessible from outside
  function validateAmount(amount) {
    return Number.isFinite(amount) && amount > 0;
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

// ============================================
// Extending with another constructor function
// ============================================

function SavingsAccount(initialBalance, interestRate) {
  if (!Number.isFinite(interestRate) || interestRate < 0) {
    throw new RangeError('Interest rate must be a finite non-negative number');
  }

  // Call parent constructor
  BankAccount.call(this, initialBalance);

  let rate = interestRate; // Private to SavingsAccount

  // Can access public methods from BankAccount
  this.addInterest = function() {
    const currentBalance = this.getBalance(); // ✅ Works - getBalance is public
    const interest = currentBalance * rate;
    return this.deposit(interest); // ✅ Works - deposit is public
  };

  // CANNOT access private variables from BankAccount
  this.hackBalance = function() {
    // return balance; // ❌ ReferenceError - balance is not accessible
    // validateAmount(100); // ❌ ReferenceError - validateAmount is not accessible
    return "Cannot access parent's private variables!";
  };
}

// Set up prototype inheritance
SavingsAccount.prototype = Object.create(BankAccount.prototype);
SavingsAccount.prototype.constructor = SavingsAccount;

const savings = new SavingsAccount(1000, 0.05);
console.log(savings.getBalance()); // 1000
console.log(savings.addInterest()); // Deposited $50. New balance: $1050
console.log(savings.hackBalance()); // Cannot access parent's private variables!
