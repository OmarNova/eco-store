import { Request, Response } from "express";
import UserModel from "../model/UserModel";
import jwt from "jsonwebtoken";
import config from "../config/config"
import ProductModel from "../model/ProductModel";

class UserController {

    private model: UserModel;

    constructor() {
        this.model = new UserModel();
    }

    public index = (req: Request, res: Response) => res.json({ 'error': 0, 'msg': 'API: node-express-ts' });

    public getFavorites = (req: Request, res: Response) => {
        const productModel: ProductModel = new ProductModel();

        const email = req.params.email;
        this.model.getUser(email, (error: any, rows: any) => {
            if (error) {console.error(error);return { error: true, message: 'error database' };}   

            if (rows.length != 0) {
                this.model.getFavorites(rows[0].id, async (error: any, rows: any) => {
                    if (error) {console.error(error);return { error: true, message: 'error database' };}
                    if(rows.length != 0){
                        let data = []
                        for (let index = 0; index < rows.length; index++) {
                            const a = await productModel.getProductById(rows[index].productos_idproductos);
                            data.push(a);
                        }
                        return res.json({ error: false, message: "Ok", data: data });
                    }else{
                        return res.json({ error: true, message: "Not Favorites" });
                    }
                });
                
            } else {
                return res.status(404).json({ error: true, message: 'User not Found' });
            }
        });

    }

    public postFavorites = (req: Request, res: Response) => {

        if(JSON.stringify(req.body) != "{}") {

            const email = req.params.email;
            const idProduct = req.body.idProduct;
            this.model.getUser(email, (error: any, rows: any) => {
                if (error) {console.error(error);return { error: true, message: 'error database' };}   
    
                if (rows.length != 0) {
                    this.model.postFavorites(rows[0].id, idProduct , async (error: any, rows: any) => {
                        if (error) {console.error(error);return { error: true, message: 'error database' };}
                        return res.json({error: false, message: "Ok"});
                    });
                    
                } else {
                    return res.status(404).json({ error: true, message: 'User not Found' });
                }
            });
        } else {
            return res.status(404).json({ error: true, message: 'Data not found' });
        }
    }

    public deleteFavorites = (req: Request, res: Response) => {

        
        const email = req.params.email;
        const {idProduct} = req.params;
        this.model.getUser(email, (error: any, rows: any) => {
            if (error) {console.error(error);return { error: true, message: 'error database' };}   

            if (rows.length != 0) {
                this.model.deleteFavorites(rows[0].id, idProduct , async (error: any, rows: any) => {
                    if (error) {console.error(error);return { error: true, message: 'error database' };}
                    return res.json({error: false, message: "Ok"});
                });
                
            } else {
                return res.status(404).json({ error: true, message: 'User not Found' });
            }
        });
      
    }

    public registerUser = (req: Request, res: Response) => {
     
        if(JSON.stringify(req.body) != "{}") {
            this.model.getUser(req.body.email, (error: any, rows: any) => {
                if (error) {console.error(error);return { error: true, message: 'error database' };}  

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
                    return res.json({ error: true, message: 'User Already Exists' });
                }
            });
        } else {
            return res.status(404).json({ error: true, message: 'Data not found' });
        }
    }

    public loginUser = (req: Request, res: Response) => {
     
        if(JSON.stringify(req.body) != "{}") {
            this.model.getUser(req.body.email, (error: any, rows: any) => {
                if (error) {console.error(error);return { error: true, message: 'error database' };}    

                if (rows.length != 0) {
                    this.model.login( {email: req.body.email,passwd: req.body.passwd}, (error: any, rows: any) => {
                        if (error) {
                            console.error(error);
                            return res.json({ error: true, message: 'Error in database' });
                        } else if (rows) {
                            const token = jwt.sign({email: req.body.email}, config.jwt.key);   
                            return res.json({ error: false, message: token }); 
                        }else{
                            return res.json({ error: true, message: 'Password incorrect' });
                        }
                    });
                } else {
                    return res.json({ error: true, message: 'User Not Exists' });
                }
            });
        } else {
            return res.status(404).json({ error: true, message: 'Data not found' });
        }
    }

    public buy = (req: Request, res: Response) => {
        const email = req.params.email;
        const carrito = req.body.carrito;
        this.model.getUser(email, (error: any, rows: any) => {
            if (error) {console.error(error);return { error: true, message: 'error database' };}   

            if (rows.length != 0) {
                const idUser = rows[0].id;
                this.model.postPedido(idUser,req.body.total,(error:any, rows:any)=> {
                    for (let index = 0; index < carrito.length; index++) {
                        this.model.postCompra(idUser,carrito[index].cantidad,carrito[index].data._id,rows[rows.length-1].id);
                    }
                });
                
            } else {
                return res.status(404).json({ error: true, message: 'User not Found' });
            }
        });
    }

}

export default UserController;