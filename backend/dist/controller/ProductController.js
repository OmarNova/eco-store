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
const mongoose_1 = __importDefault(require("mongoose"));
const config_1 = __importDefault(require("../config/config"));
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
class ProductController {
    constructor() {
        this.index = (req, res) => res.json({ 'error': 0, 'msg': 'API: node-express-ts' });
        this.getProduct = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const product = yield this.model.getProducts();
            console.log(req.query.name);
            if (product) {
                return res.send(product);
            }
            return res.json({ 'error': 1, 'msg': 'API: id no found' });
        });
        this.getProductPage = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const product = yield this.model.getProductsPage(parseInt(id));
            if (product) {
                return res.send(product);
            }
            return res.json({ 'error': 1, 'msg': 'API: id no found' });
        });
        this.getProductRange = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const precio_inicial = req.query.priceinit;
            const precio_final = req.query.pricefinal;
            const product = yield this.model.getProducts();
            if (product) {
                return res.send(product);
            }
            return res.json({ 'error': 1, 'msg': 'API: id no found' });
        });
        this.getProductSearch = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const search = req.query.search;
            if (!search) {
                return this.getProduct(req, res);
            }
            const product = yield this.model.getProductSearch(search);
            if (product) {
                return res.send(product);
            }
            return res.json({ 'error': 1, 'msg': 'API: id no found' });
        });
        this.getImageProduct = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const dir = path_1.default.join(__dirname, '../src-eco-store/' + id + '.jpg');
            if (fs_1.default.existsSync(dir)) {
                return res.sendFile(dir);
            }
            return res.json({ 'error': 1, 'msg': 'API: id no found' });
        });
        mongoose_1.default.connect(config_1.default.DB.URI);
        this.model = new ProductModel_1.default();
    }
}
exports.default = ProductController;
