class Bank {
  #balance
  constructor(name, balance) {
    this.name = name
    this.#balance = balance
  }

  get balance() {
    return this.#balance
  }
}

const b1 = new Bank('v', 20000)
const b2 = new Bank('v2', 30000)
console.log(b1.balance)
console.log(b2.balance)
