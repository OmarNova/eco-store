import { Router } from "express";
import ProductController from "../controller/ProductController"

class ProductRoute {

    public router: Router;
    private ProductController: ProductController;

    constructor() {
        this.router = Router();
        this.ProductController = new ProductController();
        this.config();
    }

    public config = (): void => {
        this.router.get('/', this.ProductController.index);
        this.router.get('/product/', this.ProductController.getProduct);
        this.router.get('/productSearch/', this.ProductController.getProductSearch);
        this.router.get('/product/:id', this.ProductController.getProductPage);
        this.router.get('/productImage/:id', this.ProductController.getImageProduct);
      
    }

}

export default ProductRoute;