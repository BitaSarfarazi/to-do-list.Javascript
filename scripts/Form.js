class Form extends App {

    // utiliser ce class pour gerer le form

    constructor(el) {
        super();
        this._el = el;
        this._elInputTask = this._el.task;
        this._elInputDescription = this._el.description;
        this._elInputImportance = this._el.querySelectorAll('input[name="importance"]');
        this._elTaskDetail = document.querySelector('[data-js-task-detail]');
        this._elDetailTemplate = document.querySelector('[data-js-task-detail-template]');
        this._elBouton = this._el.querySelector('[data-js-btn]');
        this.validation = new Validation();

        this.init();
    }

    getIdInHash(slug) {
        let hash = window.location.hash,
            hashInArray = hash.split(`#!/${slug}/`),
            id = hashInArray[1];
        return id;
    }


    init() {
        this._elBouton.addEventListener('click', function (e) {
            e.preventDefault();
            this.addTaskClick();
        }.bind(this));
        this.getTasks()
        let id = this.getIdInHash('todo');
        if (id) {
            this.fetchTaskDetail(id)
        }
        window.addEventListener('hashchange', function () {
            let id = this.getIdInHash('todo');
            this.fetchTaskDetail(id);
        }.bind(this));
    }

    fetchTaskDetail(todoId) {
        fetch("http://localhost/to-do-list/api/todoDetail.php?id=" + todoId)
            .then(function (res) {
                return res.json();
            }).then(function (todos) {
            const todo = todos[0]
            /* Cas description */
            let description = 'Aucune description disponible.';
            if (todo.description != '') description = todo.description;
            todo.description = description;

            let elCloneLi = this._elDetailTemplate.cloneNode(true);

            for (const prop in todo) {
                let regExp = new RegExp('{{' + prop + '}}', 'g');
                elCloneLi.innerHTML = elCloneLi.innerHTML.replaceAll(regExp, todo[prop]);
            }
            let taskDetail = document.importNode(elCloneLi.content, true);
            this._elTaskDetail.innerHTML = ""
            this._elTaskDetail.appendChild(taskDetail);
        }.bind(this)).catch(function (err) {
            console.log(err.message)
        })
    }


    addTaskClick() {

        let importance = '';

        for (let i = 0, l = this._elInputImportance.length; i < l; i++) {
            if (this._elInputImportance[i].checked) importance = this._elInputImportance[i].value;
        }

        let task = {
            // 'id':this
            'tache': this._elInputTask.value,
            'description': this._elInputDescription.value,
            'importance': importance
        }

        const {importanceValid, nameIsValid} = this.validation.isValidTask(task)
        console.log(task, importanceValid, nameIsValid)

        /* Input 'Nouvelle tâche' */
        if (!nameIsValid) {
            this._elInputTask.parentNode.classList.add('error');
        } else {
            if (this._elInputTask.parentNode.classList.contains('error')) this._elInputTask.parentNode.classList.remove('error');
        }

        if (!importanceValid) {
            this._elInputImportance[0].parentNode.classList.add('error');
        } else {
            if (this._elInputImportance[0].parentNode.classList.contains('error')) this._elInputImportance[0].parentNode.classList.remove('error');
        }

        /* Si valide */
        if (importanceValid && nameIsValid) {
            this.addTask();
            this.cleanForm();
        }
    }


    addTask() {

        let importance = '';

        for (let i = 0, l = this._elInputImportance.length; i < l; i++) {
            if (this._elInputImportance[i].checked) importance = this._elInputImportance[i].value;
        }

        let task = {
            // 'id':this
            'tache': this._elInputTask.value,
            'description': this._elInputDescription.value,
            'importance': importance
        }

        fetch(`http://localhost/to-do-list/api/addTodo.php?&tache=${task.tache}&importance=${task.importance}&description=${task.description}`)
            .then(function () {
                this.getTasks()
            }.bind(this)).catch(function (err) {
            console.log(err.message)
        })

    }

    cleanForm() {
        this._elInputTask.value = '';
        this._elInputDescription.value = '';
        for (let i = 0, l = this._elInputImportance.length; i < l; i++) {
            if (this._elInputImportance[i].checked) this._elInputImportance[i].checked = false;
        }
    }
}
