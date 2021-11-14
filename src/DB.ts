import { User } from './Data/Models/User.Model';
import {UsersService} from './Services/UsersService'
import {AccountService} from './Services/AccountService'
import {CardService} from './Services/CardService'
import { GateWayService } from './Services/GateWayService';
import {ObjectId} from "mongodb";

export async function createUser( Name: string, BirthDate: string, Email: string, Mobile: string, Balnce: number){
    let userService= new UsersService();
    let accountService= new AccountService();
    let cardService=new  CardService();
    const userid = await userService.addUser(Name,BirthDate,Email,Mobile);
    const accountID = await accountService.addAccount(userid,Math.floor(Math.random()*1E16),Balnce)
    let count=0;
    for (let i=0;i<Name.length;i++)
    {
        if (Name[i]==' ')
           {count++;
            if (count==2)
            {
                count=i
                break
            }
        }
    }
    if (count<2)
        count=Name.length
    let cardID = await cardService.addCard(accountID,Math.floor(Math.random()*1E16),Name.substring(0,count),"11/24",Math.floor(Math.random()*1E3),"Active")
    return userid;
}

export async function createGateway (Name: string, Email: string, Mobile: string){
    let gateWayService= new GateWayService();
    const userID = await createUser(Name,"1/1/2021",Email,Mobile,0)
    var user=Name.split(" ").join("");
    var pass=Math.random().toString(36).slice(-8)
    var today = new Date()
    var mm = String(today.getMonth() + 1).padStart(2, '0') 
    var yyyy = today.getFullYear()+1
    var expir = mm + '/' + yyyy
    gateWayService.addGateway(userID,user,pass,expir)
    
}

