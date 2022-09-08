class SortTasks extends App {
    
    constructor(el) {
        super();
        this._el = el;
        this._elBtnSortName = this._el.querySelector('[data-js-sort-alphabetical]');
        this._elBtnSortImportance = this._el.querySelector('[data-js-sort-importance]');

        this._elToDoList = document.querySelector('[data-js-tasks]');

        this.init();
    }


    init() {
        this._elBtnSortName.addEventListener('click', function() {
            this.sort('tache');
        }.bind(this));
        this._elBtnSortImportance.addEventListener('click', function() {
            this.sort('importance');
        }.bind(this));
    }


    sort(column) {
        this.order = column;
        this.getTasks()
    }
}
