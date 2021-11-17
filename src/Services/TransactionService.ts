import {TransactionsRepository} from "../Data/Repositories/TransactionRepository";
import {Transaction} from "../Data/Models/Transaction.Model";

let transactionRepo = new TransactionsRepository()

export class TransactionService {

    async addTransaction(FromAccount: string, ToAccount: string, Amount: number, Status: string,gateWay:string){
        
        let transaction = new Transaction(FromAccount,ToAccount,Amount,Status,gateWay);
        return transactionRepo.insert(transaction);

    }
    async  getTransaction(data : object){
        
        return transactionRepo.get( data)
    }
    // all() {
    //     return transactionRepo.findAll();
    // }

    findById(id: string) {
        return transactionRepo.findById(id)
    }

    async findByIdOrFail(id: string): Promise<Transaction> {
        let transaction = await this.findById(id);
        if (transaction)
            return transaction;

        throw new Error("missing or invalid Id")
    }

    async  updateTransaction(data: object,updatedData:object): Promise<Transaction[] | any> {

        return await transactionRepo.update(data,updatedData);
    }

    

//     async findAndUpdate(id: string, body: any) {
//         return this.update(await this.findByIdOrFail(id), body);
//     }
 }