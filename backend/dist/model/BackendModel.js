"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const people_json_1 = __importDefault(require("../db/people.json"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const product = require('./ProductModel');
class BackendModel {
    constructor() {
        this.getPeopleByID = (id) => people_json_1.default[--id];
        this.insertPeople = (people) => {
            console.log(path_1.default.join(__dirname, 'db'));
            let data = fs_1.default.readFileSync('dist/db/people.json', 'utf8');
            let peopleData = JSON.parse(data);
            peopleData.push(people);
            data = JSON.stringify(peopleData);
            fs_1.default.writeFile('dist/db/people.json', data, (err) => {
                if (err)
                    throw err;
                return false;
            });
            return true;
        };
        this.updatePeople = (people) => {
            console.log('UPDATE');
            return true;
        };
        this.deletePeople = (id) => {
            console.log('DELETE');
            return true;
        };
        // TODO document why this constructor is empty
    }
}
exports.default = BackendModel;
