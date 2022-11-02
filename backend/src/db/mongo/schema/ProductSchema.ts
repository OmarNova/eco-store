import { Schema, model } from "mongoose";
import IProduct from "db/mongo/interface/IProduct";



const productSchema = new Schema({

    nombre:  { type: String, required: true },
    contenido:  { type: String, required: true },
    precio:  { type: Number, required: true },
    moneda:  { type: String, required: true },
    sale:  { type: String, required: true },
    img:  { type: String, required: true },
    Descripcion:  { type: String, required: true }
    
  });



export default model<IProduct>('products', productSchema);