"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const ProductSchema_1 = __importDefault(require("./schema/ProductSchema"));
const config_1 = __importDefault(require("../../config/config"));
class MongoDBC {
    constructor() {
        this.connection = () => {
            mongoose_1.default.connect(this.uri)
                .then(() => {
                return console.info('DB: Mongo connection');
            })
                .catch(error => {
                console.error('Error connecting to Mongodb: ', error);
                return process.exit(1);
            });
        };
        this.uri = config_1.default.DB.URI;
        this.product = ProductSchema_1.default;
    }
}
exports.default = MongoDBC;
