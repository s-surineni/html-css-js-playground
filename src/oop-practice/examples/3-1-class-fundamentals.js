class BankAccount {
  type = 'account';

  constructor(accountHolder, accountNumber) {
    this.accountHolder = accountHolder;
    this.accountNumber = accountNumber;
  }

  getHolderName() {
    return this.accountHolder;
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
