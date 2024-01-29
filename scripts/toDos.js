export class Topic {
    static nrOfTopics = parseInt(localStorage.getItem('nrOfTopics')) || 0;

    constructor(name) {
        this.id = Topic.nrOfTopics++;
        this.name = name;
        localStorage.setItem('nrOfTopics', Topic.nrOfTopics.toString());
    }
}

export class ToDo {
    static nrOfToDos = parseInt(localStorage.getItem('nrOfToDos')) || 0;

    constructor(title, description, topic, date) {
        this.id = ToDo.nrOfToDos++;
        this.title = title;
        this.description = description;
        this.topic = topic;
        this.date = date;
        this.done = false;
        localStorage.setItem('nrOfToDos', ToDo.nrOfToDos.toString());
    }
}

export let allTodos = JSON.parse(localStorage.getItem('todos')) || [];