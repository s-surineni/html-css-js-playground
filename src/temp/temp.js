// class BankAccount {
//   #balance
//   constructor(name, balance) {
//     this.name = name
//     this.#balance = balance
//   }
//   get balance() {
//     return this.#balance;
//   }
//     deposit(amount) {
//     this.#balance += amount;
//   }
// }
// const b1 = new BankAccount('dd', 1000)
// console.log(b1.balance)
// b1.deposit(1000)
// console.log(b1.balance)


function BankAccount(name, balance){
  this.name = name;
  this.balance = balance;

  this.deposit = function deposit(amount) {
    this.balance += amount;
  };
}

const b1 = new BankAccount('dd', 1000)
console.log(b1.balance)
b1.deposit(1000)
console.log(b1.balance)
