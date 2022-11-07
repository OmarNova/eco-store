import MongoDBC from "../db/mongo/MongoDBC";

class ProductModel {

    private mongoDBC: MongoDBC;

    constructor() {
        this.mongoDBC = new MongoDBC();
    }

    public getProducts = async () => {
        this.mongoDBC.connection();
        const product = await this.mongoDBC.product.find();
        return product;
    }

    public getProductSearch = async (consulta: string) => {
        this.mongoDBC.connection();
        const query = ".*" + consulta + "*.";
        const product = await this.mongoDBC.product.find({"nombre": {"$regex": query, "$options": "i"}});
   
        let result = []
            for (let index = 0; index < 12; index++) {
                if(typeof product[index] == "undefined"){
                    break;
                }
                result.push(product[index]);
            }
        return {product: result, length: product.length};
    }

    public getProductById = async (consulta: string) => {
        this.mongoDBC.connection();
        const product = await this.mongoDBC.product.findOne({_id: consulta});
        return product;
    }

    public getProductPrice = async (precio: number) => {
        this.mongoDBC.connection();
        const product = await this.mongoDBC.product.find({"precio": {"$lte": precio}});
        let result = []
            for (let index = 0; index < 12; index++) {
                if(typeof product[index] == "undefined"){
                    break;
                }
                result.push(product[index]);
            }
        return {product: result, length: product.length};
    }

    public getProductSearchPrice = async (consulta: string, precio: number) => {
        this.mongoDBC.connection();
        const query = ".*" + consulta + "*.";
        const product = await this.mongoDBC.product.find({"nombre": {"$regex": query, "$options": "i"}, "precio": {"$lte": precio}});
        let result = []
            for (let index = 0; index < 12; index++) {
                if(typeof product[index] == "undefined"){
                    break;
                }
                result.push(product[index]);
            }
        return {product: result, length: product.length};
    }


    public getProductsPage = async (page: number) => {
        this.mongoDBC.connection();
       
        let final = page * 12;
        let inicio = final-12;

        if(page==1){
            const product = await this.mongoDBC.product.find();
            let result = []
            for (let index = 0; index < 12; index++) {
                if(typeof product[index] == "undefined"){
                    break;
                }
                result.push(product[index]);
            }
            return {product: result, length: product.length};
        }else{
            const product = await this.mongoDBC.product.find();
            let result = []
            for (let index = inicio; index < final; index++) {
                if(typeof product[index] == "undefined"){
                    break;
                }
                result.push(product[index]);
            }
            return {product: result, length: product.length};
        }
    }

    public getProductsPageSearch = async (Search: string, page: number) => {
        this.mongoDBC.connection();
       
        let final = page * 12;
        let inicio = final-12;
        const query = ".*" + Search + "*.";
   
        if(page==1){
            const product = await this.mongoDBC.product.find({"nombre": {"$regex": query, "$options": "i"}});
            let result = []
            for (let index = 0; index < 12; index++) {
                if(typeof product[index] == "undefined"){
                    break;
                }
                result.push(product[index]);
            }
            return {product: result, length: product.length};
        }else{
            const product = await this.mongoDBC.product.find({"nombre": {"$regex": query, "$options": "i"}});
            let result = []
            for (let index = inicio; index < final; index++) {
                if(typeof product[index] == "undefined"){
                    break;
                }
                result.push(product[index]);
            }
            return {product: result, length: product.length};
        }
    }

    public getProductsPagePrice= async (precio: number, page: number) => {
        this.mongoDBC.connection();
       
        let final = page * 12;
        let inicio = final-12;
        if(page==1){
            const product = await this.mongoDBC.product.find({"precio": {"$lte": precio}});
            let result = []
            for (let index = 0; index < 12; index++) {
                if(typeof product[index] == "undefined"){
                    break;
                }
                result.push(product[index]);
            }
            return {product: result, length: product.length};
        }else{
            const product = await this.mongoDBC.product.find({"precio": {"$lte": precio}});
            let result = []
            for (let index = inicio; index < final; index++) {
                if(typeof product[index] == "undefined"){
                    break;
                }
                result.push(product[index]);
            }
            return {product: result, length: product.length};
        }
    }

    public getProductsPagePriceSearch = async (search: string, precio: number, page: number) => {
        this.mongoDBC.connection();
        let final = page * 12;
        let inicio = final-12;
        const query = ".*" + search + "*.";
        if(page==1){
            const product = await this.mongoDBC.product.find({"nombre": {"$regex": query, "$options": "i"}, "precio": {"$lte": precio}});
            let result = []
            for (let index = 0; index < 12; index++) {
                if(typeof product[index] == "undefined"){
                    break;
                }
                result.push(product[index]);
            }
            return {product: result, length: product.length};
        }else{
            const product = await this.mongoDBC.product.find({"nombre": {"$regex": query, "$options": "i"}, "precio": {"$lte": precio}})
            let result = []
            for (let index = inicio; index < final; index++) {
                if(typeof product[index] == "undefined"){
                    break;
                }
                result.push(product[index]);
            }
            return {product: result, length: product.length};
        }
    }




}

export default ProductModel;

