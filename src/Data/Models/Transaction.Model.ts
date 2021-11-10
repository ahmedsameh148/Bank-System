export class Transaction {
    id?:string
    from:string
    to:string
    amount:number
    status:number
    constructor(from: string,to: string,amount:number,status:number) {
        this.from = from;
        this.to = to;
        this.amount = amount;
        this.status = status;
    }
}