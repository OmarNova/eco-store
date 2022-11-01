import peoples from "../db/people.json";
import { IPeople } from "interface/IPeople";
import fs from "fs";
import path from "path";
const product = require('./ProductModel')


class BackendModel {

    constructor() {
      // TODO document why this constructor is empty
    }


    public getPeopleByID = (id: number) => 
        peoples[--id]
    ;
    

    public insertPeople = (people: IPeople): boolean => {
        console.log(path.join(__dirname, 'db'));
        let data = fs.readFileSync('dist/db/people.json', 'utf8');
        let peopleData: IPeople[] = JSON.parse(data);
        peopleData.push(people);
        data = JSON.stringify(peopleData);
        fs.writeFile('dist/db/people.json', data, (err) => {
            if (err) throw err;
            return false;
        });
        return true;
    }

    public updatePeople = (people: IPeople): boolean => {
        console.log('UPDATE');
        return true;
    }

    public deletePeople = (id: number): boolean => {
        console.log('DELETE');
        return true;
    }
}

export default BackendModel;