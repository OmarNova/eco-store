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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const UserModel_1 = __importDefault(require("../model/UserModel"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = __importDefault(require("../config/config"));
const ProductModel_1 = __importDefault(require("../model/ProductModel"));
class UserController {
    constructor() {
        this.index = (req, res) => res.json({ 'error': 0, 'msg': 'API: node-express-ts' });
        this.getFavorites = (req, res) => {
            const productModel = new ProductModel_1.default();
            const email = req.params.email;
            this.model.getUser(email, (error, rows) => {
                if (error) {
                    console.error(error);
                    return { error: true, message: 'error database' };
                }
                if (rows.length != 0) {
                    this.model.getFavorites(rows[0].id, (error, rows) => __awaiter(this, void 0, void 0, function* () {
                        if (error) {
                            console.error(error);
                            return { error: true, message: 'error database' };
                        }
                        if (rows.length != 0) {
                            let data = [];
                            for (let index = 0; index < rows.length; index++) {
                                const a = yield productModel.getProductById(rows[index].productos_idproductos);
                                data.push(a);
                            }
                            return res.json({ error: false, message: "Ok", data: data });
                        }
                        else {
                            return res.json({ error: true, message: "Not Favorites" });
                        }
                    }));
                }
                else {
                    return res.status(404).json({ error: true, message: 'User not Found' });
                }
            });
        };
        this.postFavorites = (req, res) => {
            if (JSON.stringify(req.body) != "{}") {
                const email = req.params.email;
                const idProduct = req.body.idProduct;
                this.model.getUser(email, (error, rows) => {
                    if (error) {
                        console.error(error);
                        return { error: true, message: 'error database' };
                    }
                    if (rows.length != 0) {
                        this.model.postFavorites(rows[0].id, idProduct, (error, rows) => __awaiter(this, void 0, void 0, function* () {
                            if (error) {
                                console.error(error);
                                return { error: true, message: 'error database' };
                            }
                            return res.json({ error: false, message: "Ok" });
                        }));
                    }
                    else {
                        return res.status(404).json({ error: true, message: 'User not Found' });
                    }
                });
            }
            else {
                return res.status(404).json({ error: true, message: 'Data not found' });
            }
        };
        this.deleteFavorites = (req, res) => {
            const email = req.params.email;
            const { idProduct } = req.params;
            this.model.getUser(email, (error, rows) => {
                if (error) {
                    console.error(error);
                    return { error: true, message: 'error database' };
                }
                if (rows.length != 0) {
                    this.model.deleteFavorites(rows[0].id, idProduct, (error, rows) => __awaiter(this, void 0, void 0, function* () {
                        if (error) {
                            console.error(error);
                            return { error: true, message: 'error database' };
                        }
                        return res.json({ error: false, message: "Ok" });
                    }));
                }
                else {
                    return res.status(404).json({ error: true, message: 'User not Found' });
                }
            });
        };
        this.registerUser = (req, res) => {
            if (JSON.stringify(req.body) != "{}") {
                this.model.getUser(req.body.email, (error, rows) => {
                    if (error) {
                        console.error(error);
                        return { error: true, message: 'error database' };
                    }
                    if (rows.length == 0) {
                        this.model.insertUser({ nombres: req.body.nombres, apellidos: req.body.apellidos, email: req.body.email, passwd: req.body.passwd }, (error, rows) => {
                            if (error) {
                                console.error(error);
                                return res.json({ error: true, message: 'Error in database' });
                            }
                            else {
                                return res.json({ error: false, message: 'User Insert' });
                            }
                        });
                    }
                    else {
                        return res.json({ error: true, message: 'User Already Exists' });
                    }
                });
            }
            else {
                return res.status(404).json({ error: true, message: 'Data not found' });
            }
        };
        this.loginUser = (req, res) => {
            if (JSON.stringify(req.body) != "{}") {
                this.model.getUser(req.body.email, (error, rows) => {
                    if (error) {
                        console.error(error);
                        return { error: true, message: 'error database' };
                    }
                    if (rows.length != 0) {
                        this.model.login({ email: req.body.email, passwd: req.body.passwd }, (error, rows) => {
                            if (error) {
                                console.error(error);
                                return res.json({ error: true, message: 'Error in database' });
                            }
                            else if (rows) {
                                const token = jsonwebtoken_1.default.sign({ email: req.body.email }, config_1.default.jwt.key);
                                return res.json({ error: false, message: token });
                            }
                            else {
                                return res.json({ error: true, message: 'Password incorrect' });
                            }
                        });
                    }
                    else {
                        return res.json({ error: true, message: 'User Not Exists' });
                    }
                });
            }
            else {
                return res.status(404).json({ error: true, message: 'Data not found' });
            }
        };
        this.buy = (req, res) => {
            const email = req.params.email;
            const carrito = req.body.carrito;
            this.model.getUser(email, (error, rows) => {
                if (error) {
                    console.error(error);
                    return { error: true, message: 'error database' };
                }
                if (rows.length != 0) {
                    const idUser = rows[0].id;
                    this.model.postPedido(idUser, req.body.total, (error, rows) => {
                        for (let index = 0; index < carrito.length; index++) {
                            this.model.postCompra(idUser, carrito[index].cantidad, carrito[index].data._id, rows[rows.length - 1].id);
                        }
                    });
                }
                else {
                    return res.status(404).json({ error: true, message: 'User not Found' });
                }
            });
        };
        this.model = new UserModel_1.default();
    }
}
exports.default = UserController;
