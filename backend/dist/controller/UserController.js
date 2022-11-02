"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const UserModel_1 = __importDefault(require("../model/UserModel"));
class UserController {
    constructor() {
        this.index = (req, res) => res.json({ 'error': 0, 'msg': 'API: node-express-ts' });
        this.getUser = (req, res) => {
            const { email } = req.params;
            this.model.getUser(email, (error, rows) => {
                if (error) {
                    console.error(error);
                    return res.json({ error: true, message: 'e101' });
                }
                if (rows) {
                    return res.json(rows);
                }
                else {
                    return res.status(404).json({ error: false, message: 'Movie not found' });
                }
            });
        };
        this.model = new UserModel_1.default();
    }
}
exports.default = UserController;
