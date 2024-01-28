export class Topic{
    static nrOfTopics= 0;
    constructor(name)
    {
        
        this.id = Topic.nrOfTopics++;
        console.log("topic id");
        console.log(this.id)
        this.name = name;
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