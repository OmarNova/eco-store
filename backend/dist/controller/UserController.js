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
            if (req.session.email) {
                console.log(req.session.email);
            }
            const { email } = req.params;
            this.model.getUser(email, (error, rows) => {
                if (error) {
                    console.error(error);
                    return res.json({ error: true, message: 'e101' });
                }
                if (rows.length != 0) {
                    return res.json(rows);
                }
                else {
                    return res.status(404).json({ error: false, message: 'User not Found' });
                }
            });
        };
        this.registerUser = (req, res) => {
            if (JSON.stringify(req.body) != "{}") {
                this.model.getUser(req.body.email, (error, rows) => {
                    if (error) {
                        console.error(error);
                        return res.json({ error: true, message: 'e101' });
                    }
                    if (rows.length == 0) {
                        this.model.insertUser({ nombres: req.body.nombres, apellidos: req.body.apellidos, email: req.body.email, passwd: req.body.passwd }, (error, rows) => {
                            if (error) {
                                console.error(error);
                                return res.json({ error: true, message: 'e201' });
                            }
                            else {
                                return res.json({ error: false, message: 'User Insert' });
                            }
                        });
                    }
                    else {
                        return res.status(404).json({ error: false, message: 'User Already Exists' });
                    }
                });
            }
            else {
                return res.status(404).json({ error: false, message: 'Data not found' });
            }
        };
        this.logoutUser = (req, res) => {
            if (req.session.email) {
                req.session.destroy((err) => {
                    if (err)
                        throw err;
                    return res.json({ error: false, message: 'Logout' });
                });
            }
            else {
                return res.json({ error: true, message: 'Sessions Not Exists' });
            }
        };
        this.loginUser = (req, res) => {
            if (JSON.stringify(req.body) != "{}") {
                this.model.getUser(req.body.email, (error, rows) => {
                    if (error) {
                        console.error(error);
                        return res.json({ error: true, message: 'e101' });
                    }
                    if (rows.length != 0) {
                        this.model.login({ email: req.body.email, passwd: req.body.passwd }, (error, rows) => {
                            if (error) {
                                console.error(error);
                                return res.json({ error: true, message: 'e201' });
                            }
                            else if (rows) {
                                req.session.email = req.body.email;
                                console.log(req.session.email);
                                return res.json({ error: false, message: 'Login correct' });
                            }
                            else {
                                return res.json({ error: false, message: 'Password incorrect' });
                            }
                        });
                    }
                    else {
                        return res.status(404).json({ error: false, message: 'User Not Exists' });
                    }
                });
            }
            else {
                return res.status(404).json({ error: false, message: 'Data not found' });
            }
        };
        this.model = new UserModel_1.default();
    }
}
exports.default = UserController;
