export class GateWay {
    id?:string
    userId:string
    userName:string
    password:string
    passwordExpireDate:string
    constructor(userID: string,userName: string,password:string,passwordExpireDate:string) {
        this.userId=userID
        this.userName=userName
        this.password=password
        this.passwordExpireDate=passwordExpireDate
    }
}