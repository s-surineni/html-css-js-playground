function createBankAccount() {
  let balance = 0;
  let ownerName;

  return {
    setName(name) {
      ownerName = name;
    },
    deposit(amount) {
      if (amount > 0) balance += amount;
      return balance;
    },
    withdraw(amount) {
      if (amount > 0 && amount <= balance) balance -= amount;
      return balance;
    },
    get balance() {
      return balance;
    },
    getName() {
      return ownerName;
    },
    set name(name) {
      ownerName = name;
    },
    get name(){
      return ownerName;
    }
  };
}

console.log('--- Factory Function with Closure Privacy ---');
const accountTemplate = createBankAccount();

const dAccount = Object.create(accountTemplate)
dAccount.setName("Dolphin")
dAccount.deposit(500)

console.log('ironman dAccount.getName()', JSON.stringify(dAccount.getName()));
const dAccount2 = Object.create(accountTemplate)
dAccount2.name = "Dhruv"
console.log('ironman dAccount2.name', JSON.stringify(dAccount2.name));
