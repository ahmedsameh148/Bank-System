export class Account {
    id?:string
    userId:string
    accountNumber:number
    balance:number
    cardId?:string
    constructor(userId: string,balance:number,accountNumber:number) {
        this.userId=userId;
        this.balance=balance;
        this.accountNumber=accountNumber;
    }
}