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
const MongoDBC_1 = __importDefault(require("../db/mongo/MongoDBC"));
class ProductModel {
    constructor() {
        this.getProducts = () => __awaiter(this, void 0, void 0, function* () {
            this.mongoDBC.connection();
            const product = yield this.mongoDBC.product.find();
            return product;
        });
        this.getProductSearch = (consulta) => __awaiter(this, void 0, void 0, function* () {
            this.mongoDBC.connection();
            const query = ".*" + consulta + "*.";
            const product = yield this.mongoDBC.product.find({ "nombre": { "$regex": query, "$options": "i" } });
            let result = [];
            for (let index = 0; index < 12; index++) {
                if (typeof product[index] == "undefined") {
                    break;
                }
                result.push(product[index]);
            }
            return { product: result, length: product.length };
        });
        this.getProductById = (consulta) => __awaiter(this, void 0, void 0, function* () {
            this.mongoDBC.connection();
            const product = yield this.mongoDBC.product.findOne({ _id: consulta });
            return product;
        });
        this.getProductPrice = (precio) => __awaiter(this, void 0, void 0, function* () {
            this.mongoDBC.connection();
            const product = yield this.mongoDBC.product.find({ "precio": { "$lte": precio } });
            let result = [];
            for (let index = 0; index < 12; index++) {
                if (typeof product[index] == "undefined") {
                    break;
                }
                result.push(product[index]);
            }
            return { product: result, length: product.length };
        });
        this.getProductSearchPrice = (consulta, precio) => __awaiter(this, void 0, void 0, function* () {
            this.mongoDBC.connection();
            const query = ".*" + consulta + "*.";
            const product = yield this.mongoDBC.product.find({ "nombre": { "$regex": query, "$options": "i" }, "precio": { "$lte": precio } });
            let result = [];
            for (let index = 0; index < 12; index++) {
                if (typeof product[index] == "undefined") {
                    break;
                }
                result.push(product[index]);
            }
            return { product: result, length: product.length };
        });
        this.getProductsPage = (page) => __awaiter(this, void 0, void 0, function* () {
            this.mongoDBC.connection();
            let final = page * 12;
            let inicio = final - 12;
            if (page == 1) {
                const product = yield this.mongoDBC.product.find();
                let result = [];
                for (let index = 0; index < 12; index++) {
                    if (typeof product[index] == "undefined") {
                        break;
                    }
                    result.push(product[index]);
                }
                return { product: result, length: product.length };
            }
            else {
                const product = yield this.mongoDBC.product.find();
                let result = [];
                for (let index = inicio; index < final; index++) {
                    if (typeof product[index] == "undefined") {
                        break;
                    }
                    result.push(product[index]);
                }
                return { product: result, length: product.length };
            }
        });
        this.getProductsPageSearch = (Search, page) => __awaiter(this, void 0, void 0, function* () {
            this.mongoDBC.connection();
            let final = page * 12;
            let inicio = final - 12;
            const query = ".*" + Search + "*.";
            if (page == 1) {
                const product = yield this.mongoDBC.product.find({ "nombre": { "$regex": query, "$options": "i" } });
                let result = [];
                for (let index = 0; index < 12; index++) {
                    if (typeof product[index] == "undefined") {
                        break;
                    }
                    result.push(product[index]);
                }
                return { product: result, length: product.length };
            }
            else {
                const product = yield this.mongoDBC.product.find({ "nombre": { "$regex": query, "$options": "i" } });
                let result = [];
                for (let index = inicio; index < final; index++) {
                    if (typeof product[index] == "undefined") {
                        break;
                    }
                    result.push(product[index]);
                }
                return { product: result, length: product.length };
            }
        });
        this.getProductsPagePrice = (precio, page) => __awaiter(this, void 0, void 0, function* () {
            this.mongoDBC.connection();
            let final = page * 12;
            let inicio = final - 12;
            if (page == 1) {
                const product = yield this.mongoDBC.product.find({ "precio": { "$lte": precio } });
                let result = [];
                for (let index = 0; index < 12; index++) {
                    if (typeof product[index] == "undefined") {
                        break;
                    }
                    result.push(product[index]);
                }
                return { product: result, length: product.length };
            }
            else {
                const product = yield this.mongoDBC.product.find({ "precio": { "$lte": precio } });
                let result = [];
                for (let index = inicio; index < final; index++) {
                    if (typeof product[index] == "undefined") {
                        break;
                    }
                    result.push(product[index]);
                }
                return { product: result, length: product.length };
            }
        });
        this.getProductsPagePriceSearch = (search, precio, page) => __awaiter(this, void 0, void 0, function* () {
            this.mongoDBC.connection();
            let final = page * 12;
            let inicio = final - 12;
            const query = ".*" + search + "*.";
            if (page == 1) {
                const product = yield this.mongoDBC.product.find({ "nombre": { "$regex": query, "$options": "i" }, "precio": { "$lte": precio } });
                let result = [];
                for (let index = 0; index < 12; index++) {
                    if (typeof product[index] == "undefined") {
                        break;
                    }
                    result.push(product[index]);
                }
                return { product: result, length: product.length };
            }
            else {
                const product = yield this.mongoDBC.product.find({ "nombre": { "$regex": query, "$options": "i" }, "precio": { "$lte": precio } });
                let result = [];
                for (let index = inicio; index < final; index++) {
                    if (typeof product[index] == "undefined") {
                        break;
                    }
                    result.push(product[index]);
                }
                return { product: result, length: product.length };
            }
        });
        this.mongoDBC = new MongoDBC_1.default();
    }
}
exports.default = ProductModel;
