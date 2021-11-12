import { Request, Response, NextFunction } from 'express';
import { getAccount, updateAccount } from './DB';


/**
{ 'outAccount': ,
'incAccount': ,
'value':
}
  
 */
export interface Account {
    UserId: any,
    AccountNumber: number,
    Balnce: number
}


export async function trasnfer(req: Request, res: Response) {
    if (!req?.body?.incAccount || !req?.body?.outAccount || !req?.body?.value) return res.status(204).json({ msg: 'Please enter a valid body' });
    const outID = req?.body?.outAccount;
    const incID = req?.body?.incAccount;
    const valueOfTransaction: number = Number(req?.body?.value);

    const accountTransferOut: Account = await getAccount({ UserId: outID });
    //If there is a Balnce available for transfer...
    let transferWithdraw: number;
    if (accountTransferOut[0]?.Balnce >= valueOfTransaction) {
        transferWithdraw = accountTransferOut[0]?.Balnce - valueOfTransaction;
    } else {
        return res.status(400).json({ msg: 'There is no Balnce available for the transaction to complete.' })
    }

    const accountTransferInc: Account = await getAccount({ UserId: incID });

    let transferDeposit: number = accountTransferInc[0]?.Balnce + valueOfTransaction;
    try {
        await updateAccount({ _id: accountTransferOut[0]._id }, { $set: { Balnce: transferWithdraw } });
        await updateAccount({ _id: accountTransferInc[0]._id }, { $set: { Balnce: transferDeposit } });
        res.status(200).json({ msg: 'Transfer performed successfully.' })
    } catch (err) {
        res.status(500).json({ msg: 'Internal Error. Please contact the administrator' })
    }
}
/////////////////////
/**
 * 
 {
    "accountID": "618d12638f934c4e70f101dd",
    "value": "550"
}
 */
export async function balanceAdd(req: Request, res: Response) {
    if (!req?.body?.accountID && !req?.body?.value) return res.status(204).json({ msg: 'Please enter a valid body' })

    const account: Account = await getAccount({ UserId: req?.body?.accountID });
    const Balnce = parseInt(account[0].Balnce)
    const valueAfterDeposit = Balnce + Number(req?.body?.value);

    try {
        await updateAccount({ _id: account[0]._id }, { $set: { Balnce: valueAfterDeposit } });
        res.status(200).json({ msg: 'Deposit executed successfully.' })
    } catch (error) {
        res.status(500).json({ msg: 'Internal Error. Please contact the administrator' })
    }
}
////////////////////////////
/**
 * 
 {
    "accountID": "618d12638f934c4e70f101dd",
    "value": "550"
}
 */

export async function balanceDeduct(req: Request, res: Response) {
    if (!req?.body?.accountID && !req?.body?.value) return res.status(204).json({ msg: 'Please enter a valid body.' });
    let accountToSearch = req?.body?.accountID;

    const accountSearched: Account = await getAccount({ UserId: accountToSearch });
    const balance = parseInt(accountSearched[0].Balnce);
    const valueAfterWithdraw = balance - Number(req.body.value);

    try {
        await updateAccount({ _id: accountSearched[0]._id }, { $set: { Balnce: valueAfterWithdraw } });
        res.status(200).json({ msg: 'Successfully executed service.' })
    } catch (error) {
        res.status(500).json({ msg: 'Internal Error. Please contact the administrator' })
    }
}