import {BaseRepo} from "./BaseRepository";
import {Transaction} from "../Models/Transaction.Model";

export class TransactionsRepository extends BaseRepo<Transaction> {
    readonly collectionName: string = "transactions";


}