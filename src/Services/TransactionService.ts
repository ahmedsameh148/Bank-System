import {TransactionsRepository} from "../Data/Repositories/TransactionRepository";
import {Transaction} from "../Data/Models/Transaction.Model";

let transactionRepo = new TransactionsRepository()

export class TransactionService {

    async addTransaction(FromAccount: string, ToAccount: string, Amount: number, Status: string){
        let transaction = new Transaction(FromAccount,ToAccount,Amount,Status);
        let transactionId = (await transactionRepo.insert(transaction)).toString() || "";
        return this.findByIdOrFail(transactionId);

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

    // async update(transaction: Transaction, data: { desc: string }) {
    //     let newTransaction = new Transaction(data.desc);
    //     return transactionRepo.update(transaction._id as string, newTransaction)

    // }

    

//     async findAndUpdate(id: string, body: any) {
//         return this.update(await this.findByIdOrFail(id), body);
//     }
 }