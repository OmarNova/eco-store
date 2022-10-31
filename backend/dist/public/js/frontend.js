import { FrontendModel } from "./model/FrontendModel.js";
import { FrontendView } from "./view/FrontendView.js";
import { FrontendController } from "./controller/FrontendController.js";
const frontend = new FrontendController(new FrontendModel(), new FrontendView());
