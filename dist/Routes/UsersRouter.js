"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersRouter = void 0;
var express_1 = __importDefault(require("express"));
var UsersController_1 = require("../Controllers/UsersController");
var usersController = new UsersController_1.UsersController();
var UsersRouter = /** @class */ (function () {
    function UsersRouter() {
    }
    UsersRouter.prototype.getPath = function () {
        return "/users";
    };
    UsersRouter.prototype.getRouter = function () {
        var route = express_1.default.Router();
        route.get("/", usersController.ListAllUsers);
        route.post("/", usersController.CreateNewUser);
        return route;
    };
    return UsersRouter;
}());
exports.UsersRouter = UsersRouter;
