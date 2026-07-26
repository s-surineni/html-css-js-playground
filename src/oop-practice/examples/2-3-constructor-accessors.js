function BankAccount(owner, balance = 0) {
  this.owner = owner;
  this.balance = balance;
}

Object.defineProperty(BankAccount.prototype, 'accountInfo', {
  get() {
    return `${this.owner}: $${this.balance}`;
  },
  set(value) {
    if (typeof value !== 'string') return;
    const match = value.match(/^(.+?):\s*\$?(\d+)$/);
    if (!match) return;
    this.owner = match[1];
    this.balance = Number(match[2]);
  },
  enumerable: false,
  configurable: true,
});

const ashaAccount = new BankAccount('Asha', 1000);
ashaAccount.accountInfo = 'Asha: $1500';
const descriptor = Object.getOwnPropertyDescriptor(BankAccount.prototype, 'accountInfo');

console.log('--- Constructor Prototype Accessor ---');
console.log('accountInfo:', ashaAccount.accountInfo);
console.log('own accessor:', Object.hasOwn(ashaAccount, 'accountInfo'));
console.log('enumerable:', descriptor.enumerable);
