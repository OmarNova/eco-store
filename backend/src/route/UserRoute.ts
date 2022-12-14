import { Router } from "express";
import UserController from "../controller/UserController"
import auth from "../middleware/auth";

class UserRoute {

    public router: Router;
    private UserController: UserController;

    constructor() {
        this.router = Router();
        this.UserController = new UserController();
        this.config();
    }

    public config = (): void => {
        this.router.get('/', this.UserController.index);

        this.router.get('/user/favorites/', auth, this.UserController.getFavorites);
        this.router.post('/user/favorites/', auth, this.UserController.postFavorites);
        this.router.delete('/user/favorites/:idProduct', auth, this.UserController.deleteFavorites);
        
        this.router.post('/user/register/', this.UserController.registerUser);
        this.router.post('/user/login/', this.UserController.loginUser);

        this.router.post('/user/buy/',auth, this.UserController.buy);


    }

}

export default UserRoute;