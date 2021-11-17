import {RouteInterface} from "../Core/Interfaces/Route.Interface";
import express, {IRouter} from "express";
import {
    transactionsSave, getGateWayTransactions,
    
} from "../Controllers/TransactionsController";


export class TransactionsRouter implements RouteInterface {
    getPath(): string {
        return "/transaction";
    }

    getRouter(): IRouter {

        const route = express.Router();

        route.get("/", getGateWayTransactions);
        route.post("/", transactionsSave);
        //route.get("/:id", GetTransaction);


        return route;
    }

}