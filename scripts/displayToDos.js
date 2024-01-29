import { allTodos } from "./toDos.js";
const mainTitle = document.querySelector("#main-title");
const sideDiv = document.querySelector("#topics-div");
const todosDiv = document.querySelector("#todos-div");
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
        p.textContent = name;
        p.id = id;
        sideDiv.appendChild(p);
    }  
}

addLinksToSideDiv();


const sideLinks = document.querySelectorAll(".side-link");
for(const link of sideLinks)
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
        mainTitle.textContent = "All ToDos";
        toDosToDisplay = allTodos;
    }
    else if(id=="-2")
    {
        mainTitle.textContent = "Today's tasks";
        toDosToDisplay = loadTodaysTasks();
    }
    else if(id=="-1")
    {
        mainTitle.textContent = "Completed tasks";
        toDosToDisplay = loadDoneToDos();
    }
    else{
        mainTitle.textContent = topics[id]+" tasks";
        toDosToDisplay = loadTopicSpecificToDos(id);
    }
    displayToDos(id,toDosToDisplay);
    markAsDone();
    deleteTasks();
    enablePopup();
}


function displayToDos(id, toDosToDisplay)
{
    for(const element of toDosToDisplay)
    {
        const div = document.createElement("div");
            div.id = element.id;
            div.classList.add("todo");
            const input = document.createElement("input");
            input.type = "checkbox";
            input.id = "checkbox "+id;
            input.classList.add("done-checkbox");
            if(element.done)
            {
                input.classList.add("done"); 
                input.checked = true;
            }
           
            const p = document.createElement("label");
            p.textContent = element.title;
            p.for = "checkbox "+id;
            const p1 = document.createElement("p");
            p1.classList.add("date");
            if(element.date)
            {
                const date = new Date(element.date); 
                p1.textContent = date.toDateString();
            }
            
            const del = document.createElement("img");
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
    const checkboxes = document.querySelectorAll(".done-checkbox");
    for(const checkbox of checkboxes)
    {
        checkbox.addEventListener("click",()=>{ 
            const id = checkbox.parentElement.id;
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
    for(const todo of allTodos)
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
    for(const todo of allTodos)
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
    for(const element of allTodos)
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
    for(const element of allTodos)
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
    
    const deleteButtons = document.querySelectorAll(".delete");
    for(const button of deleteButtons)
    {
        button.addEventListener("click",()=>{
            const id = button.classList[1];
            const position = findPosition(id);
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
        const date = new Date(element.date);
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
    const todos = document.querySelectorAll(".todo");
    for(const todo of todos)
    {
        
        todo.addEventListener("click",()=>{
            const foundTodo = findToDo(todo.id);
            const title = foundTodo.title;
            const description = foundTodo.description;

            const h3 = document.querySelector("#popup-title");
            h3.textContent = title;
            const p = document.querySelector("#popup-description");
            if(description=="")
            {
                p.textContent = "No description available for this task..."
            }
            else{
                p.textContent = description;
            }

            const p1 = document.querySelector("#due-date");
            if(foundTodo.date)
            {
                const date = new Date(foundTodo.date)
                p1.textContent = "Due date for the task: "+date.toDateString();
            }
            else{
                p1.textContent = "No due date set"
            }

            (document.querySelectorAll(".popup")[0]).style.display = "block";
            
        });
    }


    function findToDo(id)
    {
        for(const todo of allTodos)
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
    const close = document.querySelector("#x");
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