export class Topic{
    static nrOfTopics= 0;
    constructor(name)
    {
        this.id = Topic.nrOfTopics;
        this.name = name;
        Topic.nrOfTopics++;
    }
}

export class ToDo{
    static nrOfToDos = 0;
    constructor(title, description, topic, date)
    {
    
        this.id = ToDo.nrOfToDos++;
        this.title = title;
        this.description = description;
        this.topic = topic;
        this.date = date;  
        this.done = false; 
    }
}

export let allTodos = JSON.parse(localStorage.getItem('todos')) || []