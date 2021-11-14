export class Transaction {
    id?:string
    from:string
    to:string
    amount:number
    status:string
    constructor(from: string,to: string,amount:number,status:string) {
        this.from = from;
        this.to = to;
        this.amount = amount;
        this.status = status;
    }
}