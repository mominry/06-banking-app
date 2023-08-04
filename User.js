const Bank = require("./Bank")
const Account = require("./Account")
const Transaction = require("./Transaction")
const Passbook=require("./Passbook")




class User
{
    static ID=0
    static users=[]
    static banks=[]
    //static admins=[]
    static accounts=[]
    constructor(nameOfUser,isAdmin)
    {   
        this.id=User.ID++
        
        this.nameOfUser=nameOfUser
        this.accounts=[]
        this.isAdmin=isAdmin
        //add net worth property
    }

    static newAdmin(nameOfUser)
    {
        let adminObj=new User(nameOfUser,true)
        User.users.push(adminObj)
        return adminObj
    }

    newUser(nameOfUser)
    {
        let userObj=new User(nameOfUser,false)
        User.users.push(userObj)
        return userObj
    }

   static findUser(id)
    {
        for (let index = 0; index < User.users.length; index++) {
            if (User.users[index].id==id) {
                console.log("found");
                return index
                
            }
            
        }
        //throw
        return false
    }


    updateUser(id,newName)
    {
       let index=User.findUser(id)
       //console.log(isUserExist);

        User.users[index].nameOfUser=newName
        
    }

    deleteUser(id)
    {
       let index=User.findUser(id)

        User.users.splice(index, 1)

    }

    getAllUsers()
    {
        return User.users
    }

    //banking

    newBank(bankName)
    {
        let bankObj=new Bank(bankName)
        User.banks.push(bankObj)
        return bankObj
    }

    updateBank(bankId,newBankName)
    {
         index=this.findBank(bankId)

         User.banks[index].name=newBankName
    }

    findBank(bankId)
    {
        for (let index = 0; index < User.users.length; index++) {
            
            if (User.banks[index].id==bankId) {
                return index
            }
            
        }
        //throw error
    }

    deleteBank(id)
    {
        index=findBank(id)

        User.banks.splice(index, 1)
    }

    getAllBanks()
    {
        return User.banks
    }

    // accounts crud by user

    newAccount()
    {
        let accountObj=new Account()
        User.accounts.push(accountObj)
        Bank.accounts.push(accountObj)
        this.accounts.push(accountObj)
        //push in particular bank account array left
    }

    getAllAccounts()
    {
        return this.accounts
    }
    findAccount(id)
    {
        for (let index = 0; index < User.accounts.length; index++) {
            if (this.accounts[index].id===id) {
                return index
            }
            
        }
        //throw error
    }

    deleteAccount(id)
    {
        index=this.findAccount(id)

        this.accounts.splice(index, 1)
    }

    //crud on accounts

    deposit(id,money)
    {
        let index =this.findAccount(id)
        this.accounts[index].deposit(money)
    }

    withdraw(id,money)
    {
        let index =this.findAccount(id)
        let balanceLeft=this.accounts[index].withdraw(money)
        return balanceLeft
    }

    getBalance(id)
    {
        /*
        let index=this.findAccount(id)
        this.accounts[index].getBalance()
        */
        let index =this.findAccount(id)
        this.getBalance(index)
        //error in this code
    }

    transfer(senderAccountId,amount,recieverAccountId)
    {
        senderIndex=
        recieverIndex=User.users.findUser(recieverid)


    }


}

admin= User.newAdmin("ryan")
console.log(admin);
user1=admin.newUser("mark")
console.log(user1);
admin.updateUser(1,"sam")
console.log(admin.getAllUsers());
console.log(User.users[0].id);
admin.newBank("morgan stanley")
console.log(admin.getAllBanks())
user1.newAccount()
console.log(user1.getAllAccounts());
user1.deposit(0,5000)
//console.log(user1.getBalance(0));
console.log("----------------------------------");
//console.log(user1.accounts[0].passbook.transactions[0].balance);
//console.log(this.accounts[0]);
console.log(user1.withdraw(0,1000))
//console.log(user1.passbook.transactions);