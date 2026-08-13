class BankAccount {
    constructor(name, balance) {
        this.name = name
        this.balance = balance
    }

     getBalance() {
        return this.balance
    }

    deposit(amount) {
        this.balance += amount;
    }

    withdraw(amount) {
        this.balance -= amount
    }
}

const myAccount = new BankAccount('Mine', 500);
const dAccount = new BankAccount('Dol', 50000);

console.log('ironman myAccount.name', JSON.stringify(myAccount.name));
console.log('ironman myAccount.balance', JSON.stringify(myAccount.balance)); // undefined
myAccount.balance = 100;
console.log('ironman myAccount.getBalance()', JSON.stringify(myAccount.getBalance()));

myAccount.deposit(100);
console.log('ironman myAccount.getBalance()', JSON.stringify(myAccount.getBalance()));

myAccount.withdraw(200);
console.log('ironman myAccount.getBalance()', JSON.stringify(myAccount.getBalance()));

console.log('ironman dAccount.name', JSON.stringify(dAccount.name));
console.log('ironman dAccount.getBalance()', JSON.stringify(dAccount.getBalance()));