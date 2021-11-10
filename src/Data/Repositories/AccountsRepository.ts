import {BaseRepo} from "./BaseRepository";
import {Account} from "../Models/Account.Model";

export class AccountRepository extends BaseRepo<Account> {
    readonly collectionName: string = "accounts";

}
