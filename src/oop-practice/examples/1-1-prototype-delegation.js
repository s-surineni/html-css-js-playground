const bankAccount = {
  owner: 'Bank customer',
  balance: 0,
  showBalance() {
    return `${this.owner}'s balance is ₹${this.balance}`;
  },
};

// Choose the prototype when creating the child object.
const savingsAccount = Object.create(bankAccount);
// see how object is initialzed after creation 
savingsAccount.owner = 'Asha';
savingsAccount.balance = 5000;

console.log('--- Prototype Delegation ---');
console.log('account:', savingsAccount.showBalance());
console.log('prototype link:', Object.getPrototypeOf(savingsAccount) === bankAccount);
console.log('isPrototypeOf:', bankAccount.isPrototypeOf(savingsAccount));
console.log('own owner:', Object.hasOwn(savingsAccount, 'owner'));
console.log('own showBalance:', Object.hasOwn(savingsAccount, 'showBalance'));
// checking up the prototype chin for membership too
console.log('showBalance in chain:', 'showBalance' in savingsAccount);
console.log('shared method:', savingsAccount.showBalance === bankAccount.showBalance);

// Deleting an own property reveals the inherited value.
delete savingsAccount.owner;
console.log('owner after delete:', savingsAccount.owner);
console.log('showBalance still works:', savingsAccount.showBalance());
