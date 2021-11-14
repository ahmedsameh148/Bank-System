import {AccountRepository} from "../Data/Repositories/AccountsRepository";

import { Account } from "../Data/Models/Account.Model";

let accountRepo = new AccountRepository()

export class AccountService {

    async  addAccount(UserId: any, AccountNumber: number, Balnce: number){
    
        const acc=new Account(UserId,Balnce,AccountNumber)
        return accountRepo.insert(acc);
    }
    
    async  getAccount(data : object){
        
        return accountRepo.get(data);
    }
 
}