"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GateWay = void 0;
var GateWay = /** @class */ (function () {
    function GateWay(userID, userName, password, passwordExpireDate) {
        this.userId = userID;
        this.userName = userName;
        this.password = password;
        this.passwordExpireDate = passwordExpireDate;
    }
    return GateWay;
}());
exports.GateWay = GateWay;
