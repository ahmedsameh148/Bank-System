import {Request, Response} from "express";
import {GateWayService} from "../Services/GateWayService";
import { GateWay } from "../Data/Models/Gateway.Model";



const gwService = new GateWayService();




export async function validateGatwayCredintials(userName:string,password:string, res: Response) {
    
    const foundGateway=await  gwService.getGetway({userName:userName})
    if(password!==foundGateway[0].password)
        return res.status(204).json({ msg: 'Password or Username are incorrect' }); 
    const passwordExpireDate: Date = new Date(foundGateway[0].passwordExpireDate);
    const today= new Date();
    if(passwordExpireDate.getDate()>today.getDate())
        return res.status(204).json({ msg: 'Password Expired' });
        
    return foundGateway[0];
}
