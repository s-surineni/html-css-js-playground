const bankAccount = {
  owner: 'Bank customer',
  balance: 0,
  showBalance() {
    return `${this.owner}'s balance is ₹${this.balance}`;
  },
};

// Choose the prototype when creating the child object.
const savingsAccount = Object.create(bankAccount);
savingsAccount.owner = 'Asha';
savingsAccount.balance = 5000;

console.log('--- Prototype Delegation ---');
console.log('account:', savingsAccount.showBalance());
console.log('prototype link:', Object.getPrototypeOf(savingsAccount) === bankAccount);
console.log('own owner:', Object.hasOwn(savingsAccount, 'owner'));
console.log('own showBalance:', Object.hasOwn(savingsAccount, 'showBalance'));
console.log('showBalance found in chain:', 'showBalance' in savingsAccount);

// Deleting an own property reveals the inherited value.
delete savingsAccount.owner;
console.log('owner after delete:', savingsAccount.owner);
