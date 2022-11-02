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
        this.getMovies = (limit, fn) => {
            this.mysqlDBC.connection();
            const statement = this.mysqlDBC.statement(`SELECT DISTINCT movie.movie_id, title, homepage, overview, popularity, release_date, vote_average, genre_name
        FROM ??, ??, ?? 
        WHERE movie.movie_id = movie_genres.movie_id
        AND movie_genres.genre_id = genre.genre_id
        ORDER BY title ASC LIMIT ${limit[0]},${limit[1]}`, ['movie', 'genre', 'movie_genres']);
            this.mysqlDBC.pool.query(statement, (error, rows) => {
                fn(error, rows);
            });
        };
        this.getUser = (email, fn) => {
            this.mysqlDBC.connection();
            const statement = `SELECT * FROM users WHERE email='${email}'`;
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
        this.getMovie = (id, fn) => {
            this.mysqlDBC.connection();
            const statement = this.mysqlDBC.statement(`SELECT DISTINCT movie.movie_id, title, homepage, overview, popularity, release_date, vote_average, genre_name
        FROM ??, ??, ?? 
        WHERE movie.movie_id = movie_genres.movie_id
        AND movie_genres.genre_id = genre.genre_id
        AND movie.movie_id = ${id}`, ['movie', 'genre', 'movie_genres']);
            this.mysqlDBC.pool.query(statement, (error, rows) => {
                fn(error, rows);
            });
        };
        this.updateTitleMovie = (data, fn) => {
            this.mysqlDBC.connection();
            const statement = this.mysqlDBC.statement(`UPDATE movie SET movie.title = ? WHERE movie.movie_id = ?`, [data.title, data.id.toString()]);
            this.mysqlDBC.pool.query(statement, (error, rows) => {
                fn(error, rows);
            });
        };
        this.mysqlDBC = new MysqlDBC_1.default();
    }
}
exports.default = MoviesModel;
