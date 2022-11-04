"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const productSchema = new mongoose_1.Schema({
    _id: { type: String, required: true },
    nombre: { type: String, required: true },
    contenido: { type: String, required: true },
    precio: { type: Number, required: true },
    moneda: { type: String, required: true },
    sale: { type: String, required: true },
    img: { type: String, required: true },
    Descripcion: { type: String, required: true }
});
exports.default = (0, mongoose_1.model)('products', productSchema);
