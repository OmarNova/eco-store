import { Schema, model, connect } from 'mongoose';
import { IProduct } from '../interface/IProduct';


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

    private productSchema: Schema<IProduct>;

    constructor() {

      this.productSchema = new Schema<IProduct>({

        nombre:  { type: String, required: true },
        contenido:  { type: String, required: true },
        precio:  { type: Number, required: true },
        moneda:  { type: String, required: true },
        sale:  { type: String, required: true },
        img:  { type: String, required: true },
        Descripcion:  { type: String, required: true }
      });
    }

    public getProducts = () => {
        return model<IProduct>('products', this.productSchema);
    }




}

export default ProductModel;

