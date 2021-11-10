export class User {
    id?:string
    Name:String
    BirthDate:string
    Email:string
    AccountId:string
    constructor(data: any) {
        for (let key in data) {
            // @ts-ignore
            this[key] = data[key]
        }
    }

}
