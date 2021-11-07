"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
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
function insert(collection, data) {
    return new Promise(function (resolve, reject) {
        connect().then(function (d) {
            return d.db.collection(collection).insertOne(data, function (err, res) {
                if (err)
                    return reject(err);
                d.mongoClient.close();
                return resolve(res === null || res === void 0 ? void 0 : res.insertedId.toString());
            });
        });
    });
}
function get(collection, data) {
    return new Promise(function (resolve, reject) {
        connect().then(function (d) {
            return d.db.collection(collection).find(data).toArray(function (err, res) {
                if (err)
                    return reject(err);
                d.mongoClient.close();
                return resolve(res);
            });
        });
    });
}
function addUser(Name, BirthDate, Email, Mobile) {
    return __awaiter(this, void 0, void 0, function () {
        var id;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, insert("User", { Name: Name, BirthDate: BirthDate, Email: Email, Mobile: Mobile })];
                case 1:
                    id = _a.sent();
                    return [4 /*yield*/, id];
                case 2: return [2 /*return*/, _a.sent()];
            }
        });
    });
}
function getUser(data) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, get("User", data)];
                case 1: 
                //const id = new ObjectId(UserId);
                return [2 /*return*/, _a.sent()];
            }
        });
    });
}
function addAccount(UserId, AccountNumber, Balnce) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, insert("Account", { UserId: UserId, AccountNumber: AccountNumber, Balnce: Balnce })];
                case 1: return [2 /*return*/, _a.sent()];
            }
        });
    });
}
function getAccount(data) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, get("Account", data)];
                case 1: return [2 /*return*/, _a.sent()];
            }
        });
    });
}
function addCard(AccountID, CardNumber, CardHolderName, ExpireDate, CVV, Status) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, insert("Card", { AccountID: AccountID, CardNumber: CardNumber, CardHolderName: CardHolderName, ExpireDate: ExpireDate, CVV: CVV, Status: Status })];
                case 1: return [2 /*return*/, _a.sent()];
            }
        });
    });
}
function getCard(data) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, get("Card", data)];
                case 1: return [2 /*return*/, _a.sent()];
            }
        });
    });
}
function addTransaction(FromAccount, ToAccount, Amount, Status) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, insert("Transaction", { FromAccount: FromAccount, ToAccount: ToAccount, Amount: Amount, Status: Status })];
                case 1: return [2 /*return*/, _a.sent()];
            }
        });
    });
}
function getTransaction(data) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, get("Transaction", data)];
                case 1: return [2 /*return*/, _a.sent()];
            }
        });
    });
}
function addGateway(userId, userName, password, passwordExpireDate) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, insert("Gateway", { userId: userId, userName: userName, password: password, passwordExpireDate: passwordExpireDate })];
                case 1: return [2 /*return*/, _a.sent()];
            }
        });
    });
}
function getGateway(data) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, get("Gateway", data)];
                case 1: return [2 /*return*/, _a.sent()];
            }
        });
    });
}
function createUser(Name, BirthDate, Email, Mobile, Balnce) {
    return __awaiter(this, void 0, void 0, function () {
        var userid, accountID, count, i, cardID;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, addUser(Name, BirthDate, Email, Mobile)];
                case 1:
                    userid = _a.sent();
                    return [4 /*yield*/, addAccount(userid, Math.floor(Math.random() * 1E16), Balnce)];
                case 2:
                    accountID = _a.sent();
                    count = 0;
                    for (i = 0; i < Name.length; i++) {
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
                    return [4 /*yield*/, addCard(accountID, Math.floor(Math.random() * 1E16), Name.substring(0, count), "11/24", Math.floor(Math.random() * 1E3), "Active")];
                case 3:
                    cardID = _a.sent();
                    return [2 /*return*/, userid];
            }
        });
    });
}
function createGateway(Name, Email, Mobile) {
    return __awaiter(this, void 0, void 0, function () {
        var userID, user, pass, today, mm, yyyy, expir;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, createUser(Name, "1/1/2021", Email, Mobile, 0)];
                case 1:
                    userID = _a.sent();
                    user = Name.split(" ").join("");
                    pass = Math.random().toString(36).slice(-8);
                    today = new Date();
                    mm = String(today.getMonth() + 1).padStart(2, '0');
                    yyyy = today.getFullYear() + 1;
                    expir = mm + '/' + yyyy;
                    addGateway(userID, user, pass, expir);
                    return [2 /*return*/];
            }
        });
    });
}
function run() {
    return __awaiter(this, void 0, void 0, function () {
        var res, _a, _b;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0: return [4 /*yield*/, createUser("Ahmed Elsayed Mohamed Mohamed", "12/12/1995", "ahmed@outlook.com", "01555255222", 100000)];
                case 1:
                    res = _c.sent();
                    _b = (_a = console).log;
                    return [4 /*yield*/, getUser({ _id: new mongodb_1.ObjectId(res.toString()) })];
                case 2:
                    _b.apply(_a, [_c.sent()]);
                    return [2 /*return*/];
            }
        });
    });
}
module.exports = { createUser: createUser, createGateway: createGateway, getUser: getUser, getAccount: getAccount, getCard: getCard, getGateway: getGateway, getTransaction: getTransaction };
//run();
//creategateway("Team 2","team2@gmail.com","0111111111")
//addTransaction("8287392010546621","7423399946407152","1000","accepted")
//getUser("61867f8f6e08ea4335e0f280")
//getAccount("1111111")
//getCard("7423399946407152")
//getGateway("Team2")
//getTransaction("7423399946407152")
