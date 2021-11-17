import {Request, Response} from "express";
import {AccountService} from "../Services/AccountService";
import { AccountRepository } from "../Data/Repositories/AccountsRepository";
import { ObjectID } from "bson";


const accountService = new AccountService();




export async function transfer(req: Request,from:string, res: Response) {
    if (!req?.body?.to  || !req?.body?.amount) return res.status(204).json({ msg: 'Please enter a valid body' });
    const outID = from;
    const incID = req?.body?.to;
    
    const valueOfTransaction: number = Number(req?.body?.amount);
    let accountTransferOut = await accountService.getAccount({ _id: new ObjectID(outID) });
    
    //If there is a balance available for transfer...
    let transferWithdraw: number;
    if (accountTransferOut[0]?.balance >= valueOfTransaction) {
        transferWithdraw = accountTransferOut[0]?.balance - valueOfTransaction;
    } else {
        return res.status(400).send({ msg: 'There is no balance available for the transaction to complete.' })
    }

    let accountTransferInc = await accountService.getAccount({ _id:  new ObjectID(incID) });

    let transferDeposit: number = accountTransferInc[0]?.balance + valueOfTransaction;
    try {
        
        await accountService.updateAccount({ _id: accountTransferOut[0]._id }, { $set: { balance: transferWithdraw } });
        await accountService.updateAccount({ _id: accountTransferInc[0]._id }, { $set: { balance: transferDeposit } });
        //return  res.status(200).send({ msg: 'Transfer performed successfully.' })
    } catch (err) {
        return res.status(500).json({ msg: 'Internal Error. Please contact the administrator' })
    }
}
export async function balanceAdd(req: Request, res: Response) {
    if (!req?.body?.accountID && !req?.body?.value) return res.status(204).json({ msg: 'Please enter a valid body' })

    const account = await accountService.getAccount({ _id: req?.body?.accountID });
    const balance = parseInt(account[0].balance)
    const valueAfterDeposit = balance + Number(req?.body?.value);

    try {
        await accountService.updateAccount({ _id: account[0]._id }, { $set: { balance: valueAfterDeposit } });
        //res.status(200).json({ msg: 'Deposit executed successfully.' })
    } catch (error) {
        res.status(500).json({ msg: 'Internal Error. Please contact the administrator' })
    }
}
export async function balanceDeduct(req: Request, res: Response) {
    if (!req?.body?.accountID && !req?.body?.value) return res.status(204).json({ msg: 'Please enter a valid body.' });
    let accountToSearch = req?.body?.accountID;

    const accountSearched = await accountService.getAccount({ _id: accountToSearch });
    const balance = parseInt(accountSearched[0].balance);
    const valueAfterWithdraw = balance - Number(req.body.value);
    if(valueAfterWithdraw<0)
        return res.status(204).json({ msg: 'Insuffecient funds' });
    try {
        await accountService.updateAccount({ _id: accountSearched[0]._id }, { $set: { balance: valueAfterWithdraw } });
        res.status(200).json({ msg: 'Successfully executed service.' })
    } catch (error) {
        res.status(500).json({ msg: 'Internal Error. Please contact the administrator' })
    }
}
