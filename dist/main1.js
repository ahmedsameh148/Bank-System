"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongodb_1 = require("mongodb");
var url = "mongodb://localhost:27017/";
var connect = function () {
    return new Promise(function (resolve, reject) {
        mongodb_1.MongoClient.connect(url, function (err, mongoClient) {
            if (err)
                return reject(err);
            if (mongoClient)
                return resolve({ mongoClient: mongoClient, db: mongoClient.db("Bank") });
            return reject(new Error("can't connect to db"));
        });
    });
};
var id;
var logg = function (str) {
    id = "";
    for (var i = 0; i < str.toString().length; i++) {
        id += str.toString()[i];
    }
    console.log(id);
};
function insert(collection, data) {
    var prom = new Promise(function (resolve, reject) {
        connect().then(function (d) {
            return d.db.collection(collection).insertOne(data, function (err, res) {
                if (err)
                    return reject(err);
                logg(res === null || res === void 0 ? void 0 : res.insertedId);
                resolve(res === null || res === void 0 ? void 0 : res.insertedId);
                d.mongoClient.close();
            });
        });
    });
    return id;
}
//ID
function addUser(Name, BirthDate, Email, Mobile) {
    insert("User", { Name: Name, BirthDate: BirthDate, Email: Email, Mobile: Mobile });
    console.log(id + "*");
}
//account Id
function addAccount(UserId, AccountNumber, Balnce) {
    insert("Account", { UserId: UserId, AccountNumber: AccountNumber, Balnce: Balnce });
}
//card Number
function addCard(UserId, AccountID, CardNumber, CardHolderName, ExpireDate, CVV, Status) {
    insert("Card", { AccountID: AccountID, CardNumber: CardNumber, CardHolderName: CardHolderName, ExpireDate: ExpireDate, CVV: CVV, Status: Status });
}
// from == card Number || to == card Number
function addTransaction(FromAccount, ToAccount, Amount, Status) {
    insert("Transaction", { FromAccount: FromAccount, ToAccount: ToAccount, Amount: Amount, Status: Status });
}
function addGateway(userId, userName, password, passwordExpireDate) {
    insert("Gateway", { userId: userId, userName: userName, password: password, passwordExpireDate: passwordExpireDate });
}
function createUser(Name, BirthDate, Email, Mobile, Balnce) {
    addUser(Name, BirthDate, Email, Mobile);
    addAccount("1111111", Math.floor(Math.random() * 1E16), Balnce);
    var count = 0;
    for (var i = 0; i < Name.length; i++) {
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
    addCard("", "2222222", Math.floor(Math.random() * 1E16), Name.substring(0, count), "11/24", Math.floor(Math.random() * 1E3), "Active");
}
function createGateway(Name, Email, Mobile) {
    createUser(Name, "1/1/2021", Email, Mobile, 0);
    var user = Name.split(" ").join("");
    var pass = Math.random().toString(36).slice(-8);
    var today = new Date();
    var mm = String(today.getMonth() + 1).padStart(2, '0');
    var yyyy = today.getFullYear() + 1;
    var expir = mm + '/' + yyyy;
    addGateway("333333", user, pass, expir);
}
createUser("Ahmed Elsayed Mohamed Mohamed", "12/12/1995", "ahmed@outlook.com", "01555255222", 100000);
//createGateway("Team 2","team2@gmail.com","0111111111")
