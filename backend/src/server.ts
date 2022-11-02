import express, { Application, json, urlencoded } from "express";
import ProductRoute from "./route/ProductRoute";
import cors from 'cors';


class Server {

    private backend: Application;
    private productRoute: ProductRoute;

    constructor() {
        this.backend = express();
        this.productRoute = new ProductRoute();
        this.config();
        this.route();
        this.start();
    }

    public config = (): void => {
        this.backend.set('port', 1802);
        this.backend.use(urlencoded({extended: true}));
        this.backend.use(json());
        this.backend.use(cors());
    }

    public route = (): void => {
        this.backend.use('/api', this.productRoute.router);
    }

    public start = (): void => {
        this.backend.listen(this.backend.get('port'), () => {
            console.log('Server on port:', this.backend.get('port'));
        });
    }

}

const server = new Server();