import { Router } from "express";
import UserController from "../controller/UserController"

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
        this.router.get('/user/:email', this.UserController.getUser);
        this.router.post('/user/register', this.UserController.registerUser);
        this.router.post('/user/login', this.UserController.loginUser);
    }

}

export default UserRoute;