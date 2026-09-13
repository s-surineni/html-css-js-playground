function BankAccount(name, initBalance){
  this.name = name;
  let balance = initBalance;

//   To avoid creating a new copy of the deposit method for every object, the method needs to be added to the prototype (BankAccount.prototype).
// However, we run into a classic JavaScript dilemma here: Methods on the prototype cannot access private variables created with closures (like our let balance inside the constructor). 
  this.deposit = function deposit(amount) {
    balance += amount;
  };

  Object.defineProperty(this, 'balance', {
    get: function() {
      return balance;
    },
    set: function(newBalance) {
      balance = newBalance;
    }
  });
}

const b1 = new BankAccount('dd', 1000)
console.log(b1.balance)
b1.deposit(1000)
console.log(b1.balance)

// Using the new setter!
b1.balance = 5000;
console.log(b1.balance)
