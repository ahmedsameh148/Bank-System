import {BaseRepo} from "./BaseRepository";
import {Card} from "../Models/Card.Model";

export class CardsRepository extends BaseRepo<Card> {
    readonly collectionName: string = "cards";

}
