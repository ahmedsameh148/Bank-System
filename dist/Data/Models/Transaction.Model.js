"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Transaction = void 0;
var Transaction = /** @class */ (function () {
    function Transaction(from, to, amount, status) {
        this.from = from;
        this.to = to;
        this.amount = amount;
        this.status = status;
    }
    return Transaction;
}());
exports.Transaction = Transaction;