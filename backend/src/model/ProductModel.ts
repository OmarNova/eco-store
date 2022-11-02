import { Schema, model, connect } from 'mongoose';
import MongoDBC from "../db/mongo/MongoDBC";



class ProductModel {

    private mongoDBC: MongoDBC;

    constructor() {
        this.mongoDBC = new MongoDBC();
    }

    public getProducts = async () => {
        this.mongoDBC.connection();
        const product = await this.mongoDBC.product.find();
        return product
    }

    public getProductSearch = async (consulta: string) => {
        this.mongoDBC.connection();
        const query = ".*" + consulta + "*.";
        const product = await this.mongoDBC.product.find({"nombre": {"$regex": query, "$options": "i"}});
   
        return product
    }


    public getProductsPage = async (page: number) => {
        this.mongoDBC.connection();
       
        let final = page * 12;
        let inicio = final-12;

        if(page==1){
            const product = await this.mongoDBC.product.find().limit(12);
            return product;
        }else{
            const product = await this.mongoDBC.product.find().skip(inicio).limit(final);
            return product;
        }
        return null;
    }




}

export default ProductModel;

