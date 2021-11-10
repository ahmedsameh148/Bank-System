import {UsersRepository} from "../Data/Repositories/UsersRepository";
import {User} from "../Data/Models/User.Model";
import {EncryptPassword} from "./EncryptPassword";
import {ObjectId} from "mongodb";

const usersRepo = new UsersRepository();


export class UsersService {

    
    
    async  getUser(data : object){
        
        //const id = new ObjectId(UserId);
        return await usersRepo.get(data);
    }

    private async  addUser(Name: string, BirthDate: string, Email: string, Mobile: string) {
       

        const user = new User({Name: Name, BirthDate: BirthDate, Email: Email, Mobile: Mobile});
        return usersRepo.insert(user)
    }

   

    async findOrFail(insertId: ObjectId | undefined) {
        let user = await this.find(insertId);
        if (user)
            return user;
        throw  new Error("invalid or missing ID")
    }

    async find(insertId: ObjectId | undefined) {
        return usersRepo.findById((insertId as ObjectId).toString());
    }
}