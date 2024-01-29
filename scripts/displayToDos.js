import { allTodos } from "./toDos.js";
let mainTitle = document.getElementById("main-title");

let sideDiv = document.getElementById("topics-div");
let todosDiv = document.getElementById("todos-div");
let topics = {};

let todaysTaks = [];

let toDosToDisplay = [];

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
displayContent(-2);
sideDiv.innerHTML = '';
for (let [id,name] of Object.entries(topics))
{
    let p = document.createElement("p");
    p.classList.add("side-link");
    p.innerText = name;
    p.id = id;
    sideDiv.appendChild(p);
}

let sideLinks = document.getElementsByClassName("side-link");
for(let link of sideLinks)
{
    link.addEventListener("click",()=>{
        displayContent(link.id);
    })
}

function displayContent(id)
{

    toDosToDisplay = [];
    todosDiv.innerHTML = '';
    if(id=="-2")
    {
        mainTitle.innerText = "Today's tasks";
       loadTodaysTasks();
       
       toDosToDisplay = todaysTaks;
       console.log(toDosToDisplay);
    }
    else if(id=="-1")
    {
        mainTitle.innerText = "Completed tasks";
        for(let element of allTodos)
        {
            if(element.done == true)
            {
                toDosToDisplay.push(element);
            }
        }
    }
    else{
    mainTitle.innerText = topics[id]+" tasks";
    toDosToDisplay = [];
    for(let element of allTodos)
    {
        if(element.topic.id==id)
        {
            toDosToDisplay.push(element);  
        }
    }
   
    }
    for(let element of toDosToDisplay)
    {
        let div = document.createElement("div");
            div.id = element.id;
            div.classList.add("todo");
            let input = document.createElement("input");
            input.type = "checkbox";
            input.id = "checkbox "+id;
            input.classList.add("done-checkbox");
            if(element.done == true)
            {
                input.classList.add("done"); 
                input.checked = true;
            }
            else{
                console.log(element.done)
            }
           
            let p = document.createElement("label");
            p.innerText = element.title;
            p.for = "checkbox "+id;
            let p1 = document.createElement("p");
            let date = new Date(element.date);
            p1.innerText = date.toDateString();
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
    markAsDone();
    deleteTasks();
    enablePopup();
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
           
            for(let todo of allTodos)
            {
                if(todo.id==id)
                {
                    todo.done = true;
                    checkbox.classList.add("done");
                }
            }
            }
            else{
                for(let todo of allTodos)
                {
                    if(todo.id==id)
                    {
                        todo.done = false;
                        checkbox.classList.remove("done");
                    }
                }
            }
            localStorage.setItem('todos', JSON.stringify(allTodos));
        });
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



function deleteTasks()
{
    
    let deleteButtons = document.getElementsByClassName("delete");
    for(let button of deleteButtons)
    {
        button.addEventListener("click",()=>{
            let id = button.classList[1];
            let position = findPosition(id);
            // let topic = allTodos[position].topic.id;
            if(position!=null)
            {
                allTodos.splice(position,1);
                localStorage.setItem('todos', JSON.stringify(allTodos));
                fetchTopics();
                displayContent("-2");
            }
        });
    }
}

function loadTodaysTasks()
{
    todaysTaks = [];
    console.log(allTodos);
    for(const element of allTodos)
    {
        let date = new Date(element.date);
        if(date.toDateString() == new Date().toDateString())
        {
            todaysTaks.push(element);
        }
    }
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