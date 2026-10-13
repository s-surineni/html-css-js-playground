class BankAccount {
  // Instance field (not static): although declared in the class, every BankAccount
  // object gets its own separate `type` property with the value "account".
  type = 'account';
  #balance = 0;

  constructor(accountHolder, accountNumber) {
    this.accountHolder = accountHolder;
    this.accountNumber = accountNumber;
  }

  getHolderName() {
    return this.accountHolder;
  }

  getBalance() {
    return this.#balance;
  }

  deposit(amount) {
    this.#balance += amount;
  }
}

const alice = new BankAccount('Alice', 'ACC001');
const bob = new BankAccount('Bob', 'ACC002');

console.log('--- Class Fundamentals ---');
console.log(alice.getHolderName());
console.log('instance field is own:', Object.hasOwn(alice, 'type'));
console.log('method is own:', Object.hasOwn(alice, 'getHolderName'));
console.log('method shared:', alice.getHolderName === bob.getHolderName);
console.log('instanceof BankAccount:', alice instanceof BankAccount);
