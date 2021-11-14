"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var CustomServer_1 = require("./Core/CustomServer");
var TransactionsRouter_1 = require("./Routes/TransactionsRouter");
var BodyParserMiddleware_1 = require("./Middleawre/BodyParserMiddleware");
/**
 * init server
 */
var app = new CustomServer_1.CustomServer();
/**
 *  user middleware
 */
app.middleware(new BodyParserMiddleware_1.BodyParserMiddleware());
/**
 * init routes
 */
app.route(new TransactionsRouter_1.TransactionsRouter());
/**
 * start application
 */
app.listen(3003);
// async function run() {
//     let userService= new UsersService();
//     let res = await createUser("Ahmed Elsayed Mohamed Mohamed","12/12/1995","ahmed@outlook.com","01555255222",100000)
//     console.log(await userService.getUser({_id : new ObjectID(res.toString())}));
// }
// createGateway("Team 2","team2@gmail.com","0111111111")
// let tr= new TransactionService();
// let us=new UsersService();
// let as= new AccountService();
// let gs= new GateWayService()
// let cs= new CardService()
// tr.addTransaction("8287392010546621","7423399946407152",100,"accepted")
// us.getUser({id: "61867f8f6e08ea4335e0f280"})
// as.getAccount({id: "1111111"})
// cs.getCard({id:"7423399946407152"})
// gs.getGetway({id:"Team2"})
// tr.getTransaction({id:"7423399946407152"})
// run()
