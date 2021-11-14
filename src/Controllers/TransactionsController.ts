import {Request, Response} from "express";
import {TransactionService} from "../Services/TransactionService";


const transactionService = new TransactionService();




/**
 *
 * @param req
 * @param res
 * @constructor
 */
export async function CreateTransaction(req: Request, res: Response) {
    try {

        let body=req.body;
        let transaction = await transactionService.addTransaction(body.from,body.to,body.amount,body.status)
        return res.send({transaction: transaction});
    } catch (e: any) {
        return res.status(404).send({message: e.message});
    }
}



/**
 *
 * @param req
 * @param res
 * @constructor
 */
export async function GetTransaction(req: Request, res: Response) {
    let id: string = req.params.id;

    try {
        let transaction = await transactionService.findByIdOrFail(id);

        return res.send({transaction: transaction});
    } catch (e: any) {
        return res.status(404).send({message: e.message});
    }
}

/**
 *
 * @param req
 * @param res
 * @constructor
 */
export async function getGateWayTransactions
(req: Request, res: Response) {
    let id: string = req.body.id;

    try {
        let transaction = await transactionService.findByIdOrFail(id);

        return res.send({transaction: transaction});
    } catch (e: any) {
        return res.status(404).send({message: e.message});
    }
}

