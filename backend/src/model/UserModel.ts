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


    public getUser = (email: string, fn: Function) => {
        this.mysqlDBC.connection();
        const statement = `SELECT * FROM users WHERE email='${email}'`;
        this.mysqlDBC.pool.query(statement, (error: any, rows: any) => {
            fn(error, rows);
        }); 
       
    }

    public getFavorites = (id: number, fn: Function) => {
        this.mysqlDBC.connection();
        const statement = `SELECT DISTINCT productos_idproductos FROM productos_has_users WHERE users_id=${id};`;
        this.mysqlDBC.pool.query(statement, (error: any, rows: any) => {
            fn(error, rows);
        }); 
       
    }

    public postFavorites = (idUser: number, idProduct: string ,fn: Function) => {
        this.mysqlDBC.connection();
        const statement = `INSERT INTO productos_has_users(users_id,productos_idproductos) VALUES (${idUser},'${idProduct}')`;
        this.mysqlDBC.pool.query(statement, (error: any, rows: any) => {
            fn(error, rows);
        }); 
    }

    public postPedido = (idUser: number, total: number ,fn: Function) => {
        this.mysqlDBC.connection();
        this.mysqlDBC.pool.query(`INSERT INTO pedidos(users_id,total) VALUES (${idUser},${total});`);
        const statement = `SELECT pedidos.id FROM pedidos,users WHERE users.id=${idUser} AND users.id = pedidos.users_id`;
        this.mysqlDBC.pool.query(statement, (error: any, rows: any) => {
            fn(error, rows);
        }); 
    }

    public postCompra = (idUser: number, cantidad: number, idProduct: string, idPedidos: number) => {
        this.mysqlDBC.connection();
        const statement = `INSERT INTO pedidos_has_productos(pedidos_id,pedidos_users_id,productos_idproductos,cantidad) VALUES (${idPedidos},${idUser},'${idProduct}',${cantidad});`;
        this.mysqlDBC.pool.query(statement); 
    }

    public deleteFavorites = (idUser: number, idProduct: string ,fn: Function) => {
        this.mysqlDBC.connection();
        const statement = `DELETE FROM productos_has_users WHERE users_id=${idUser} AND productos_idproductos='${idProduct}'`;
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

}