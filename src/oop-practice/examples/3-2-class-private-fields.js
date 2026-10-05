class BankAccount {
  static #nextId = 1;
  #balance;

  constructor(owner, initialBalance) {
    if (!BankAccount.#isValidAmount(initialBalance, true)) {
      throw new RangeError('Invalid initial balance');
    }
    this.id = BankAccount.#nextId++;
    this.owner = owner;
    this.#balance = initialBalance;
  }

  static #isValidAmount(amount, allowZero = false) {
    return Number.isFinite(amount) && (allowZero ? amount >= 0 : amount > 0);
  }

  static get accountsCreated() {
    return BankAccount.#nextId - 1;
  }

  deposit(amount) {
    if (!BankAccount.#isValidAmount(amount)) return false;
    this.#balance += amount;
    return true;
  }

  get balance() {
    return this.#balance;
  }
}

const checking = new BankAccount('Alice', 1000);
const savings = new BankAccount('Bob', 500);
console.log('--- Private Instance and Static Fields ---');
console.log('balance:', checking.balance);
console.log('account IDs:', checking.id, savings.id);
console.log('accounts created:', BankAccount.accountsCreated);
