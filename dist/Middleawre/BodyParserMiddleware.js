"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BodyParserMiddleware = void 0;
var body_parser_1 = __importDefault(require("body-parser"));
var BodyParserMiddleware = /** @class */ (function () {
    function BodyParserMiddleware() {
    }
    BodyParserMiddleware.prototype.getMiddleware = function () {
        return body_parser_1.default.json();
    };
    return BodyParserMiddleware;
}());
exports.BodyParserMiddleware = BodyParserMiddleware;
