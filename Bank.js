const Account = require("./Account")
//const User = require("./User")
class Bank
{
    static BankId=0
    static accounts=[]
    static allBanks=[]
    constructor(name)
    {
        this.name=name
        this.id=Bank.BankId++
        this.accounts=[]
        
    }



}

module.exports = Bank