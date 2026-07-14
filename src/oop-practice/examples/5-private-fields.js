class BankAccount {
  #balance;

  constructor(owner, initialBalance) {
    if (!BankAccount.#isValidAmount(initialBalance, true)) {
      throw new RangeError('Initial balance must be a finite non-negative number');
    }
    this.owner = owner;
    this.#balance = initialBalance;
  }

  static #isValidAmount(amount, allowZero = false) {
    return Number.isFinite(amount) && (allowZero ? amount >= 0 : amount > 0);
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
