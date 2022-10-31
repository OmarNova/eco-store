"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const BackendModel_1 = __importDefault(require("../model/BackendModel"));
const path_1 = __importDefault(require("path"));
class BackendController {
    constructor() {
        this.index = (req, res) => res.json({ 'error': 0, 'msg': 'API: node-express-ts' });
        this.getPeople = (req, res) => {
            const { id } = req.params;
            const ruta = path_1.default.join(__dirname, '../public/');
            const people = this.model.getPeopleByID(parseInt(id));
            if (people) {
                //return res.sendFile(ruta + 'index.html');
                return res.send(people);
            }
            //return res.sendFile(ruta + 'index.html');
            return res.json({ 'error': 1, 'msg': 'API: id no found' });
        };
        this.insertPeople = (req, res) => {
            this.model.insertPeople(req.body);
            return res.json({ 'error': 0, 'msg': 'API: insert' });
        };
        this.updatePeople = (req, res) => {
            this.model.updatePeople(req.body);
            return res.json({ 'error': 0, 'msg': 'API: update' });
        };
        this.deletePeople = (req, res) => {
            const { id } = req.body;
            this.model.deletePeople(parseInt(id));
            return res.json({ 'error': 0, 'msg': `API: delete id: ${id}` });
        };
        this.model = new BackendModel_1.default();
    }
}
exports.default = BackendController;
