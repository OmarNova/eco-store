import mysql, { Pool } from "mysql";
import config from "../../config/config"

export default class MysqlDBC {

    public pool: Pool;

    constructor() {
        this.pool = mysql.createPool(
            {
                connectionLimit: parseInt(process.env.DBCONNLIMIT || '10'),
                host: process.env.DBHOST || config.DBMYSQL.host,
                port: parseInt(process.env.DBPORT || config.DBMYSQL.port),
                user: process.env.DBUSER || config.DBMYSQL.user,
                password: process.env.DBPASSWD || config.DBMYSQL.password,
                database: process.env.DBNAME || config.DBMYSQL.database,
                debug: false
            }
        );        
    }

    public connection = () => {
        this.pool.getConnection((err, connection) => { 
            if (err) throw err;
            connection.release();
            console.info('DB: pool connection');
        });
    }

    public statement(statement: string, data: string[]) {
        return mysql.format(statement, data);        
    }

    public limit = (start: number, step: number = parseInt(process.env.DBPAG || '10')): number[] => {
        let limit = [1, 9];
        if (start) {
            start = (start > 0) ? (start - 1) * step : 1;
            limit = [start, step];
        }
        return limit;
    }

}