import {Request, Response} from "express";
import {CardService} from "../Services/CardService";
import { UsersService } from "../Services/UsersService";
import { AccountService } from "../Services/AccountService";



const cardService = new CardService();
const userService = new UsersService();
const accountService = new AccountService();


export async function validateCard(req: Request, res: Response) {
    if (!req?.body?.cardNumber && !req?.body?.cvv && !req?.body?.cardHolderName) return res.status(204).send({ msg: 'Please enter a valid body.' });
     const cardFound = await cardService.getCard({ cardNumber: Number(req?.body?.cardNumber) });
     
    //If there is a Balnce available for transfer...
    if(!cardFound[0])
        return res.status(204).send({ msg: 'invalid Card' });
    if(cardFound[0]?.cvv!==req?.body?.cvv)
        return res.status(204).send({ msg: 'invalid Card' });
    return cardFound[0];
   
}
export async function viewCardsForUser(req: Request, res: Response) {
    if (!req?.body?.id ) return res.status(204).send({ msg: 'Please enter a valid body' })
    const founduser=await userService.getUser({_id:req?.body?.id});
    if(!founduser[0])
        return res.status(204).send({ msg: 'no user found' });
    const foundaccount= await accountService.getAccount({_id: founduser[0].AccountId})
    const foundCards= await cardService.getCard({accountId:foundaccount[0]})
    return res.status(200).send(foundCards); 
    
}
// export async function validateCardBeforDBupdate(req: Request, res: Response) {
   
// }
