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

    public getProductById = async (req: Request, res: Response) => {
        const { id } = req.params;
        const product = await this.model.getProductById(id);
        return res.json(product);
    }

    public getProduct = async (req: Request, res: Response) => {

        const page = parseInt(req.query.page as string);
        const precio = parseInt(req.query.price as string);
        const search = req.query.search as string;
        if(search && page && precio){
            const product = await this.model.getProductsPagePriceSearch(search,precio,page);
            if (product) {
                 return  res.json(product);
            }
        }

        if(page && precio){
            const product = await this.model.getProductsPagePrice(precio,page);
            if (product) {
                 return  res.json(product);
            }
        }

        if(search && precio){
            const product = await this.model.getProductSearchPrice(search,precio);
            if (product) {
                 return  res.json(product);
            }
        }

        if(search && page){
            const product = await this.model.getProductsPageSearch(search,page);
            if (product) {
                 return  res.json(product);
            }
        }

        if(page){
            const product = await this.model.getProductsPage(page);
            if (product) {
                 return  res.json(product);
            }
        }

        if(precio){
            const product = await this.model.getProductPrice(precio);
            if (product) {
                 return  res.json(product);
            }
        }

        if(search){
            const product = await this.model.getProductSearch(search);

            if (product) {
                 return  res.json(product);
            }
        }

        const product = await this.model.getProductsPage(1);
        if (product) {
             return  res.json(product);
        }

        return res.json({ 'error': 1, 'msg': 'API: id no found' });
    }

    public getProductPriceMax = async (req: Request, res: Response) => {
        const product = await this.model.getProducts();
        let precio = 0;
        for (let index = 0; index < product.length; index++) {
           if(precio < product[index].precio){
            precio = product[index].precio;
           } 
        }
        res.json({precioMax: Math.ceil(precio)});
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