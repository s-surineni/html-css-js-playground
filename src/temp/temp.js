const bank = {
    name: 'Tree',
    balance: 100,
    getBalance () {
        // console.log(this.balance)
        return this.balance
    }
    
}
const car = {balance: 50}
car.getBalance = bank.getBalance
console.log('ironman bank.getBalance()', JSON.stringify(bank.getBalance()));
console.log('ironman car.getBalance()', JSON.stringify(car.getBalance()));

function bankFun () {
    let balance = 100;
    function getBalance() {
        return balance;
    }

    function setBalance(val) {
        balance = val;
    }

    return {
        getBalance,
        setBalance
    }
}
const savings = bankFun()
console.log('ironman savings.getBalance()', JSON.stringify(savings.getBalance()));
console.log('ironman savings.setBalance(150', JSON.stringify(savings.setBalance(150)));
console.log('ironman savings.getBalance()', JSON.stringify(savings.getBalance()));
