class BankAccount {
  #balance;

  constructor(owner, initialBalance) {
    this.owner = owner;
    this.#balance = initialBalance;
  }
  deposit(amount) {
    if (amount > 0) this.#balance += amount;
    return `+${amount}`;
  }
  withdraw(amount) {
    if (amount <= this.#balance) this.#balance -= amount;
    return `-${amount}`;
  }
  get balance() {
    return this.#balance;
  }
}
