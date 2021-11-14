"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EncryptPassword = void 0;
var crypto_1 = require("crypto");
var EncryptPassword = /** @class */ (function () {
    function EncryptPassword() {
        this.plainPassword = "";
    }
    EncryptPassword.prototype.setPlainPassword = function (password) {
        this.plainPassword = password;
        return this;
    };
    EncryptPassword.prototype.encrypt = function () {
        return (0, crypto_1.createHmac)("sha256", "sdohfjhsdofppioqweipqw89789713/1-23/")
            .update(this.plainPassword).digest("base64");
    };
    return EncryptPassword;
}());
exports.EncryptPassword = EncryptPassword;
