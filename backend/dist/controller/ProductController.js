"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ProductModel_1 = __importDefault(require("../model/ProductModel"));
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
class ProductController {
    constructor() {
        this.index = (req, res) => res.json({ 'error': 0, 'msg': 'API: node-express-ts' });
        this.getProductById = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const product = yield this.model.getProductById(id);
            return res.json(product);
        });
        this.getProduct = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const page = parseInt(req.query.page);
            const precio = parseInt(req.query.price);
            const search = req.query.search;
            if (search && page && precio) {
                const product = yield this.model.getProductsPagePriceSearch(search, precio, page);
                if (product) {
                    return res.json(product);
                }
            }
            if (page && precio) {
                const product = yield this.model.getProductsPagePrice(precio, page);
                if (product) {
                    return res.json(product);
                }
            }
            if (search && precio) {
                const product = yield this.model.getProductSearchPrice(search, precio);
                if (product) {
                    return res.json(product);
                }
            }
            if (search && page) {
                const product = yield this.model.getProductsPageSearch(search, page);
                if (product) {
                    return res.json(product);
                }
            }
            if (page) {
                const product = yield this.model.getProductsPage(page);
                if (product) {
                    return res.json(product);
                }
            }
            if (precio) {
                const product = yield this.model.getProductPrice(precio);
                if (product) {
                    return res.json(product);
                }
            }
            if (search) {
                const product = yield this.model.getProductSearch(search);
                if (product) {
                    return res.json(product);
                }
            }
            const product = yield this.model.getProductsPage(1);
            if (product) {
                return res.json(product);
            }
            return res.json({ 'error': 1, 'msg': 'API: id no found' });
        });
        this.getProductPriceMax = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const product = yield this.model.getProducts();
            let precio = 0;
            for (let index = 0; index < product.length; index++) {
                if (precio < product[index].precio) {
                    precio = product[index].precio;
                }
            }
            res.json({ precioMax: Math.ceil(precio) });
        });
        this.getImageProduct = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const dir = path_1.default.join(__dirname, '../src-eco-store/' + id + '.jpg');
            if (fs_1.default.existsSync(dir)) {
                return res.sendFile(dir);
            }
            return res.json({ 'error': 1, 'msg': 'API: id no found' });
        });
        this.model = new ProductModel_1.default();
    }
}
exports.default = ProductController;
