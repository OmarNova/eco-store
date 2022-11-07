"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const UserController_1 = __importDefault(require("../controller/UserController"));
const auth_1 = __importDefault(require("../middleware/auth"));
class UserRoute {
    constructor() {
        this.config = () => {
            this.router.get('/', this.UserController.index);
            this.router.get('/user/favorites/', auth_1.default, this.UserController.getFavorites);
            this.router.post('/user/favorites/', auth_1.default, this.UserController.postFavorites);
            this.router.delete('/user/favorites/:idProduct', auth_1.default, this.UserController.deleteFavorites);
            this.router.get('/user/logout', this.UserController.logoutUser);
            this.router.post('/user/register', this.UserController.registerUser);
            this.router.post('/user/login', this.UserController.loginUser);
        };
        this.router = (0, express_1.Router)();
        this.UserController = new UserController_1.default();
        this.config();
    }
}
exports.default = UserRoute;
