import {GateWaysRepository} from "../Data/Repositories/GatewaysRepository";

import { GateWay } from "../Data/Models/Gateway.Model";

let getwayRepo = new GateWaysRepository()

export class GateWayService {

    async  addGateway(userId: any, userName: string, password: string, passwordExpireDate: string){
    
        const GW=new GateWay(userId,userName,password,passwordExpireDate);
        return getwayRepo.insert(GW);
    }
    
    async  getGetway(data : object){
        
        return getwayRepo.get(data);
    }
 
}