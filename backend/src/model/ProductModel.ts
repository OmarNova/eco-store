import { Schema, model, connect } from 'mongoose';
import { IProduct } from '../interface/IProduct';

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

    public getProducts = async () => {
        
        const productModel = model<IProduct>('products', this.productSchema);
        const product = await productModel.find();
        return product
    }

    public getProductSearch = async (consulta: string) => {
        const query = ".*" + consulta + "*.";
        const productModel = model<IProduct>('products', this.productSchema);
        const product = await productModel.find({"nombre": {"$regex": query, "$options": "i"}});
   
        return product
    }


    public getProductsPage = async (page: number) => {
        
        const productModel = model<IProduct>('products', this.productSchema);
       
        let final = page * 12;
        let inicio = final-12;

        if(page==1){
            const product = await productModel.find().limit(12);
            return product;
        }else{
            const product = await productModel.find().skip(inicio).limit(final);
            return product;
        }
        return null;
    }




}

export default ProductModel;

