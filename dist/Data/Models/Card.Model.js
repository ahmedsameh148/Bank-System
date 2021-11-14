"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Card = void 0;
var Card = /** @class */ (function () {
    function Card(cvv, accountId, expireDate, cardNumber, cardHolderName, status) {
        this.cvv = cvv;
        this.accountId = accountId;
        this.expireDate = expireDate;
        this.cardNumber = cardNumber;
        this.cardHolderName = cardHolderName;
        this.status = status;
    }
    return Card;
}());
exports.Card = Card;
