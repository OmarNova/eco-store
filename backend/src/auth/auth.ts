import { Request, Response, NextFunction } from "express";
import  jwt from "jsonwebtoken";
import config from "../config/config"


export default async function verifyToken (req: Request, res: Response, next: NextFunction)  {
    const token = req.headers['authorization'];
    if(!token){
        return res.status(403).json({error: true, message: "No Token Provided"});
    }
    const decoded = JSON.parse(JSON.stringify(jwt.verify(token,config.jwt.key)));
    req.params.email = decoded.email;
    next();
}