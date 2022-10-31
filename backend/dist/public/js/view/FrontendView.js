export class FrontendView {
    constructor() {
        this.getElement = (selector) => document.querySelector(selector);
        this.createElement = (tag, classNames) => {
            const element = document.createElement(tag);
            if (classNames)
                element.classList.add(...classNames);
            return element;
        };
        this.fillPeopleTable = (people) => {
            this.fillRow('Name', people.name);
            this.fillRow('Height', people.height);
            this.fillRow('Mass', people.mass);
            this.fillRow('Hair color', people.hair_color);
            this.fillRow('Eye color', people.eye_color);
            this.fillRow('Skin color', people.skin_color);
            this.fillRow('Birth year', people.birth_year);
            this.fillRow('Gender', people.gender);
            this.fillRow('Homeworld', people.homeworld);
            this.fillRow('Films', people.films);
            this.fillRow('Species', people.species);
            this.fillRow('Vehicles', people.vehicles);
            this.fillRow('Starships', people.starships);
            this.fillRow('Created', people.created);
            this.fillRow('Edited', people.edited);
            this.fillRow('Url', people.url);
        };
        this.HTMLTable = this.getElement('#people');
    }
    fillRow(key, value) {
        if (this.HTMLTable) {
            let row = this.createElement('tr', []);
            let td = this.createElement('td', []);
            td.innerHTML = key + ': ';
            row.appendChild(td);
            td = this.createElement('td', []);
            if (Array.isArray(value)) {
                let ul = this.createElement('ul', ['list-group', 'm-1']);
                let li;
                value.forEach(item => {
                    li = this.createElement('li', ['list-group-item', key]);
                    let i = 0;
                    for (const p in item) {
                        if (i > 5) {
                            break;
                        }
                        li.appendChild(this.row(p, item[p]));
                        i++;
                    }
                    ul.appendChild(li);
                });
                td.appendChild(ul);
            }
            else {
                td.innerHTML = value;
            }
            row.appendChild(td);
            this.HTMLTable.appendChild(row);
        }
    }
    row(key, value) {
        let row = this.createElement('tr', []);
        let td = this.createElement('td', []);
        td.innerHTML = key + ': ';
        row.appendChild(td);
        td = this.createElement('td', []);
        if (Array.isArray(value)) {
            let ul = this.createElement('ul', ['list-group', 'm-1']);
            let li;
            value.forEach(item => {
                li = this.createElement('li', ['list-group-item', key]);
                li.innerHTML = item;
                ul.appendChild(li);
            });
            td.appendChild(ul);
        }
        else {
            td.innerHTML = value;
        }
        row.appendChild(td);
        return row;
    }
}
