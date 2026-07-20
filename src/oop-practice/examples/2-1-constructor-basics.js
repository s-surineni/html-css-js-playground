function BankAccount(owner, balance = 0) {
  this.owner = owner;
  this.balance = balance;
}

console.log('--- Constructor Basics ---');
const ashaAccount = new BankAccount('Asha', 1000);
const raviAccount = new BankAccount('Ravi', 2500);
console.log(ashaAccount.owner, ashaAccount.balance);
console.log('instanceof BankAccount:', ashaAccount instanceof BankAccount);
console.log('prototype link:', Object.getPrototypeOf(ashaAccount) === BankAccount.prototype);
console.log('constructor link:', ashaAccount.constructor === BankAccount);
