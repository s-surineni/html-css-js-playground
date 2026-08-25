class BankAccount {
    name;
    #balance;

    constructor(name, balance) {
        this.name = name;
        this.#balance = balance;
    }

    get balance() {
        return this.#balance;
    }
}

const b1 = new BankAccount('d1', 10000)
console.log(b1.name)
b1.balance = 200;
console.log(b1.balance)
