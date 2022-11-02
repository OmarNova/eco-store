"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const MysqlDBC_1 = __importDefault(require("../db/myslq/MysqlDBC"));
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
