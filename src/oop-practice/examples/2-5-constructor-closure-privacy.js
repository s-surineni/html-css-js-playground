function BankAccount(name, balance) {
  this.name = name;

  // This variable is private because it belongs to the constructor's closure.
  // It is not stored as a property on the account object.
  let privateBalance = balance;

  this.getBalance = function () {
    return privateBalance;
  };

  this.deposit = function (amount) {
    if (amount > 0) {
      privateBalance += amount;
    }
  };

  this.withdraw = function (amount) {
    if (amount > 0 && amount <= privateBalance) {
      privateBalance -= amount;
    }
  };
}

const myAccount = new BankAccount('Mine', 500);
const dAccount = new BankAccount('Dol', 50000);

console.log('ironman myAccount.name', JSON.stringify(myAccount.name));
console.log('ironman myAccount.balance', JSON.stringify(myAccount.balance)); // undefined
console.log('ironman myAccount.getBalance()', JSON.stringify(myAccount.getBalance()));

myAccount.deposit(100);
console.log('ironman myAccount.getBalance()', JSON.stringify(myAccount.getBalance()));

myAccount.withdraw(200);
console.log('ironman myAccount.getBalance()', JSON.stringify(myAccount.getBalance()));

console.log('ironman dAccount.name', JSON.stringify(dAccount.name));
console.log('ironman dAccount.getBalance()', JSON.stringify(dAccount.getBalance()));
