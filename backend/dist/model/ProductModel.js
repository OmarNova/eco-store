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
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
/*const productSchema = new Schema<IProduct>({

  nombre:  { type: String, required: true },
  contenido:  { type: String, required: true },
  precio:  { type: Number, required: true },
  moneda:  { type: String, required: true },
  sale:  { type: String, required: true },
  img:  { type: String, required: true },
  Descripcion:  { type: String, required: true }
});*/
// 3. Create a Model.
//const product = model<IProduct>('User', productSchema);
class ProductModel {
    constructor() {
        this.getProducts = () => __awaiter(this, void 0, void 0, function* () {
            const productModel = (0, mongoose_1.model)('products', this.productSchema);
            const product = yield productModel.find();
            return product;
        });
        this.getProductsPage = (page) => __awaiter(this, void 0, void 0, function* () {
            const productModel = (0, mongoose_1.model)('products', this.productSchema);
            let final = page * 12;
            let inicio = final - 12;
            if (page == 1) {
                const product = yield productModel.find().limit(12);
                return product;
            }
            else {
                const product = yield productModel.find().skip(inicio).limit(final);
                return product;
            }
            return null;
        });
        this.productSchema = new mongoose_1.Schema({
            nombre: { type: String, required: true },
            contenido: { type: String, required: true },
            precio: { type: Number, required: true },
            moneda: { type: String, required: true },
            sale: { type: String, required: true },
            img: { type: String, required: true },
            Descripcion: { type: String, required: true }
        });
    }
}
exports.default = ProductModel;
