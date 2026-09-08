function BankAccount (name, balance) {
  this.name = name;
  this.balance = balance;
}

const b1 = new BankAccount('dd', 20000)
console.log(b1.balance)
console.log(b1.name)