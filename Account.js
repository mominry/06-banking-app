const Passbook = require("./Passbook")
const Transaction = require("./Transaction")

class Accounts
{
    static ID=0
    constructor()
    {
        this.id=Accounts.ID++
        this.passbook=new Passbook()
        this.balance=0
    }

    deposit(money)
    {
        let transactionObj=new Transaction(new Date(),"debit",money,this.balance+money)
        this.balance=this.balance+money
        this.passbook.transactions.push(transactionObj)
        console.log("executed deposit");
    }

    withdraw(money)
    {
        let transactionObj=new Transaction(new Date(),"credit",money,this.balance-money)
        this.passbook.transactions.push(transactionObj)
        return transactionObj.balance
    }

    getBalance()
    {
       // return this.passbook.transactions[this.passbook.transactions.length-1].balance
       return balance
    }

    
}

module.exports = Accounts