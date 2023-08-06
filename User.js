const Bank = require("./Bank")
const Account = require("./Account")
const Transaction = require("./Transaction")
const Passbook = require("./Passbook")
const InvalidName = require("./InvalidName")
const Unauthorized = require("./Unauthorized")
const NotFound = require("./NotFound")




class User {
    static ID = 0
    static users = []
    static banks = []
    //static admins=[]
    static accounts = []
    constructor(nameOfUser, isAdmin) {
        this.id = User.ID++

        this.nameOfUser = nameOfUser
        this.accounts = []
        this.isAdmin = isAdmin
        //add net worth property
    }

    static newAdmin(nameOfUser) {
        let adminObj = new User(nameOfUser, true)
        User.users.push(adminObj)
        return adminObj
    }

    newUser(nameOfUser) {
        try {
            if (!this.isAdmin) {
                throw new Unauthorized("only admin can perform")
            }
            if (typeof nameOfUser != "string") {
                throw new InvalidName("name should be string")
            }
            let userObj = new User(nameOfUser, false)
            User.users.push(userObj)
            return userObj

        } catch (error) {
            return error
        }

    }

    static findUser(id) {
        try {
            if (typeof id != "number") {
                throw new InvalidName("id needs to be number")
            }
            for (let index = 0; index < User.users.length; index++) {
                if (User.users[index].id == id) {
                    console.log("found");
                    return index

                }

            }
            throw new NotFound("id not valid")
        } catch (error) {
            throw error
        }



    }


    updateUser(id, newName) {
        try {
            if (!this.isAdmin) {
                throw new Unauthorized("only admin can access")
            }
            if (typeof id !== "number") {
                throw new InvalidName("id needs to be number")
            }
            if (typeof newName != "string") {
                throw new InvalidName("name should be string")
            }
            let index = User.findUser(id)
            User.users[index].nameOfUser = newName
        } catch (error) {
            return error
        }


    }

    deleteUser(id) {
        try {
            if (!this.isAdmin) {
                throw new Unauthorized("only admin can access")
            }
            if (typeof id !== "number") {
                throw new InvalidName("id needs to be number")
            }
            let index = User.findUser(id)

            User.users.splice(index, 1)
        } catch (error) {
            return error
        }


    }

    getAllUsers() {
        try {
            if (!this.isAdmin) {
                throw new Unauthorized("only admin can access")
            }
            return User.users
        } catch (error) {
            return error
        }

    }

    //banking

    newBank(bankName) {
        try {
            if (!this.isAdmin) {
                throw new Unauthorized("only admin can access")
            }
            if (typeof bankName != "string") {
                throw new InvalidName("name should be string")
            }

            let bankObj = new Bank(bankName)
            User.banks.push(bankObj)
            return bankObj
        } catch (error) {
            return error
        }

    }

    updateBank(bankId, newBankName) {
        try {
            if (!this.isAdmin) {
                throw new Unauthorized("only admin can access")
            }
            if (typeof bankName != "string") {
                throw new InvalidName("name should be string")
            }
            if (typeof bankId != "number") {
                throw new InvalidName("id should be number")
            }

            let index = this.findBank(bankId)

            User.banks[index].name = newBankName
        } catch (error) {
            return error
        }

    }

    findBank(bankId) {
        try {
            for (let index = 0; index < User.banks.length; index++) {

                if (User.banks[index].id == bankId) {
                    return index
                }

            }
            throw new NotFound("bank id not found")
        } catch (error) {
            throw error
        }

        //throw error
    }

    deleteBank(id) {
        try {
            if (!this.isAdmin) {
                throw new Unauthorized("only admin can access")
            }

            if (typeof id != "number") {
                throw new InvalidName("id should be number")
            }

            index = findBank(id)

            User.banks.splice(index, 1)
        } catch (error) {
            return error
        }

    }

    getAllBanks() {
        try {
            if (!this.isAdmin) {
                throw new Unauthorized("only admin can access")
            }

            return User.banks
        } catch (error) {
            return error
        }

    }

    // accounts crud by user

    newAccount(bankId) {
        try {
            if (this.isAdmin) {
                throw new Unauthorized("only user allowded")
            }
            let accountObj = new Account()
            //User.accounts.push(accountObj)
            //Bank.accounts.push(accountObj)
            let index = this.findBank(bankId)
            console.log("bank index is: ", index);
            console.log(User.banks);
            User.banks[index].accounts.push(accountObj)
            this.accounts.push(accountObj)
        } catch (error) {
            return error
        }


    }

    getAllAccounts() {
        try {
            if (this.isAdmin) {
                throw new Unauthorized("only user allowded")
            }

            return this.accounts
        } catch (error) {
            return error
        }

    }
    findAccount(id) {
        try {
            if (typeof id != "number") {
                throw new InvalidName("id needs to be number")
            }
            if (this.isAdmin) {
                throw new Unauthorized("only user allowded")
            }
            for (let index = 0; index < this.accounts.length; index++) {
                if (this.accounts[index].id === id) {
                    return index
                }

            }
            throw new NotFound("find account id not found")
        } catch (error) {
            throw error
        }


        //throw error
    }

