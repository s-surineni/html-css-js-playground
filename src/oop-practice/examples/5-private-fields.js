class BankAccount {
  static #nextAccountId = 1;
  #balance;

  constructor(owner, initialBalance) {
    if (!BankAccount.#isValidAmount(initialBalance, true)) {
      throw new RangeError('Initial balance must be a finite non-negative number');
    }
    this.id = BankAccount.#nextAccountId++;
    this.owner = owner;
    this.#balance = initialBalance;
  }

  static #isValidAmount(amount, allowZero = false) {
    return Number.isFinite(amount) && (allowZero ? amount >= 0 : amount > 0);
  }

  static get accountsCreated() {
    return BankAccount.#nextAccountId - 1;
  }

  deposit(amount) {
    if (!BankAccount.#isValidAmount(amount)) return false;
    this.#balance += amount;
    return true;
  }
  withdraw(amount) {
    if (!BankAccount.#isValidAmount(amount) || amount > this.#balance) return false;
    this.#balance -= amount;
    return true;
  }
  get balance() {
    return this.#balance;
  }
}

console.log('--- Private Instance and Static Fields ---');
const acct = new BankAccount('Alice', 1000);
const savings = new BankAccount('Bob', 500);
console.log('account IDs:', acct.id, savings.id);
console.log('accounts created:', BankAccount.accountsCreated);
console.log('public owner:', acct.owner);
console.log('private balance through getter:', acct.balance);
console.log('private field exposed publicly:', Object.hasOwn(acct, '#balance'));
