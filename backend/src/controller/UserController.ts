import { Request, Response } from "express";
import UserModel from "../model/UserModel";
import jwt from "jsonwebtoken";
import config from "../config/config"

class UserController {

    private model: UserModel;

    constructor() {
        this.model = new UserModel();
    }

    public index = (req: Request, res: Response) => res.json({ 'error': 0, 'msg': 'API: node-express-ts' });

    public getUser =  (req: Request, res: Response) => {
        if(req.session.email){
            console.log(req.session.email);
        }
    
        const { email } =  req.params;
        this.model.getUser(email, (error: any, rows: any) => {
            if (error) {
                console.error(error);
                return res.json({ error: true, message: 'e101' });
            }            
            if (rows.length != 0) {
                return res.json(rows);
            } else {
                return res.status(404).json({ error: false, message: 'User not Found' });
            }
        });
    }

    public registerUser = (req: Request, res: Response) => {
     
        if(JSON.stringify(req.body) != "{}") {
            this.model.getUser(req.body.email, (error: any, rows: any) => {
                if (error) {
                    console.error(error);
                    return res.json({ error: true, message: 'Error in database' });
                }            
                if (rows.length == 0) {
                    this.model.insertUser( {nombres: req.body.nombres,apellidos: req.body.apellidos,email: req.body.email,passwd: req.body.passwd}, (error: any, rows: any) => {
                        if (error) {
                            console.error(error);
                            return res.json({ error: true, message: 'Error in database' });
                        } else {
                            return res.json({ error: false, message: 'User Insert' });
                        }
                    });
                } else {
                    return res.status(404).json({ error: true, message: 'User Already Exists' });
                }
            });
        } else {
            return res.status(404).json({ error: true, message: 'Data not found' });
        }
    }

    public logoutUser = (req: Request, res: Response) => {

        if(req.session.email){
            req.session.destroy((err) => {
                if(err) throw err;
                return res.json({ error: false, message: 'Logout' });
            });
        }else{
            return res.json({ error: true, message: 'Sessions Not Exists' });
        }
    }


    public loginUser = (req: Request, res: Response) => {
     
        if(JSON.stringify(req.body) != "{}") {
            this.model.getUser(req.body.email, (error: any, rows: any) => {
                if (error) {
                    console.error(error);
                    return res.json({ error: true, message: 'e101' });
                }            
                if (rows.length != 0) {
                    this.model.login( {email: req.body.email,passwd: req.body.passwd}, (error: any, rows: any) => {
                        if (error) {
                            console.error(error);
                            return res.json({ error: true, message: 'Error in database' });
                        } else if (rows) {

                            jwt.sign({email: req.body.email}, config.jwt.key, (err: any,token: any) =>{
                                req.session.email = token;
                                return res.json({ error: false, message: token });
                            } );    

                        }else{
                            return res.json({ error: true, message: 'Password incorrect' });
                        }
                    });
                } else {
                    return res.status(404).json({ error: true, message: 'User Not Exists' });
                }
            });
        } else {
            return res.status(404).json({ error: true, message: 'Data not found' });
        }
    }

}

export default UserController;