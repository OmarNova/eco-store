import { Router } from "express";
import BackendController from "../controller/BackendController"

class BackendRoute {

    public router: Router;
    private backendController: BackendController;

    constructor() {
        this.router = Router();
        this.backendController = new BackendController();
        this.config();
    }

    public config = (): void => {
        this.router.get('/', this.backendController.index);
        this.router.get('/people/:id', this.backendController.getPeople);
        this.router.post('/people/', this.backendController.insertPeople);
        this.router.put('/people/', this.backendController.updatePeople);
        this.router.delete('/people/', this.backendController.deletePeople);
    }

}

export default BackendRoute;