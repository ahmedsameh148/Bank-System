
export class Card {
    id?:string
    cvv:string
    accountId:string
    expireDate:Date
    cardNumber:string
    cardHolderName:string
    status:number
    constructor(cvv:string,accountId:string,expireDate:Date,cardNumber:string,cardHolderName:string,status:number) {
        this.cvv=cvv
        this.accountId=accountId
        this.expireDate=expireDate
        this.cardNumber=cardNumber
        this.cardHolderName=cardHolderName
        this.status=status
    }
}