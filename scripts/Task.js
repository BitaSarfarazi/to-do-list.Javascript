class Task extends App {
    // cree une class pour gerer chaque tod0
    constructor(el) {
        super();
        this._el = el;

        this.id = this._el.dataset.jsTask;
        this._elBtnShowDetail = this._el.querySelector('[data-js-show-detail]');
        this._elBtnDelete = this._el.querySelector('[data-js-delete]');

        this._elToDoList = this._el.closest('[data-js-tasks]');
        this._elTaskDetail = document.querySelector('[data-js-task-detail]');
        this.init();
    }


    init() {
        this._elBtnShowDetail.addEventListener('click', this.showDetail.bind(this));
        this._elBtnDelete.addEventListener('click', this.delete.bind(this));
    }
    getIdInHash(slug) {
        let hash = window.location.hash,
            hashInArray = hash.split(`#!/${slug}/`),
            id = hashInArray[1];
        return id;
    }


    showDetail() {
        window.location = `#!/todo/${this.id}`;
    }


    delete() {
        fetch("http://localhost/to-do-list/api/deleteTodo.php?id=" + this.id)
            .then(function (res) {
                this.getTasks()
            }.bind(this)).catch(function (err) {
            console.log(err.message)
        })
    }
}