    findRecieverUserAccount(userObj, accountID) {
        try {
            for (let index = 0; index < userObj.accounts.length; index++) {
                if (accountID == userObj.accounts[index].id) {
                    return index
                }
            }
            throw new NotFound("account id not found")
        } catch (error) {
            throw error
        }


    }

    deleteAccount(id) {
        try {

            if (this.isAdmin) {
                throw new Unauthorized("only user allowded")
            }
            if (typeof id != "number") {
                throw new NotFound("account id should be number")
            }
            index = this.findAccount(id)

            this.accounts.splice(index, 1)
        } catch (error) {
            return error
        }

    }

    //crud on accounts

    deposit(id, money) {
        try {
            if (typeof id != "number") {
                throw new InvalidName("account id should be number")
            }

            if (typeof money != "number") {
                throw new InvalidName("money should be number")
            }

            if (this.isAdmin) {
                throw new Unauthorized("only user can deposit")
            }

            let index = this.findAccount(id)
            this.accounts[index].deposit(money)
        } catch (error) {
            return error
        }

    }

    withdraw(id, money) {
        try {
            if (typeof id != "number") {
                throw new InvalidName("account id should be number")
            }

            if (typeof money != "number") {
                throw new InvalidName("money should be number")
            }
            if (this.isAdmin) {
                throw new Unauthorized("only user can withdraw")
            }

            let index = this.findAccount(id)
            let balanceLeft = this.accounts[index].withdraw(money)
            return balanceLeft
        } catch (error) {
            return error
        }

    }

    getBalance(id) {
        /*
        let index=this.findAccount(id)
        this.accounts[index].getBalance()
        */
        try {
            if (typeof id != "number") {
                throw new InvalidName("account id should be number")
            }
            let index = this.findAccount(id)
            return this.getBalance()
        } catch (error) {
            return error
        }

        //error in this code
    }



    transfer(senderAccountId, amount, recieverAccountId, recieverUserID) {
        try {
            let senderIndex = this.findAccount(senderAccountId)
            let recieverIndex = this.findAccount(recieverAccountId)
            let recieverObj = User.users[recieverUserID]
            let recieverAccountIndex = this.findRecieverUserAccount(recieverObj, recieverAccountId)

            this.accounts[senderIndex].withdraw(amount)
            var isWithdrawalSuccessful = true
            recieverObj.accounts[recieverAccountIndex].deposit(amount)
            return this.accounts
        } catch (error) {
            if (isWithdrawalSuccessful === true) {
                this.accounts[senderIndex].deposit(amount)
                return error
            }
            return error
        }

        //recieverIndex=User.users.findUser(recieverid)
    }

    printPassbook(id) {

        try {
            if (this.isAdmin) {
                throw new Unauthorized("only user can withdraw")
            }
    
            if (typeof id != "number") {
                throw new InvalidName("account id should be number")
            }
    
            console.log(this.findAccount(id));
            let index = this.findAccount(id)
            console.log(this.accounts);
            return this.accounts[index].printPassbook()
        } catch (error) {
            return error
        }
        
    }

    getAllAccount() {
        try {
            if (this.isAdmin) {
                throw new new UnauthorizedError("you are not user")
            }
            return this.accounts
        } catch (error) {
            return error
        }
    }
    findNetWorth(userid) {
        try {
            if (typeof userid !== "number") {
                throw new InvalidName("account id should be number")
            }
            let index = User.findUser(userid)
            let arrayOfUserAccount = User.users[index].getAllAccount()
            //console.log(arrayOfUserAccount);
            let totalMoneyInAllAccounts = 0
            //console.log(arrayOfUserAccount);
            /*
            for (let account in arrayOfUserAccount) {
               let totalMoneyInAllAccounts=+account.getBalance()
    
                
            }
            */
            for (let index = 0; index < arrayOfUserAccount.length; index++) {
                totalMoneyInAllAccounts = + arrayOfUserAccount[index].getBalance();
    
            }
            return totalMoneyInAllAccounts
        } catch (error) {
            return error
        }

       
       
    }




}

admin = User.newAdmin("ryan")
console.log(admin);
user1 = admin.newUser("mark")
user2 = admin.newUser("gorge")
console.log(user1);
admin.updateUser(1, "sam")
console.log(admin.getAllUsers());
console.log(User.users[0].id);
admin.newBank("morgan stanley")
console.log(admin.getAllBanks())
user1.newAccount(0)
console.log(user1.getAllAccounts());
user1.deposit(0, 5000)
//console.log(user1.getBalance(0));
console.log("----------------------------------");
//console.log(user1.accounts[0].passbook.transactions[0].balance);
//console.log(this.accounts[0]);
console.log(user1.withdraw(0, 1000))
//console.log(user1.passbook.transactions);
//console.log(user1.accounts[0]);
console.log(user1.printPassbook(0));
user2.newAccount(0)
console.log(user2.getAllAccounts());
user1.transfer(0, 1000, 1, 2)
console.log(user1.printPassbook(0));
console.log(user2.printPassbook(1));
console.log(admin.findNetWorth(1));
