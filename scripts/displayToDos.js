import { allTodos } from "./toDos.js";
const mainTitle = document.getElementById("main-title");
const sideDiv = document.getElementById("topics-div");
const todosDiv = document.getElementById("todos-div");
let topics = {};

function fetchTopics()
{
    for(const element of allTodos)
    {
        if(element.topic)
        {
        if(!topics[element.topic.id])
        {
            topics[element.topic.id] = element.topic.name;
        }
        }
    }
}

fetchTopics();
sideLinksClicked(-2);
sideDiv.innerHTML = '';


function addLinksToSideDiv()
{
    for (const [id,name] of Object.entries(topics))
    {
        const p = document.createElement("p");
        p.classList.add("side-link");
        p.innerText = name;
        p.id = id;
        sideDiv.appendChild(p);
    }  
}

addLinksToSideDiv();


const sideLinks = document.getElementsByClassName("side-link");
for(let link of sideLinks)
{
    link.addEventListener("click",()=>{
        sideLinksClicked(link.id);
    })
}

function sideLinksClicked(id)
{
    let toDosToDisplay = [];
    todosDiv.innerHTML = '';
    if(id=="-3")
    {
        mainTitle.innerText = "All ToDos";
        toDosToDisplay = allTodos;
    }
    else if(id=="-2")
    {
        mainTitle.innerText = "Today's tasks";
        toDosToDisplay = loadTodaysTasks();
    }
    else if(id=="-1")
    {
        mainTitle.innerText = "Completed tasks";
        toDosToDisplay = loadDoneToDos();
    }
    else{
        mainTitle.innerText = topics[id]+" tasks";
        toDosToDisplay = loadTopicSpecificToDos(id);
    }
    displayToDos(id,toDosToDisplay);
    markAsDone();
    deleteTasks();
    enablePopup();
}


function displayToDos(id, toDosToDisplay)
{
    for(let element of toDosToDisplay)
    {
        let div = document.createElement("div");
            div.id = element.id;
            div.classList.add("todo");
            let input = document.createElement("input");
            input.type = "checkbox";
            input.id = "checkbox "+id;
            input.classList.add("done-checkbox");
            if(element.done)
            {
                input.classList.add("done"); 
                input.checked = true;
            }
           
            let p = document.createElement("label");
            p.innerText = element.title;
            p.for = "checkbox "+id;
            let p1 = document.createElement("p");
            p1.classList.add("date");
            if(element.date)
            {
                let date = new Date(element.date); 
                p1.innerText = date.toDateString();
            }
            
            let del = document.createElement("img");
            del.src = "../assets/delete.png";
            del.classList.add("delete");
            del.classList.add(element.id);
            div.appendChild(input);
            div.appendChild(p);
            div.appendChild(p1);
            div.appendChild(del);
            todosDiv.appendChild(div);
            todosDiv.appendChild(document.createElement("hr"));
    }
}

function markAsDone()
{
    let checkboxes = document.getElementsByClassName("done-checkbox");
    for(let checkbox of checkboxes)
    {
        checkbox.addEventListener("click",()=>{ 
            let id = checkbox.parentElement.id;
            if(checkbox.classList.length == 1)
            {
                toggleToDoCompletion(true,id);
                checkbox.classList.add("done");
            }
            else{
                toggleToDoCompletion(false,id);
                checkbox.classList.remove("done");
            }
            localStorage.setItem('todos', JSON.stringify(allTodos));
        });
    }
}


function toggleToDoCompletion(value,id)
{
    for(let todo of allTodos)
    {
        if(todo.id==id)
        {
            todo.done = value;
            
        }
    }
}

function findPosition(tid)
{
    let i = 0;
    for(let todo of allTodos)
    {
        if(todo.id == tid)
        {
            return i;
        }
        i++;
    }
    return null;
}


function loadDoneToDos()
{
    let todos = []
    for(let element of allTodos)
        {
            if(element.done)
            {
                todos.push(element);
            }
        }
    return todos;
}

function loadTopicSpecificToDos(id)
{
    let todos = [];
    for(let element of allTodos)
    {
        if(element.topic)
        {
            if(element.topic.id==id)
            {
                todos.push(element);  
            }
        }
    }
    return todos;
}

function deleteTasks()
{
    
    let deleteButtons = document.getElementsByClassName("delete");
    for(let button of deleteButtons)
    {
        button.addEventListener("click",()=>{
            let id = button.classList[1];
            let position = findPosition(id);
            if(position!=null)
            {
                allTodos.splice(position,1);
                localStorage.setItem('todos', JSON.stringify(allTodos));
                fetchTopics();
                sideLinksClicked("-2");
            }
        });
    }
}

function loadTodaysTasks()
{
    let todaysTaks = [];
    for(const element of allTodos)
    {
        let date = new Date(element.date);
        if(date.toDateString() == new Date().toDateString())
        {
            todaysTaks.push(element);
        }
    }
    return todaysTaks;
}

loadTodaysTasks();

function enablePopup()
{
    let todos = document.getElementsByClassName("todo");
    for(let todo of todos)
    {
        
        todo.addEventListener("click",()=>{
            let foundTodo = findToDo(todo.id);
            let title = foundTodo.title;
            let description = foundTodo.description;

            let h3 = document.getElementById("popup-title");
            h3.innerText = title;
            let p = document.getElementById("popup-description");
            if(description=="")
            {
                p.innerText = "No description available for this task..."
            }
            else{
                p.innerText = description;
            }

            let p1 = document.getElementById("due-date");
            if(foundTodo.date)
            {
                let date = new Date(foundTodo.date)
                p1.innerText = "Due date for the task: "+date.toDateString();
            }
            else{
                p1.innerText = "No due date set"
            }

            (document.getElementsByClassName("popup")[0]).style.display = "block";
            
        });
    }


    function findToDo(id)
    {
        for(let todo of allTodos)
        {
            if(todo.id==id)
            {
                return todo;
            }
        }
        return null;
    }
}

function togglePopup()
{
    let close = document.getElementById("x");
    close.addEventListener("click",()=>{
        if(close.parentElement.parentElement.parentElement.style.display=='none')
        {
            close.parentElement.parentElement.parentElement.style.display='block';
        }
        else{
            close.parentElement.parentElement.parentElement.style.display='none';
        }
    });
}

togglePopup();