import mongoose from "mongoose";
import Product from "./schema/ProductSchema";
import config from "../../config/config"


export default class MongoDBC {

    private uri: string;
    public product: any;

    constructor() {
        this.uri = config.DB.URI;   
        this.product = Product;
    }

    public connection = () => {        
        mongoose.connect(this.uri)
            .then(() => {
                return console.info('DB: Mongo connection');
            })
            .catch(error => {
                console.error('Error connecting to Mongodb: ', error);
                return process.exit(1);
            });
    };

}