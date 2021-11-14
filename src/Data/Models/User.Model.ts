export class User {
    id?:string
    Name:String
    BirthDate:string
    Email:string
    AccountId?:string
    mobile:string
    constructor(name:string,birthDate:string,Email:string,mobile:string) {
        this.Name=name;
        this.BirthDate=birthDate;
        this.Email=Email
        this.mobile=mobile
    }
    
}
