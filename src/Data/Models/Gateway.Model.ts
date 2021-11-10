export class GateWay {
    id?:string
    userId:string
    userName:string
    password:string
    passwordExpireDate:Date
    constructor(userID: string,userName: string,password:string,passwordExpireDate:Date) {
        this.userId=userID
        this.userName=userName
        this.password=password
        this.passwordExpireDate=passwordExpireDate
    }
}