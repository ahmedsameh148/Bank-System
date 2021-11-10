import {RouteInterface} from "../Core/Interfaces/Route.Interface";
import express, {IRouter} from "express";
import {
    CreateTransaction, getGateWayTransactions,
    
    GetTransaction
} from "../Controllers/TransactionsController";


export class TransactionsRouter implements RouteInterface {
    getPath(): string {
        return "/transaction";
    }

    getRouter(): IRouter {

        const route = express.Router();

        route.get("/", getGateWayTransactions);
        route.post("/", CreateTransaction);
        route.get("/:id", GetTransaction);


        return route;
    }

}