// A WeakMap to hold the private data for all BankAccount instances.
// Because it's outside the constructor and not exported, it remains completely private.
const privateBalances = new WeakMap();

function BankAccount(name, initBalance){
  this.name = name;
  // Use the specific object instance (`this`) as the key in the WeakMap
  privateBalances.set(this, initBalance);
}

// 1. Prototype Method (Shared across all instances, not copied!)
BankAccount.prototype.deposit = function(amount) {
  // Retrieve the private balance for THIS specific instance
  const currentBalance = privateBalances.get(this);
  // Update it
  privateBalances.set(this, currentBalance + amount);
};

// 2. Prototype Getter/Setter (Shared across all instances)
Object.defineProperty(BankAccount.prototype, 'balance', {
  get: function() {
    return privateBalances.get(this);
  },
  set: function(newBalance) {
    privateBalances.set(this, newBalance);
  }
});

// --- Testing it out ---

const b1 = new BankAccount('Alice', 1000);
const b2 = new BankAccount('Bob', 500);

console.log("Alice's initial balance:", b1.balance); // 1000
b1.deposit(1000);
console.log("Alice's balance after deposit:", b1.balance); // 2000

b1.balance = 5000;
console.log("Alice's balance after setter:", b1.balance); // 5000

console.log("Bob's independent balance:", b2.balance); // 500

// The ultimate test: Are the methods shared instead of copied?
console.log("\nAre deposit methods shared in memory?");
console.log(b1.deposit === b2.deposit); // true!
