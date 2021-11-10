export class Account {
    id?:string
    userId:string
    balance:number
    cardId:string
    constructor(userId: string,balance:number,cardId:string) {
        this.userId=userId;
        this.balance=balance;
        this.cardId=cardId;
    }
}