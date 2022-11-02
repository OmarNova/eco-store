import MysqlDBC from "../db/myslq/MysqlDBC";
import bcrypt from "bcrypt";
import { json } from "express";

export default class MoviesModel {

    private mysqlDBC: MysqlDBC;

    constructor() {
        this.mysqlDBC = new MysqlDBC();
    }
    
    public limit = (start: number, step: number): number[] => {
        return this.mysqlDBC.limit(start, step);
    };

    public getMovies = (limit: number[], fn: Function) => {
        this.mysqlDBC.connection();
        const statement = this.mysqlDBC.statement(`SELECT DISTINCT movie.movie_id, title, homepage, overview, popularity, release_date, vote_average, genre_name
        FROM ??, ??, ?? 
        WHERE movie.movie_id = movie_genres.movie_id
        AND movie_genres.genre_id = genre.genre_id
        ORDER BY title ASC LIMIT ${limit[0]},${limit[1]}`, 
        ['movie', 'genre', 'movie_genres']);
        this.mysqlDBC.pool.query(statement, (error: any, rows: any) => {            
            fn(error, rows);
        });              
    }

    public getUser = (email: string, fn: Function) => {
        this.mysqlDBC.connection();
        const statement = `SELECT * FROM users WHERE email='${email}'`;
        this.mysqlDBC.pool.query(statement, (error: any, rows: any) => {
            fn(error, rows);
        }); 
       
    }


    public insertUser = async (data: {nombres: string,apellidos: string,email: string,passwd:string}, fn: Function) => {
        this.mysqlDBC.connection();
        const password_hash=bcrypt.hashSync(data.passwd, 10);
        const statement = `INSERT INTO users(nombres, apellidos, email, passwd) VALUES('${data.nombres}', '${data.apellidos}', '${data.email}', '${password_hash}');`;
        this.mysqlDBC.pool.query(statement, (error: any, rows: any) => {  
            fn(error, rows);
        }); 
    }

    public login = async (data: {email: string,passwd:string}, fn: Function) => {
        this.mysqlDBC.connection();

        const statement = `SELECT passwd FROM users WHERE email='${data.email}'`;
        this.mysqlDBC.pool.query(statement, (error: any, rows: any) => {
            const verified = bcrypt.compareSync(data.passwd, rows[0].passwd);
            fn(error, verified);
        }); 
    }


    public getMovie = (id: number, fn: Function) => {
        this.mysqlDBC.connection();
        const statement = this.mysqlDBC.statement(`SELECT DISTINCT movie.movie_id, title, homepage, overview, popularity, release_date, vote_average, genre_name
        FROM ??, ??, ?? 
        WHERE movie.movie_id = movie_genres.movie_id
        AND movie_genres.genre_id = genre.genre_id
        AND movie.movie_id = ${id}`, 
        ['movie', 'genre', 'movie_genres']);
        this.mysqlDBC.pool.query(statement, (error: any, rows: any) => {            
            fn(error, rows);
        });
    }

    public updateTitleMovie = (data: { id: number, title: string }, fn: Function) => {
        this.mysqlDBC.connection();
        const statement = this.mysqlDBC.statement(`UPDATE movie SET movie.title = ? WHERE movie.movie_id = ?`, 
        [data.title, data.id.toString()]);
        this.mysqlDBC.pool.query(statement, (error: any, rows: any) => {            
            fn(error, rows);
        });
    }
}