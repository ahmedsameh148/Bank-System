"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.run = exports.createGateway = exports.createUser = exports.getGateway = exports.addGateway = exports.getTransaction = exports.addTransaction = exports.updateAccount = exports.getAccount = exports.addAccount = exports.getUser = exports.addUser = void 0;
const mongodb_1 = require("mongodb");
const url = "mongodb://localhost:27017/";
const connect = () => {
    return new Promise((resolve, reject) => {
        mongodb_1.MongoClient.connect(url, function (err, mongoClient) {
            if (err)
                return reject(err);
            if (mongoClient)
                return resolve({ mongoClient, db: mongoClient.db("Bank") });
            return reject(new Error("can't connect to db"));
        });
    });
};
function insert(collection, data) {
    return new Promise((resolve, reject) => {
        connect().then((d) => {
            return d.db.collection(collection).insertOne(data, function (err, res) {
                if (err)
                    return reject(err);
                d.mongoClient.close();
                return resolve(res?.insertedId.toString());
            });
        });
    });
}
function get(collection, data) {
    return new Promise((resolve, reject) => {
        connect().then((d) => {
            return d.db.collection(collection).find(data).toArray(function (err, res) {
                if (err)
                    return reject(err);
                d.mongoClient.close();
                return resolve(res);
            });
        });
    });
}
function update(collection, data, updatedData) {
    return new Promise((resolve, reject) => {
        connect().then((d) => {
            return d.db.collection(collection).updateOne(data, updatedData).then(() => resolve(true)).catch(reject);
        });
    });
}
async function addUser(Name, BirthDate, Email, Mobile) {
    let id = await insert("User", { Name: Name, BirthDate: BirthDate, Email: Email, Mobile: Mobile });
    return await id;
}
exports.addUser = addUser;
async function getUser(data) {
    //const id = new ObjectId(UserId);
    return await get("User", data);
}
exports.getUser = getUser;
async function addAccount(UserId, AccountNumber, Balnce) {
    return await insert("Account", { UserId: UserId, AccountNumber: AccountNumber, Balnce: Balnce });
}
exports.addAccount = addAccount;
async function getAccount(data) {
    return await get("Account", data);
}
exports.getAccount = getAccount;
async function updateAccount(data, updatedData) {
    return await update("Account", data, updatedData);
}
exports.updateAccount = updateAccount;
async function addCard(AccountID, CardNumber, CardHolderName, ExpireDate, CVV, Status) {
    return await insert("Card", { AccountID: AccountID, CardNumber: CardNumber, CardHolderName: CardHolderName, ExpireDate: ExpireDate, CVV: CVV, Status: Status });
}
async function getCard(data) {
    return await get("Card", data);
}
async function addTransaction(FromAccount, ToAccount, Amount, Status) {
    return await insert("Transaction", { FromAccount: FromAccount, ToAccount: ToAccount, Amount: Amount, Status: Status });
}
exports.addTransaction = addTransaction;
async function getTransaction(data) {
    return await get("Transaction", data);
}
exports.getTransaction = getTransaction;
async function addGateway(userId, userName, password, passwordExpireDate) {
    return await insert("Gateway", { userId: userId, userName: userName, password: password, passwordExpireDate: passwordExpireDate });
}
exports.addGateway = addGateway;
async function getGateway(data) {
    return await get("Gateway", data);
}
exports.getGateway = getGateway;
async function createUser(Name, BirthDate, Email, Mobile, Balnce) {
    const userid = await addUser(Name, BirthDate, Email, Mobile);
    const accountID = await addAccount(userid, Math.floor(Math.random() * 1E16), Balnce);
    let count = 0;
    for (let i = 0; i < Name.length; i++) {
        if (Name[i] == ' ') {
            count++;
            if (count == 2) {
                count = i;
                break;
            }
        }
    }
    if (count < 2)
        count = Name.length;
    let cardID = await addCard(accountID, Math.floor(Math.random() * 1E16), Name.substring(0, count), "11/24", Math.floor(Math.random() * 1E3), "Active");
    return userid;
}
exports.createUser = createUser;
async function createGateway(Name, Email, Mobile) {
    const userID = await createUser(Name, "1/1/2021", Email, Mobile, 0);
    var user = Name.split(" ").join("");
    var pass = Math.random().toString(36).slice(-8);
    var today = new Date();
    var mm = String(today.getMonth() + 1).padStart(2, '0');
    var yyyy = today.getFullYear() + 1;
    var expir = mm + '/' + yyyy;
    addGateway(userID, user, pass, expir);
}
exports.createGateway = createGateway;
async function run() {
    let res = await createUser("Ahmed Elsayed Mohamed Mohamed", "12/12/1995", "ahmed@outlook.com", "01555255222", 100000);
    console.log(await getUser({ _id: new mongodb_1.ObjectId(res.toString()) }));
}
exports.run = run;
//module.exports = {createUser, createGateway, getUser, getAccount, getCard, getGateway, getTransaction,addTransaction};
//run();
//creategateway("Team 2","team2@gmail.com","0111111111")
//addTransaction("8287392010546621","7423399946407152","1000","accepted")
//getUser("61867f8f6e08ea4335e0f280")
//getAccount("1111111")
//getCard("7423399946407152")
//getGateway("Team2")
//getTransaction("7423399946407152")
