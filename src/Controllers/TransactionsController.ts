import { ObjectID } from 'mongodb';
import {Request, Response} from "express";
import {TransactionService} from "../Services/TransactionService";
import { AccountService } from "../Services/AccountService";
import { validateCard } from "./CardsController";
import { transfer } from "./AccountsController";
import { validateGatwayCredintials } from "./GatewaysController";
import { GateWayService } from "../Services/GateWayService";
import { Card } from "../Data/Models/Card.Model";
import { GateWay } from "../Data/Models/Gateway.Model";
import { CardService } from "../Services/CardService";


const transactionService = new TransactionService();
const accountService= new AccountService();
const gateWayService= new GateWayService();
const cardService=new CardService()


/**
 *
 * @param req
 * @param res
 * @constructor
 */
export async function transactionsSave(req: Request, res: Response) {
    try {
        await validateGatwayCredintials(req?.body?.userName,req?.body?.password,res);
        await validateCard(req,res);
        const gw=await gateWayService.getGetway({userName:req?.body?.userName})
        
        const card=await cardService.getCard({cardNumber:Number(req?.body?.cardNumber)})
        let body=req.body;
        let from=card[0].accountId.toString()
        
        await transfer(req,from,res);
        
        let transaction = await transactionService.addTransaction(from,body.to,body.amount,"Successful",gw[0]._id.toString())
        
         return res.status(200).send({transaction: transaction.toString()});
    } catch (e: any) {
       return  res.status(404).send({message: e.message});
    }
}



/**
 *
 * @param req
 * @param res
 * @constructor
 */
// export async function GetTransaction(req: Request, res: Response) {
//     let id: string = req.params.id;

//     try {
//         let transaction = await transactionService.findByIdOrFail(id);

//         return res.send({transaction: transaction});
//     } catch (e: any) {
//         return res.status(404).send({message: e.message});
//     }
// }

/**
 *
 * @param req
 * @param res
 * @constructor
 */
export async function getGateWayTransactions(req: Request, res: Response) {
    

    try {
        await validateGatwayCredintials(req?.body?.userName,req?.body?.password,res);
        
        const gw=await gateWayService.getGetway({userName:req?.body?.userName})
        let body=req.body;
        let transactions= await transactionService.getTransaction({gateWay:gw[0]._id.toString()})
        
        return res.status(200).send({transactions: transactions});
    } catch (e: any) {
        return res.status(404).send({message: e.message});
    }
}
export async function refund(req: Request, res: Response) {
    if (!req?.body?.transaction) return res.status(204).json({ msg: 'Please enter a valid body.' });
    let id = req?.body?.transaction;

    const transactionSearched = await transactionService.findByIdOrFail(id);
    const to = parseInt(transactionSearched[0].to);
    const from = parseInt(transactionSearched[0].from);
    const amount = parseInt(transactionSearched[0].amount);
    const valueAfterWithdraw = to - amount;
    if(transactionSearched.status==="refunded")
        return res.status(204).json({ msg: 'Transaction is already refunded' });
    if(valueAfterWithdraw<0)
        return res.status(204).json({ msg: 'Insuffecient funds' });
        const valueAfterDeposit= from+amount;
    try {
        await accountService.updateAccount({ _id: transactionSearched[0].to }, { $set: { balance: valueAfterWithdraw } });
        await accountService.updateAccount({ _id: transactionSearched[0].from }, { $set: { balance: valueAfterDeposit } });
        await transactionService.updateTransaction({ _id: transactionSearched[0].id }, { $set: { status: "refunded" } });
        res.status(200).json({ msg: 'Successfully executed service.' })
    } catch (error) {
        res.status(500).json({ msg: 'Internal Error. Please contact the administrator' })
    }
}