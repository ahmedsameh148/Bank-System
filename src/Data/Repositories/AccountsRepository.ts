import {BaseRepo} from "./BaseRepository";
import {Account} from "../Models/Account.Model";

export class UsersRepository extends BaseRepo<Account> {
    readonly collectionName: string = "accounts";

}
