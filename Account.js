const Passbook = require("./Passbook")
const Transaction = require("./Transaction")
const Unauthorized = require("./Unauthorized")

class Accounts {
    static ID = 0
    constructor() {
        this.id = Accounts.ID++
        this.passbook = new Passbook()
        this.balance = 0
    }

    deposit(money) {
        try {
            if (money < 1) {
                throw new Unauthorized("money should be greater than 1")
            }
            let transactionObj = new Transaction(new Date(), "debit", money, this.balance + money)
            this.balance = this.balance + money
            this.passbook.transactions.push(transactionObj)
            console.log("executed deposit");
        } catch (error) {
            throw error
        }

    }

    withdraw(money) {
        try {
            if (money > this.balance) {
                throw new Unauthorized("money is greater than balance")
            }
            if (money < 1) {
                throw new Unauthorized("money should be greater than 1")
            }

            let transactionObj = new Transaction(new Date(), "credit", money, this.balance - money)
            this.balance = this.balance - money
            this.passbook.transactions.push(transactionObj)
            return transactionObj.balance
        } catch (error) {
            throw error
        }

    }

    getBalance() {
        // return this.passbook.transactions[this.passbook.transactions.length-1].balance
        return this.balance
    }

    printPassbook(id) {
        return this.passbook
    }


}

module.exports = Accounts