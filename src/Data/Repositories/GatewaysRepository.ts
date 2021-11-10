import {BaseRepo} from "./BaseRepository";
import {GateWay} from "../Models/Gateway.Model";

export class GateWaysRepository extends BaseRepo<GateWay> {
    readonly collectionName: string = "gateWays";

}
