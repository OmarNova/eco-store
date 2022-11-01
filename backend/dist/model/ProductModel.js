"use strict";
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
        this.getProducts = () => {
            return (0, mongoose_1.model)('products', this.productSchema);
        };
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
