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
exports.refund = exports.getGateWayTransactions = exports.transactionsSave = void 0;
var TransactionService_1 = require("../Services/TransactionService");
var AccountService_1 = require("../Services/AccountService");
var CardsController_1 = require("./CardsController");
var AccountsController_1 = require("./AccountsController");
var GatewaysController_1 = require("./GatewaysController");
var GateWayService_1 = require("../Services/GateWayService");
var CardService_1 = require("../Services/CardService");
var transactionService = new TransactionService_1.TransactionService();
var accountService = new AccountService_1.AccountService();
var gateWayService = new GateWayService_1.GateWayService();
var cardService = new CardService_1.CardService();
/**
 *
 * @param req
 * @param res
 * @constructor
 */
function transactionsSave(req, res) {
    var _a, _b, _c, _d;
    return __awaiter(this, void 0, void 0, function () {
        var gw, card, body, from, transaction, e_1;
        return __generator(this, function (_e) {
            switch (_e.label) {
                case 0:
                    _e.trys.push([0, 7, , 8]);
                    return [4 /*yield*/, (0, GatewaysController_1.validateGatwayCredintials)((_a = req === null || req === void 0 ? void 0 : req.body) === null || _a === void 0 ? void 0 : _a.userName, (_b = req === null || req === void 0 ? void 0 : req.body) === null || _b === void 0 ? void 0 : _b.password, res)];
                case 1:
                    _e.sent();
                    return [4 /*yield*/, (0, CardsController_1.validateCard)(req, res)];
                case 2:
                    _e.sent();
                    return [4 /*yield*/, gateWayService.getGetway({ userName: (_c = req === null || req === void 0 ? void 0 : req.body) === null || _c === void 0 ? void 0 : _c.userName })];
                case 3:
                    gw = _e.sent();
                    return [4 /*yield*/, cardService.getCard({ cardNumber: Number((_d = req === null || req === void 0 ? void 0 : req.body) === null || _d === void 0 ? void 0 : _d.cardNumber) })];
                case 4:
                    card = _e.sent();
                    body = req.body;
                    from = card[0].accountId.toString();
                    return [4 /*yield*/, (0, AccountsController_1.transfer)(req, from, res)];
                case 5:
                    _e.sent();
                    return [4 /*yield*/, transactionService.addTransaction(from, body.to, body.amount, "Successful", gw[0]._id.toString())];
                case 6:
                    transaction = _e.sent();
                    return [2 /*return*/, res.status(200).send({ transaction: transaction.toString() })];
                case 7:
                    e_1 = _e.sent();
                    return [2 /*return*/, res.status(404).send({ message: e_1.message })];
                case 8: return [2 /*return*/];
            }
        });
    });
}
exports.transactionsSave = transactionsSave;
/**
 *
 * @param req
 * @param res
 * @constructor
 */
// export async function GetTransaction(req: Request, res: Response) {
//     let id: string = req.params.id;
//     try {
//         let transaction = await transactionService.findByIdOrFail(id);
//         return res.send({transaction: transaction});
//     } catch (e: any) {
//         return res.status(404).send({message: e.message});
//     }
// }
/**
 *
 * @param req
 * @param res
 * @constructor
 */
function getGateWayTransactions(req, res) {
    var _a, _b, _c;
    return __awaiter(this, void 0, void 0, function () {
        var gw, body, transactions, e_2;
        return __generator(this, function (_d) {
            switch (_d.label) {
                case 0:
                    _d.trys.push([0, 4, , 5]);
                    return [4 /*yield*/, (0, GatewaysController_1.validateGatwayCredintials)((_a = req === null || req === void 0 ? void 0 : req.body) === null || _a === void 0 ? void 0 : _a.userName, (_b = req === null || req === void 0 ? void 0 : req.body) === null || _b === void 0 ? void 0 : _b.password, res)];
                case 1:
                    _d.sent();
                    return [4 /*yield*/, gateWayService.getGetway({ userName: (_c = req === null || req === void 0 ? void 0 : req.body) === null || _c === void 0 ? void 0 : _c.userName })];
                case 2:
                    gw = _d.sent();
                    body = req.body;
                    return [4 /*yield*/, transactionService.getTransaction({ gateWay: gw[0]._id.toString() })];
                case 3:
                    transactions = _d.sent();
                    return [2 /*return*/, res.status(200).send({ transactions: transactions })];
                case 4:
                    e_2 = _d.sent();
                    return [2 /*return*/, res.status(404).send({ message: e_2.message })];
                case 5: return [2 /*return*/];
            }
        });
    });
}
exports.getGateWayTransactions = getGateWayTransactions;
function refund(req, res) {
    var _a, _b;
    return __awaiter(this, void 0, void 0, function () {
        var id, transactionSearched, to, from, amount, valueAfterWithdraw, valueAfterDeposit, error_1;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    if (!((_a = req === null || req === void 0 ? void 0 : req.body) === null || _a === void 0 ? void 0 : _a.transaction))
                        return [2 /*return*/, res.status(204).json({ msg: 'Please enter a valid body.' })];
                    id = (_b = req === null || req === void 0 ? void 0 : req.body) === null || _b === void 0 ? void 0 : _b.transaction;
                    return [4 /*yield*/, transactionService.findByIdOrFail(id)];
                case 1:
                    transactionSearched = _c.sent();
                    to = parseInt(transactionSearched[0].to);
                    from = parseInt(transactionSearched[0].from);
                    amount = parseInt(transactionSearched[0].amount);
                    valueAfterWithdraw = to - amount;
                    if (transactionSearched.status === "refunded")
                        return [2 /*return*/, res.status(204).json({ msg: 'Transaction is already refunded' })];
                    if (valueAfterWithdraw < 0)
                        return [2 /*return*/, res.status(204).json({ msg: 'Insuffecient funds' })];
                    valueAfterDeposit = from + amount;
                    _c.label = 2;
                case 2:
                    _c.trys.push([2, 6, , 7]);
                    return [4 /*yield*/, accountService.updateAccount({ _id: transactionSearched[0].to }, { $set: { balance: valueAfterWithdraw } })];
                case 3:
                    _c.sent();
                    return [4 /*yield*/, accountService.updateAccount({ _id: transactionSearched[0].from }, { $set: { balance: valueAfterDeposit } })];
                case 4:
                    _c.sent();
                    return [4 /*yield*/, transactionService.updateTransaction({ _id: transactionSearched[0].id }, { $set: { status: "refunded" } })];
                case 5:
                    _c.sent();
                    res.status(200).json({ msg: 'Successfully executed service.' });
                    return [3 /*break*/, 7];
                case 6:
                    error_1 = _c.sent();
                    res.status(500).json({ msg: 'Internal Error. Please contact the administrator' });
                    return [3 /*break*/, 7];
                case 7: return [2 /*return*/];
            }
        });
    });
}
exports.refund = refund;
