class BankAccount {
  #balance;
  constructor(name, balance) {
    this.name = name;
    this.#balance = balance;
  }

  get balance() {
    return this.#balance;
  }
}

const b1 = new BankAccount('dg', 2000)
console.log(b1.name)
console.log(b1.balance)