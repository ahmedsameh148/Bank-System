
export class Card {
    id?:string
    cvv:number
    accountId:string
    expireDate:string
    cardNumber:number
    cardHolderName:string
    status:string
    constructor(cvv:number,accountId:string,expireDate:string,cardNumber:number,cardHolderName:string,status:string) {
        this.cvv=cvv
        this.accountId=accountId
        this.expireDate=expireDate
        this.cardNumber=cardNumber
        this.cardHolderName=cardHolderName
        this.status=status
    }
}