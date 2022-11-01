"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const ProductController_1 = __importDefault(require("../controller/ProductController"));
class ProductRoute {
    constructor() {
        this.config = () => {
            this.router.get('/', this.ProductController.index);
            this.router.get('/product/', this.ProductController.getProduct);
            this.router.get('/productSearch/', this.ProductController.getProductSearch);
            this.router.get('/product/:id', this.ProductController.getProductPage);
            this.router.get('/productImage/:id', this.ProductController.getImageProduct);
        };
        this.router = (0, express_1.Router)();
        this.ProductController = new ProductController_1.default();
        this.config();
    }
}
exports.default = ProductRoute;
