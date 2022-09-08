class App {
//  creer une class pour gerer app

    constructor() {
        this._elToDoList = document.querySelector('[data-js-tasks]');
        this.order = ""
        this.taskTemplate = document.querySelector('[data-js-task-template]');
    }
    
    //recevoir la list to todo
    getTasks() {
        fetch("http://localhost/to-do-list/api/todolist.php" + (this.order ? ("?order=" + this.order) : ""))
            .then(function (res) {
                return res.json();
            }).then(function (res) {
            this._elToDoList.innerHTML = '';
            return res.forEach(function (task) {
                this.createTask(task)
            }.bind(this))
        }.bind(this)).catch(function (err) {
            console.log(err.message)
        })
    }
    
    //creer le tashe
    createTask(todo) {
        let elCloneLi = this.taskTemplate.cloneNode(true);

        for (const prop in todo) {
            let regExp = new RegExp('{{' + prop + '}}', 'g');
            elCloneLi.innerHTML = elCloneLi.innerHTML.replaceAll(regExp, todo[prop]);
        }
        let newTask = document.importNode(elCloneLi.content, true);
        this._elToDoList.appendChild(newTask);
        new Task(this._elToDoList.lastElementChild);
    }
}
