"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mysql_1 = __importDefault(require("mysql"));
const config_1 = __importDefault(require("../../config/config"));
class MysqlDBC {
    constructor() {
        this.connection = () => {
            this.pool.getConnection((err, connection) => {
                if (err)
                    throw err;
                connection.release();
                console.info('DB: pool connection');
            });
        };
        this.limit = (start, step = parseInt(process.env.DBPAG || '10')) => {
            let limit = [1, 9];
            if (start) {
                start = (start > 0) ? (start - 1) * step : 1;
                limit = [start, step];
            }
            return limit;
        };
        this.pool = mysql_1.default.createPool({
            connectionLimit: parseInt(process.env.DBCONNLIMIT || '10'),
            host: process.env.DBHOST || config_1.default.DBMYSQL.host,
            port: parseInt(process.env.DBPORT || config_1.default.DBMYSQL.port),
            user: process.env.DBUSER || config_1.default.DBMYSQL.user,
            password: process.env.DBPASSWD || config_1.default.DBMYSQL.password,
            database: process.env.DBNAME || config_1.default.DBMYSQL.database,
            debug: false
        });
    }
    statement(statement, data) {
        return mysql_1.default.format(statement, data);
    }
}
exports.default = MysqlDBC;
