const bankAccount = {
  _balance: 0,

  get balance() {
    return `₹${this._balance}`;
  },

  set balance(amount) {
    if (typeof amount !== 'number' || amount < 0) return;
    this._balance = amount;
  },
};

const savingsAccount = Object.create(bankAccount);
savingsAccount.owner = 'Asha';
savingsAccount._balance = 5000;

console.log('--- Inherited Accessors ---');
console.log('before:', savingsAccount.balance);
savingsAccount.balance = 7500;
console.log('after:', savingsAccount.balance);
console.log('prototype unchanged:', bankAccount.balance);
console.log('accessor remains inherited:', Object.hasOwn(savingsAccount, 'balance'));
