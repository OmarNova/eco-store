export class FrontendController {
    constructor(model, view) {
        this.model = model;
        this.view = view;
        this.model.getPeopleByID(1, this.view.fillPeopleTable);
    }
}
