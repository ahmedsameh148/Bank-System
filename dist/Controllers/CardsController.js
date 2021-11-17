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
exports.viewCardsForUser = exports.validateCard = void 0;
var CardService_1 = require("../Services/CardService");
var UsersService_1 = require("../Services/UsersService");
var AccountService_1 = require("../Services/AccountService");
var cardService = new CardService_1.CardService();
var userService = new UsersService_1.UsersService();
var accountService = new AccountService_1.AccountService();
function validateCard(req, res) {
    var _a, _b, _c, _d, _e, _f;
    return __awaiter(this, void 0, void 0, function () {
        var cardFound;
        return __generator(this, function (_g) {
            switch (_g.label) {
                case 0:
                    if (!((_a = req === null || req === void 0 ? void 0 : req.body) === null || _a === void 0 ? void 0 : _a.cardNumber) && !((_b = req === null || req === void 0 ? void 0 : req.body) === null || _b === void 0 ? void 0 : _b.cvv) && !((_c = req === null || req === void 0 ? void 0 : req.body) === null || _c === void 0 ? void 0 : _c.cardHolderName))
                        return [2 /*return*/, res.status(204).send({ msg: 'Please enter a valid body.' })];
                    return [4 /*yield*/, cardService.getCard({ cardNumber: Number((_d = req === null || req === void 0 ? void 0 : req.body) === null || _d === void 0 ? void 0 : _d.cardNumber) })];
                case 1:
                    cardFound = _g.sent();
                    //If there is a Balnce available for transfer...
                    if (!cardFound[0])
                        return [2 /*return*/, res.status(204).send({ msg: 'invalid Card' })];
                    if (((_e = cardFound[0]) === null || _e === void 0 ? void 0 : _e.cvv) !== ((_f = req === null || req === void 0 ? void 0 : req.body) === null || _f === void 0 ? void 0 : _f.cvv))
                        return [2 /*return*/, res.status(204).send({ msg: 'invalid Card' })];
                    return [2 /*return*/, cardFound[0]];
            }
        });
    });
}
exports.validateCard = validateCard;
function viewCardsForUser(req, res) {
    var _a, _b;
    return __awaiter(this, void 0, void 0, function () {
        var founduser, foundaccount, foundCards;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    if (!((_a = req === null || req === void 0 ? void 0 : req.body) === null || _a === void 0 ? void 0 : _a.id))
                        return [2 /*return*/, res.status(204).send({ msg: 'Please enter a valid body' })];
                    return [4 /*yield*/, userService.getUser({ _id: (_b = req === null || req === void 0 ? void 0 : req.body) === null || _b === void 0 ? void 0 : _b.id })];
                case 1:
                    founduser = _c.sent();
                    if (!founduser[0])
                        return [2 /*return*/, res.status(204).send({ msg: 'no user found' })];
                    return [4 /*yield*/, accountService.getAccount({ _id: founduser[0].AccountId })];
                case 2:
                    foundaccount = _c.sent();
                    return [4 /*yield*/, cardService.getCard({ accountId: foundaccount[0] })];
                case 3:
                    foundCards = _c.sent();
                    return [2 /*return*/, res.status(200).send(foundCards)];
            }
        });
    });
}
exports.viewCardsForUser = viewCardsForUser;
// export async function validateCardBeforDBupdate(req: Request, res: Response) {
// }
