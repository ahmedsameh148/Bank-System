import {BaseRepo} from "./BaseRepository";
import {User} from "../Models/User.Model";

export class UsersRepository extends BaseRepo<User> {
    readonly collectionName: string = "users";

}
