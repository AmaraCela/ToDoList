import { allTodos } from "./toDos.js";
let todos = document.getElementsByClassName("todo");


for(let todo of todos)
{
    todo.addEventListener("click",()=>{
        let popup = document.createElement("div");
        popup.classList.add("popup");

        popup.style.position = "fixed";
        let foundTodo = findToDo(todo.id);
        let title = foundTodo.title;
        let description = foundTodo.description;

        let h3 = document.createElement("h3");
        h3.innerText = title;
        let p = document.createElement("p");
        p.innerText = description;

        popup.appendChild(h3);
        popup.appendChild(p);
        document.body.appendChild(popup);
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