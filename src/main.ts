import {createUser,createGateway} from "./DB"
import { UsersService } from "./Services/UsersService";
import { ObjectID } from "mongodb";
import { TransactionService } from "./Services/TransactionService";
import { AccountService } from "./Services/AccountService";
import { GateWayService } from "./Services/GateWayService";
import { CardService } from "./Services/CardService";
import {CustomServer} from "./Core/CustomServer";
import {TransactionsRouter} from "./Routes/TransactionsRouter";
import {BodyParserMiddleware} from "./Middleawre/BodyParserMiddleware";

/**
 * init server
 */
const app = new CustomServer();
/**
 *  user middleware
 */
app.middleware(new BodyParserMiddleware())
/**
 * init routes
 */
app.route(new TransactionsRouter())
/**
 * start application
 */
app.listen(3003)

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
// let gw=gs.getGetway({userName:"Team2"})
// tr.addTransaction("8287392010546621","7423399946407152",100,"accepted","0");
// //manually change the "0" to the gw id
// us.getUser({id: "61867f8f6e08ea4335e0f280"})
// as.getAccount({id: "1111111"})
// cs.getCard({id:"7423399946407152"})
// gs.getGetway({id:"Team2"})
// tr.getTransaction({id:"7423399946407152"})
// run()


