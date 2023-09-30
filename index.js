let balance = 500.00;

class Transaction {
    constructor(amount, account){
        this.amount = amount;
        this.account = account;
    }

    commit() {
        if (!this.isAllowed()) return false;
        this.time = new Date();
        this.account.addTransaction(this);
        return true;
    }
};

class Deposit extends Transaction {
    get value() {
        return this.amount;
    }

    isAllowed() {
        return true;
    }
};

class Withdrawal extends Transaction {
    get value() {
        return -this.amount;
    }

    isAllowed() {
        return (this.account.balance - this.amount >= 0);
    }
};

class Account {
    constructor(username) {
        this.username = username;
        this.transactions = [];
    }

    get balance() {
        for (let t of this.transactions) {
            balance += t.value;
        }
        return balance;
    }

    addTransaction(transaction) {
        this.transactions.push(transaction);
    }
}


// DRIVER CODE BELOW
// We use the code below to "drive" the application logic above and make sure it's working as expected

const myAccount = new Account("snow-patrol");
console.log('Starting Account balance: ', myAccount.balance);
console.log('----');

t1 = new Deposit(120.00, myAccount);
console.log('Commit Result', t1.commit());
console.log('Deposited: ', t1.amount);
console.log('Account balance: ', myAccount.balance);
console.log('----');

t2 = new Withdrawal(9.99, myAccount);
console.log('Commit result:', t2.commit());
console.log('Withdrew: ', t2.amount);
console.log('Account balance: ', myAccount.balance);
console.log('----');


t3 = new Deposit(1980, myAccount);
console.log('Commit Result', t3.commit());
console.log('Deposited: ', t3.amount);
console.log('Account balance: ', myAccount.balance);
console.log('----');
