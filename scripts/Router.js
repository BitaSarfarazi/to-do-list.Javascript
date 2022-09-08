import {getProjectDetail} from './Project.js'

export default class Router {

    lastActiveProject

    constructor(el) {

        this._elProjectList = el.querySelector('nav');
        if (location.hostname == 'localhost') {
            this._domain = `${location.pathname.substring(0, location.pathname.lastIndexOf('epreuve-finale/'))}epreuve-finale/`;

        } else {
            this._domain = location.pathname;
        }

        this.init();

    }

    init() {


        let id = this.getIdInHash('project');
        if (id) {
            const nodeMenu = this._elProjectList.querySelector('[data-js-project-id="' + id + '"]')
            if (nodeMenu) nodeMenu.classList.add("active")
            this.lastActiveProject = nodeMenu;
            getProjectDetail(id);
        } else {
            history.replaceState('accueil', null, this._domain)
        }

        for (const childNode of this._elProjectList.childNodes) {
            childNode.addEventListener('click', function () {
                let id = childNode.getAttribute("data-js-project-id");

                if (id != 0) {
                    this.showProjectDetail(id);
                    if (this.lastActiveProject)
                        this.lastActiveProject.classList.remove("active")
                    childNode.classList.add("active")
                    this.lastActiveProject = childNode
                }
            }.bind(this));
        }

        window.addEventListener('hashchange', function () {
            let id = this.getIdInHash('project');
            getProjectDetail(id);
        }.bind(this));

    }

    getIdInHash(slug) {
        let hash = window.location.hash,
            hashInArray = hash.split(`#!/${slug}/`),
            id = hashInArray[1];
        return id;
    }


    showProjectDetail(id) {
        window.location = `#!/project/${id}`;
    }

}
