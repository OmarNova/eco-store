import { Request, Response } from "express";
import UserModel from "../model/UserModel";

class UserController {

    private model: UserModel;

    constructor() {
        this.model = new UserModel();
    }

    public index = (req: Request, res: Response) => res.json({ 'error': 0, 'msg': 'API: node-express-ts' });

    public getUser =  (req: Request, res: Response) => {
        const { email } =  req.params;
        this.model.getUser(email, (error: any, rows: any) => {
            if (error) {
                console.error(error);
                return res.json({ error: true, message: 'e101' });
            }            
            if (rows) {
                return res.json(rows);
            } else {
                return res.status(404).json({ error: false, message: 'Movie not found' });
            }
        });
    }



}

export default UserController;