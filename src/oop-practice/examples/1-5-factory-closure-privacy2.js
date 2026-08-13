function createBankAccount() {
  // These variables are private because they live in this function's lexical
  // scope. They are not properties and are not stored on a prototype.
  let balance = 0;
  let ownerName;

  // Methods that reference balance or ownerName form closures over that private
  // state. They access it through lexical scope, not through the prototype chain.
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
    // set name(name) {
    //   ownerName = name;
    // },
    // Unlike getName(), this getter uses `this`, so it reads a public object
    // property through normal own-property/prototype-chain lookup.
    get name(){
      return this.ownerName;
    }
  };
}

console.log('--- Factory Function with Closure Privacy ---');
// Calling the factory once creates one private closure shared by these methods.
const accountTemplate = createBankAccount();

// Object.create uses the prototype chain only to inherit properties and methods.
// It does not create a new closure or a new balance/ownerName for the child.
const dAccount = Object.create(accountTemplate)
// The inherited method still updates accountTemplate's original private closure.
dAccount.setName("Dolphin")
dAccount.deposit(500)

console.log('ironman dAccount.getName()', JSON.stringify(dAccount.getName()));
// This child inherits the same methods. Closure-based methods such as getName()
// still access the shared closure created for accountTemplate.
const dAccount2 = Object.create(accountTemplate)
// This creates a public own property. It does not update the private ownerName,
// but the inherited `name` getter finds it through `this` (dAccount2).
dAccount2.ownerName = "Dhruv"
console.log('ironman dAccount2.name', JSON.stringify(dAccount2.name));
console.log('ironman dAccount.name', JSON.stringify(dAccount.name));
