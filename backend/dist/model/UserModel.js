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
const MysqlDBC_1 = __importDefault(require("../db/myslq/MysqlDBC"));
const bcrypt_1 = __importDefault(require("bcrypt"));
class MoviesModel {
    constructor() {
        this.limit = (start, step) => {
            return this.mysqlDBC.limit(start, step);
        };
        this.getUser = (email, fn) => {
            this.mysqlDBC.connection();
            const statement = `SELECT * FROM users WHERE email='${email}'`;
            this.mysqlDBC.pool.query(statement, (error, rows) => {
                fn(error, rows);
            });
        };
        this.getFavorites = (id, fn) => {
            this.mysqlDBC.connection();
            const statement = `SELECT DISTINCT productos_idproductos FROM productos_has_users WHERE users_id=${id};`;
            this.mysqlDBC.pool.query(statement, (error, rows) => {
                fn(error, rows);
            });
        };
        this.postFavorites = (idUser, idProduct, fn) => {
            this.mysqlDBC.connection();
            const statement = `INSERT INTO productos_has_users(users_id,productos_idproductos) VALUES (${idUser},'${idProduct}')`;
            this.mysqlDBC.pool.query(statement, (error, rows) => {
                fn(error, rows);
            });
        };
        this.deleteFavorites = (idUser, idProduct, fn) => {
            this.mysqlDBC.connection();
            const statement = `DELETE FROM productos_has_users WHERE users_id=${idUser} AND productos_idproductos='${idProduct}'`;
            this.mysqlDBC.pool.query(statement, (error, rows) => {
                fn(error, rows);
            });
        };
        this.insertUser = (data, fn) => __awaiter(this, void 0, void 0, function* () {
            this.mysqlDBC.connection();
            const password_hash = bcrypt_1.default.hashSync(data.passwd, 10);
            const statement = `INSERT INTO users(nombres, apellidos, email, passwd) VALUES('${data.nombres}', '${data.apellidos}', '${data.email}', '${password_hash}');`;
            this.mysqlDBC.pool.query(statement, (error, rows) => {
                fn(error, rows);
            });
        });
        this.login = (data, fn) => __awaiter(this, void 0, void 0, function* () {
            this.mysqlDBC.connection();
            const statement = `SELECT passwd FROM users WHERE email='${data.email}'`;
            this.mysqlDBC.pool.query(statement, (error, rows) => {
                const verified = bcrypt_1.default.compareSync(data.passwd, rows[0].passwd);
                fn(error, verified);
            });
        });
        this.mysqlDBC = new MysqlDBC_1.default();
    }
}
exports.default = MoviesModel;
