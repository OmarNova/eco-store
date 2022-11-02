import { Request, Response } from "express";
import ProductModel from "../model/ProductModel";
import path from 'path'
import fs from 'fs'

class ProductController {

    private model: ProductModel;

    constructor() {
        this.model = new ProductModel();
    }

    public index = (req: Request, res: Response) => res.json({ 'error': 0, 'msg': 'API: node-express-ts' });

    public getProduct = async (req: Request, res: Response) => {
        const product = await this.model.getProducts();
        if (product) {
            return res.send(product);
        }
        return res.json({ 'error': 1, 'msg': 'API: id no found' });
    }

    public getProductPage = async (req: Request, res: Response) => {
        const { id } =  req.params;
        const product = await this.model.getProductsPage(parseInt(id));

        if (product) {
            return res.send(product);
        }
        return res.json({ 'error': 1, 'msg': 'API: id no found' });
    }

    public getProductRange = async (req: Request, res: Response) => {
        const precio_inicial = req.query.priceinit;
        const precio_final = req.query.pricefinal;
        const product = await this.model.getProducts();

        if (product) {
            return res.send(product);
        }
        return res.json({ 'error': 1, 'msg': 'API: id no found' });
    }

    public getProductSearch = async (req: Request, res: Response) => {
        const search = req.query.search as string;

        if(!search){
            return this.getProduct(req,res);
        }
        
        const product = await this.model.getProductSearch(search);

        if (product) {
            return res.send(product);
        }
        return res.json({ 'error': 1, 'msg': 'API: id no found' });
    }

    public getImageProduct = async (req: Request, res: Response) => {
        const { id } = req.params;
        const dir = path.join(__dirname, '../src-eco-store/' + id + '.jpg');
        if (fs.existsSync(dir)) {
            return res.sendFile(dir);
        }
        return res.json({ 'error': 1, 'msg': 'API: id no found' });
    }



}

export default ProductController;