// This object will act as the prototype (delegate) for other accounts.
const bankAccount = {
  owner: 'Bank customer',
  balance: 0,
  showBalance() {
    // `this` refers to the object that called the method, not necessarily
    // the object where the method was originally defined.
    return `${this.owner}'s balance is ₹${this.balance}`;
  },
};

// Create an empty object whose prototype is `bankAccount`.
const savingsAccount = Object.create(bankAccount);

// These assignments create own properties that shadow the prototype values.
savingsAccount.owner = 'Asha';
savingsAccount.balance = 5000;

console.log('--- Prototype Delegation ---');
// `showBalance` is not an own method, so JavaScript finds it on bankAccount.
console.log('account:', savingsAccount.showBalance());
// Both checks confirm that savingsAccount delegates to bankAccount.
console.log('prototype link:', Object.getPrototypeOf(savingsAccount) === bankAccount);
console.log('isPrototypeOf:', bankAccount.isPrototypeOf(savingsAccount));
// Object.hasOwn checks only the object itself, not its prototype chain.
console.log('own owner:', Object.hasOwn(savingsAccount, 'owner'));
console.log('own showBalance:', Object.hasOwn(savingsAccount, 'showBalance'));
// The `in` operator checks both own and inherited properties.
console.log('showBalance in chain:', 'showBalance' in savingsAccount);
// Delegation reuses the exact same function instead of copying it.
console.log('shared method:', savingsAccount.showBalance === bankAccount.showBalance);

// Deleting the own property reveals the inherited value "Bank customer".
delete savingsAccount.owner;
console.log('owner after delete:', savingsAccount.owner);
console.log('showBalance still works:', savingsAccount.showBalance());

// In contrast, a closure keeps `balance` private instead of storing it as an
// accessible object property.
function bankFun () {
    let balance = 100;

    // These inner functions retain access to `balance` after bankFun returns.
    function getBalance() {
        return balance;
    }

    function setBalance(val) {
        balance = val;
    }

    // Only these functions are exposed; `balance` cannot be accessed directly.
    return {
        getBalance,
        setBalance
    }
}

// Each call creates a new private `balance` and a pair of privileged methods.
const savings = bankFun()
console.log('ironman savings.getBalance()', JSON.stringify(savings.getBalance()));
console.log('ironman savings.setBalance(150', JSON.stringify(savings.setBalance(150)));
console.log('ironman savings.getBalance()', JSON.stringify(savings.getBalance()));
